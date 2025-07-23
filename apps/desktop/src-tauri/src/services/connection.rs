use std::{collections::HashMap, sync::Arc, time::SystemTime};

use tokio::net::{TcpListener, TcpStream};
use serde_json::{json, Value};
use futures_util::{Sink, SinkExt, StreamExt};
use tokio::sync::{broadcast,RwLock};
use tokio_tungstenite::{accept_async, tungstenite::protocol::Message, WebSocketStream};


use super::handlers::{handle_message};

#[derive(Clone)]
pub struct ConnectionState {
    clients: Arc<RwLock<HashMap<String, broadcast::Sender<String>>>>,
    device_registry: Arc<RwLock<HashMap<String, DeviceInfo>>>
}

#[derive(Clone, Debug)]
pub struct DeviceInfo {
    id: String,
    name: String,
    devce_type: String,
    last_seen: SystemTime
}

pub struct Connection {
    state: ConnectionState
}

impl Connection {
    pub fn new() -> Self {
        Self {
            state: ConnectionState {
                clients: Arc::new(RwLock::new(HashMap::new())),
                device_registry: Arc::new(RwLock::new(HashMap::new())),
            },
        }
    }

    pub async fn start(&self, addr: &str) {
        let listener = TcpListener::bind(addr).await.expect("Failed to bind TCP");
        println!("WebSocket server listening on {}", addr);

        while let Ok((stream, _)) = listener.accept().await {
            let peer = stream.peer_addr().unwrap().to_string();
            let state = self.state.clone();

            tokio::spawn(async move {
                if let Ok(ws_stream) = accept_async(stream).await {
                    handle_connection(ws_stream, state, peer).await;
                }
            });
        }
    }
}

async fn handle_connection(
    ws_stream: WebSocketStream<TcpStream>,
    state: ConnectionState,
    client_id: String,
) {
    let (mut ws_sender, mut ws_receiver) = ws_stream.split();
    let (tx, mut rx) = broadcast::channel(100);

    state.clients.write().await.insert(client_id.clone(), tx.clone());

    let client_id_for_incoming = client_id.clone();

    let incoming_task = tokio::spawn({
        let state = state.clone();
        async move {
            while let Some(msg) = ws_receiver.next().await {
                match msg {
                    Ok(Message::Text(text)) => {
                        if let Ok(data) = serde_json::from_str::<Value>(&text) {
                            handle_message(data, &client_id_for_incoming, &state).await;
                        }
                    }
                    Ok(Message::Close(_)) => break,
                    Err(e) => {
                        eprintln!("WebSocket error: {}", e);
                        break;
                    }
                    _ => {}
                }
            }
        }
    });

    let outgoing_task = tokio::spawn(async move {
        while let Ok(msg) = rx.recv().await {
            if ws_sender.send(Message::Text(msg.into())).await.is_err() {
                break;
            }
        }
    });

    tokio::select! {
        _ = incoming_task => {},
        _ = outgoing_task => {}
    }

    state.clients.write().await.remove(&client_id);
}


use serde_json::{Value};


use super::connection::{ ConnectionState, DeviceInfo };

pub async fn handle_message(data: Value, client_id: &str, state: &ConnectionState) {
    match data["type"].as_str() {
        Some("clipboard") => {
            let payload = data["payload"].as_str().unwrap_or("None");
            println!("{}", client_id);
        }
        Some("file_transfer") => {
            // Your logic
        }
        Some("keyboard_input") => {
            // Your logic
        }
        Some("device_info") => {
            // Register device
        }
        _ => {
            println!("Unknown message type from {}", client_id);
        }
    }
}


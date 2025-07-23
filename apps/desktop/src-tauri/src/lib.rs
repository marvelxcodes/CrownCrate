mod services;

use std::vec;

use tauri_plugin_autostart::MacosLauncher;

use services::connection::{Connection, DeviceInfo};

#[tauri::command]
fn connect(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())

        .invoke_handler(tauri::generate_handler![connect])

        .setup(|_app| {
            tauri::async_runtime::spawn(async {
            let server = Connection::new();
            server.start("127.0.0.1:9001").await;
        });
    Ok(())
})

        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

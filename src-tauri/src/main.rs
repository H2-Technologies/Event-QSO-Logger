// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_updater::UpdaterExt;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        //.plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let response = handle.updater().expect("REASON").check().await; // If .await?; works in the setup hook you can remove the if let Ok line - can't try that myself right now.
                if let Ok(response) = response {
                  if let Some(response) = response {
                    // The first || {} ignores the download progress
                    // The second || {} ignores the download finished event
                    // If you wanna handle them you can write actual functions instead
                    let _ = response.download_and_install(|_,_| {}, || {}).await; // this returns a result you may wanna handle
                    println!("Update downloaded and installed");
                    println!("{:?}", response);
                  }
                }
            });
            Ok(())
        })
        .plugin(tauri_plugin_window::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
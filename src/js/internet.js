let invoke = window.__TAURI__.primitives.invoke;

async function test_internet() {
  let response = await invoke("check_internet_connection");
  console.log(response);
}

test_internet();
const { invoke } = window.__TAURI__.primitives;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

let html_body = document.getElementById("body");

function test_auth() {
  let user_authed = localStorage.getItem("supabase.auth.token");
  // if the user_authed variable is null, then the user is not logged in, so redirect them to the login page
  if (user_authed === null) {
    window.location.href = "login.html";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  test_auth();
  //greetInputEl = document.querySelector("#greet-input");
  //greetMsgEl = document.querySelector("#greet-msg");
  //document.querySelector("#greet-form").addEventListener("submit", (e) => {
  //  e.preventDefault();
  //  greet();
  //});
});

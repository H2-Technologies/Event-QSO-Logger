const { invoke } = window.__TAURI__.primitives;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

let html_body = document.querySelector("body");
const html_body_code = '<div class="header"><div class="dropdownContainer p-[5px]"><button id="dropdownButton" data-dropdown-toggle="dropdown" data-dropdown-trigger="hover" class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-slate-800 dark:hover:bg-slate-400 dark:focus:ring-slate-300" type="button">Dropdown button<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" /></svg></button><div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"><ul class="py-2 text-sm text-gray-700 dark:text-slate-200" aria-labelledby="dropdownButton"><li><a id="signupButton" href="signup.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Sign Up</a></li><li><a href="createtable.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Table Creation (add filter for club admin l8r)</a></li></ul></div></div><h1>Event Qso Logger</h1></div><div id="app"><div class="form-box"><form id="qso-form"><label for="callsign">Callsign</label><input type="text" id="callsign" name="callsign" placeholder="Enter your callsign" required /><label for="band">Band</label><select id="band" name="band" required><option value="160m">160m</option><option value="80m">80m</option><option value="40m">40m</option><option value="20m">20m</option><option value="15m">15m</option><option value="10m">10m</option><option value="6m">6m</option><option value="2m">2m</option><option value="70cm">70cm</option><option value="23cm">23cm</option><option value="13cm">13cm</option><option value="9cm">9cm</option><option value="6cm">6cm</option><option value="3cm">3cm</option><option value="1.25cm">1.25cm</option><option value="6mm">6mm</option><option value="4mm">4mm</option><option value="2.5mm">2.5mm</option><option value="2mm">2mm</option><option value="1mm">1mm</option></select><label for="mode">Mode</label><select id="mode" name="mode" required><option value="CW">CW</option><option value="SSB">SSB</option><option value="FM">FM</option><option value="AM">AM</option><option value="RTTY">RTTY</option><option value="FT8">FT8</option><option value="FT4">FT4</option><option value="JS8">JS8</option><option value="PSK31">PSK31</option><option value="PSK63">PSK63</option><option value="PSK125">PSK125</option><option value="JT65">JT65</option><option value="JT9">JT9</option><option value="JT4">JT4</option></select><br /><label for="frequency">Frequency</label><input type="text" id="frequency" name="frequency" placeholder="Enter the frequency" required /><label for="field_day_exchange">Field Day Exchange</label><input type="text" id="field_day_exchange" name="field_day_exchange" placeholder="Enter the exchange" /><button type="submit">Submit</button></form></div></div>';

function test_auth() {
  let user_authed = is_authed().await;
  console.log(user_authed);
  if (user_authed) {
    html_body.innerHTML = html_body_code;
  } else {
    window.location.href = "signup.html";
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

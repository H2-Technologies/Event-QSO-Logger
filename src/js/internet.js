
let invoke = window.__TAURI__.primitives.invoke;
var signupButton = document.getElementById("signupButton");

async function test_internet() {
  let response = await invoke("check_internet_connection");
  //console.log(response);
  if (response === true) {
    console.log("HE WORKS! YOU HAVE INTRANET!")
  } else {
    //signupButton.innerHTML = "Internet Detection Failed. Please fix internet and try again.";
    signupButton.removeAttribute("href");
    signupButton.style.textDecoration = "line-through";
    console.log("Sucks to be u.")
  }
  


}

test_internet();



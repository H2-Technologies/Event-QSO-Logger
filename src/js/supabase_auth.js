/*removing the env soon..doesn't work as intended...*/
let supabase = window.supabase;
const supabaseUrl = "https://dxumeuxxjloeykdfwlkz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dW1ldXh4amxvZXlrZGZ3bGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNTg1NzQsImV4cCI6MjAxNzgzNDU3NH0.XsGAtlYPsf4bWKrzLobL1bLTgRQnS0acNV9rPrCBw6s";



async function init_supabase() {
  let client = supabase.createClient(supabaseUrl, supabaseKey);
  return client;
}

function collect_auth_data() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  return { email, password };
}

async function signup() {
  let supabaseClient = await init_supabase();
  const { email, password } = collect_auth_data();
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  console.log(data, error);
  //console.log(supabaseClient.auth.user())
}

async function login() {
  let supabaseClient = await init_supabase();
  const { email, password } = collect_auth_data();

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (data && data.session) {
    console.log('Access token:', data.session.access_token);
    window.localStorage.setItem("supabase.auth.token", data.session.access_token);
  } else {
    console.error('Unexpected response format:', data);
  }

  if (error) {
    console.error('Login error:', error);
    alert('Login failed: ' + error.message);
    return;
  }
}


async function logout() {
  let supabaseClient = await init_supabase();
  const { error } = await supabaseClient.auth.signOut();
  console.log(error);
}

async function is_authed() {
  //get the token from local storage and check if it's valid
  let token = window.localStorage.getItem("supabase.auth.token");
  if (token) {
    let supabaseClient = await init_supabase();
    const { data, error } = await supabaseClient.auth.api.getUser(token);
    if (error) {
      console.error('Auth error:', error);
      return false;
    }
    if (data) {
      console.log('User data:', data);
      return true;
    }
  } else {
    console.log("not logged in");
    return false;
  }

  //let supabaseClient = await init_supabase();
  //const user = await supabaseClient.auth.getUser();
  //if (user) {
  //  console.log(user);
  //  return true;
  //} else {
  //  console.log("not logged in");
  //  return false;
  //}
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (window.location.href.includes("signup.html") || window.location.href.includes("login.html")) {
// in the authForm id, if the signup button is clicked, call signup(), if the login button is clicked, call login()
document.getElementById("authForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const signupButton = document.getElementById("signupButton");
  const loginButton = document.getElementById("loginButton");
  //if the submit button is the one that triggers the event, then call the signup function, otherwise call the login function
  if (event.submitter === signupButton) {
    signup().await;
    window.location.href = "index.html";
  } else if (event.submitter === loginButton) {
    login().await;
    window.location.href = "index.html";
  } else {
    window.location.href = "index.html";
  }
});}

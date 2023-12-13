let supabase = window.supabase;

const supabaseUrl = "https://db.dxumeuxxjloeykdfwlkz.supabase.co";
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
}

async function login() {
  let supabaseClient = await init_supabase();
  const { email, password } = collect_auth_data();
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data.session.access_token, error);
  window.localStorage.setItem("supabase.auth.token", data.session.access_token);
}

async function logout() {
  let supabaseClient = await init_supabase();
  const { error } = await supabaseClient.auth.signOut();
  console.log(error);
}

// in the authForm id, if the signup button is clicked, call signup(), if the login button is clicked, call login()
document.getElementById("authForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const signupButton = document.getElementById("signupButton");
  const loginButton = document.getElementById("loginButton");
  //if the submit button is the one that triggers the event, then call the signup function, otherwise call the login function
  if (event.submitter === signupButton) {
    signup();
  } else if (event.submitter === loginButton) {
    login();
  }
});
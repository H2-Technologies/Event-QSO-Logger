let supabase = window.supabase;

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

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
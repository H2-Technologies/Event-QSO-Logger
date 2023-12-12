import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const supabase = createClient(supabaseUrl, supabaseKey);

function collect_auth_data() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  return { email, password };
}

async function signup() {
  const { email, password } = collect_auth_data();
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log(user, session, error);
}

async function login() {
  const { email, password } = collect_auth_data();
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  console.log(user, session, error);
}
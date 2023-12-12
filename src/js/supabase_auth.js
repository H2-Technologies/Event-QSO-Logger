import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {supabaseUrl, supabaseKey} from '/env/env.js';

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
let createClient = window.supabase.createClient;

import { supabaseUrl, supabaseKey} from "/env/env.js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const supabase = createClient(supabaseUrl, supabaseKey);
const userRole = supabase.auth.getUser().role;

if (userRole === "admin") {
  document.getElementById("create-table-form").style.display = "block";
} else {
  document.getElementById("create-table-form").style.display = "none";
}

// Handle table creation form submission
const createTableForm = document.getElementById("create-table-form");
createTableForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tableName = document.getElementById("table-name").value;

  try {
    await supabase.from("public").insert({
      tablename: tableName,
    });
    sleep(10000);
    alert("Table created successfully!");
  } catch (error) {
    alert("Error creating table:", error.message);
    sleep(10000);
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

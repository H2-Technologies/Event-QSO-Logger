import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {supabaseUrl, supabaseKey} from '/env/env.js';

const supabase = createClient(supabaseUrl, supabaseKey);
const userRole = supabase.auth.user().role;

if (userRole === 'admin') {
    document.getElementById('create-table-form').style.display = 'block';
  } else {
    document.getElementById('create-table-form').style.display = 'none';
  }
  
  // Handle table creation form submission
  const createTableForm = document.getElementById('create-table-form');
  createTableForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const tableName = document.getElementById('table-name').value;
  
    try {
      await supabase.from('pg_catalog.pg_tables').insert({
        tablename: tableName,
      });
      alert('Table created successfully!');
    } catch (error) {
      alert('Error creating table:', error.message);
    }
  });
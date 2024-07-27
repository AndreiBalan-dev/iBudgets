// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Keys
const supabaseUrl = "https://bxqljlahpxgvjybwodkl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cWxqbGFocHhndmp5YndvZGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNTI1MDYsImV4cCI6MjAzNzYyODUwNn0.eKcTCZ5k0cZRta4pBmx8o3qPd7tgW0YJOEzkAWQfq90";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

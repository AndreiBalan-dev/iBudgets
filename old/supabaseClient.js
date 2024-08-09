import { createClient } from "@supabase/supabase-js";

// Keys

const supabaseUrl = import.meta.env.VITE_API_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

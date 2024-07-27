import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabase = createClient (
    "https://bxqljlahpxgvjybwodkl.supabase.co/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cWxqbGFocHhndmp5YndvZGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNTI1MDYsImV4cCI6MjAzNzYyODUwNn0.eKcTCZ5k0cZRta4pBmx8o3qPd7tgW0YJOEzkAWQfq90"
);

function Login() {
    const navigate = useNavigate();

    supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_OUT") {
            // forward to success URL
            navigate("/success");
        } else {
            // forward to localhost:3000
            navigate("/")
        }
    })

    
    return (
        <div className="App">
            <header className="App-header">
                <Auth
                    supabaseClient={supabase}
                    appearance={{theme: ThemeSupa }}
                    theme="dark"
                    providers={["google"]}
                />
            </header>
        </div>
    );
}

export default Login;

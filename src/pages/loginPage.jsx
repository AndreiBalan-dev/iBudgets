import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

function Login() {
    const navigate = useNavigate();

    supabase.auth.onAuthStateChange(async event => {
        console.log(event);
        if (event === "SIGNED_IN") {
          navigate("/success");
        } else if (event === "SIGNED_OUT") {
          console.log("signed out");
          navigate("/");
        }
    });

    
    return (
        <div className="App">
            <header className="App-header">
                <Auth
                    supabaseClient={supabase}
                    appearance={{theme: ThemeSupa }}
                    theme="light"
                    providers={["google"]}
                />
            </header>
        </div>
    );
}

export default Login;

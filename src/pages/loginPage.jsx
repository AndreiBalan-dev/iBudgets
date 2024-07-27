import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import supabase from "../../supabaseClient";
=======

const supabase = createClient(
  "https://bxqljlahpxgvjybwodkl.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cWxqbGFocHhndmp5YndvZGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNTI1MDYsImV4cCI6MjAzNzYyODUwNn0.eKcTCZ5k0cZRta4pBmx8o3qPd7tgW0YJOEzkAWQfq90"
);
>>>>>>> 8881faae89729ddc02e55d0223f6443022e15396

function Login() {
  const navigate = useNavigate();

<<<<<<< HEAD
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
=======
  supabase.auth.onAuthStateChange(async event => {
    console.log("event", event);
    if (event === "SIGNED_IN") {
      navigate("/success", { replace: true });
    } else if (event === "SIGNED_OUT") {
      console.log("signed out");
      navigate("/login", { replace: true });
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="light" providers={["google"]} />
      </header>
    </div>
  );
>>>>>>> 8881faae89729ddc02e55d0223f6443022e15396
}

export default Login;

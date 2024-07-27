import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../supabaseClient";

function LoginPage() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={["google"]}
        />
      </header>
    </div>
  );
}

export default LoginPage;

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../supabaseClient";
import illustration from "../assets/illustration.jpg";

function LoginPage({ handleGoBack }) {
  return (
    <div className="login-wrapper">
      <div className="login">
        <header className="login-form">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                label: { fontWeight: "bold", color: "black" },
                anchor: { color: "black", textDecoration: "none" },
                input: { borderColor: "black" },
              },
            }}
            theme="light"
            providers={["google"]}
          />
        </header>
        <img src={illustration} alt="Person with money" width={600} className="login-image" />
      </div>
    </div>
  );
}

export default LoginPage;

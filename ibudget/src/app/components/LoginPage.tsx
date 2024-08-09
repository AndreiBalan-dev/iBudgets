import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabaseClient";
import Image from "next/image";
import illustration from "../assets/illustration.jpg";

interface LoginPageProps {
  handleGoBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ handleGoBack }) => {
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
        <Image src={illustration} alt="Person with money" />
      </div>
    </div>
  );
};

export default LoginPage;

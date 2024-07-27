import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../supabaseClient";

function LoginPage({ handleGoBack }) {
  return (
    <div className="App">
      <header className="App-header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={["google"]}
        />
        <button
          onClick={handleGoBack}
          className="btn btn--dark text-white bg-hslblack flex items-center justify-center px-4 py-2 text-base font-normal mr-2 mt-4"
        >
          Go Back
        </button>
      </header>
    </div>
  );
}

export default LoginPage;

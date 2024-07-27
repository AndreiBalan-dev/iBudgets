import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import LoginPage from "./LoginPage";
import { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";

function LoginHandler() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      setIsLoggedIn(true);
    } else if (event === "SIGNED_OUT") {
      console.log(event);
    }
  });

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      console.log(session.data.session);
      if (session.data.session !== null) {
        setIsLoggedIn(true);
      }
    };
    getSession();
  }, []);

  return <>{isLoggedIn ? "WE LOGGED IN BABY" : <LoginPage />}</>;
}

export default LoginHandler;

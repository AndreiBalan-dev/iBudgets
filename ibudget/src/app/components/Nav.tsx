import { useRouter } from "next/router";
import supabase from "../utils/supabaseClient";

type NavProps = {
  userName?: string;
  user?: any; // Adjust the type according to your user object structure
};

const Nav: React.FC<NavProps> = ({ userName, user }) => {
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav>
      <a href="/" aria-label="Go to home">
        <img src="/logomark.svg" alt="iBudget Home" height={30} />
        <span>iBudget</span>
      </a>
      {userName && (
        <button onClick={() => router.back()} className="btn btn--dark">
          Go Back
        </button>
      )}
      {user && (
        <button className="btn btn--primary" onClick={handleSignout}>
          Sign out
        </button>
      )}
    </nav>
  );
};

export default Nav;

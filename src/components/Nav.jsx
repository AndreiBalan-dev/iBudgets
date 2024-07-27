// rrd imports
import { Form, NavLink, useNavigate } from "react-router-dom";

// library
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// assets
import logomark from "../assets/logomark.svg";

const Nav = ({ userName }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    console.log("Test");
    localStorage.removeItem("userName");
    navigate(0);
  };

  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="iBudget Home" height={30} />
        <span>iBudgets</span>
      </NavLink>
      {userName && (
        <button
          onClick={handleRedirect}
          className="btn btn--dark text-white bg-hslblack flex items-center justify-center px-4 py-2 text-base font-normal mr-2"
        >
          <span>Go Back</span>
          <ArrowUturnLeftIcon width={20} />
        </button>
      )}
    </nav>
  );
};
export default Nav;

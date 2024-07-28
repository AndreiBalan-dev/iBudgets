import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// library
import { StarIcon, UserCircleIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";
import womanWithLaptop from "../assets/woman-with-laptop.png";
import budgetBoxes from "../assets/budget-boxes.png";
import LoginPage from "./LoginPage";
import Waitlist from "./Waitlist";

const Intro = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isInLoginPage, setIsInLoginPage] = useState(false);
  const [isInDiscoverPage, setIsInDiscoverPage] = useState(false);
  const [history, setHistory] = useState([]);

  const handleDiscoverPremium = () => {
    setHistory((prev) => [...prev, { isInLoginPage, isInDiscoverPage }]);
    setIsInDiscoverPage(true);
    window.history.pushState(null, "", window.location.href);
  };

  const handleLoginPage = () => {
    setHistory((prev) => [...prev, { isInLoginPage, isInDiscoverPage }]);
    setIsInLoginPage(true);
    window.history.pushState(null, "", window.location.href);
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      const prevState = history[history.length - 1];
      setIsInLoginPage(prevState.isInLoginPage);
      setIsInDiscoverPage(prevState.isInDiscoverPage);
      setHistory((prev) => prev.slice(0, prev.length - 1));
    } else {
      setIsInLoginPage(false);
      setIsInDiscoverPage(false);
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      handleGoBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {isInLoginPage && !isInDiscoverPage && (
        <LoginPage handleGoBack={handleGoBack} />
      )}
      {!isInLoginPage && isInDiscoverPage && (
        <Waitlist handleGoBack={handleGoBack} />
      )}
      {!isInDiscoverPage && !isInLoginPage && (
        <div className="intro">
          <h1 className="intro-heading">
            Take Control of <br />
            <span className="accent whitespace-nowrap">Your Money</span>
          </h1>
          <div className="intro-buttons-container">
            <button
              onClick={handleDiscoverPremium}
              name="_action"
              value="discoverPremium"
              className="btn btn--premium flex items-center justify-center w-full max-w-xs px-4 py-2 text-base font-nosrmal mt-4"
            >
              <span>Discover Premium</span>
              <StarIcon width={20} />
            </button>
            <button
              onClick={handleLoginPage}
              className="btn btn--dark flex items-center justify-center w-full max-w-xs py-6 text-lg font-normal mt-4"
            >
              <span>Sign In / Sign Up</span>
              <UserCircleIcon width={20} />
            </button>
          </div>
          <div className="intro-content">
            <div className="intro-text"></div>
            <div
              className="intro-images"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "var(--space-lg)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={womanWithLaptop}
                alt="Woman with laptop"
                style={{
                  maxWidth: "100%",
                  width: "200px",
                  borderRadius: "var(--round-lg)",
                }}
              />
              <img
                src={budgetBoxes}
                alt="Budget boxes"
                style={{
                  maxWidth: "100%",
                  width: "200px",
                  borderRadius: "var(--round-lg)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;

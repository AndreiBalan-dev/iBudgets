import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LoginPage from "./LoginPage";
import Waitlist from "./Waitlist";
import womanWithLaptop from "../assets/woman-with-laptop.png";
import budgetBoxes from "../assets/budget-boxes.png";

const Intro: React.FC = () => {
  const [isInLoginPage, setIsInLoginPage] = useState(false);
  const [isInDiscoverPage, setIsInDiscoverPage] = useState(false);
  const [history, setHistory] = useState<
    { isInLoginPage: boolean; isInDiscoverPage: boolean }[]
  >([]);
  const [isOnMobile, setIsOnMobile] = useState(false);
  const [underThreeHundred, setUnderThreeHundred] = useState(false);

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
    const handlePopState = () => {
      handleGoBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      setIsOnMobile(windowWidth < 1000);
      setUnderThreeHundred(windowWidth < 350);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      {isInLoginPage && !isInDiscoverPage && (
        <LoginPage handleGoBack={handleGoBack} />
      )}
      {!isInLoginPage && isInDiscoverPage && (
        <Waitlist handleGoBack={handleGoBack} />
      )}
      {!isInDiscoverPage && !isInLoginPage && (
        <div className="intro flex flex-col">
          <h1 className="intro-heading text-center">
            <span>Take Control of</span>
            <span className="accent">Your Money</span>
          </h1>
          <div className="intro-buttons-container">
            <button onClick={handleLoginPage} className="btn btn--dark">
              <span>Sign In / Sign Up</span>
            </button>
            <button
              onClick={handleDiscoverPremium}
              className="btn btn--premium"
            >
              <span>Discover Premium</span>
            </button>
          </div>
          <div className="min-w-full mt-8">
            {isOnMobile ? (
              <div className="flex flex-col items-center justify-center gap-8">
                <Image src={womanWithLaptop} alt="Woman with laptop" />
                <Image src={budgetBoxes} alt="Budget boxes" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-8">
                <Image src={womanWithLaptop} alt="Woman with laptop" />
                <Image src={budgetBoxes} alt="Budget boxes" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;

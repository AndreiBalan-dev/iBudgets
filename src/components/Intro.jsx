import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// library
import { StarIcon, UserCircleIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";
import womanWithLaptop from "../assets/woman-with-laptop.png";
import budgetBoxes from "../assets/budget-boxes.png";
import budgetBoxOne from "../assets/budget-one.png";
import budgetBoxTwo from "../assets/budget-two.png";
import LoginPage from "./LoginPage";
import Waitlist from "./Waitlist";

const Intro = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isInLoginPage, setIsInLoginPage] = useState(false);
  const [isInDiscoverPage, setIsInDiscoverPage] = useState(false);
  const [history, setHistory] = useState([]);
  const [isOnMobile, setIsOnMobile] = useState(false);

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

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1000) {
        setIsOnMobile(false);
      } else {
        setIsOnMobile(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    console.log("A");

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
      {!isInDiscoverPage &&
        !isInLoginPage &&
        (!isOnMobile ? (
          <>
            <div className="intro flex flex-col">
              <h1 className="flex flex-col items-center intro-heading justify-items-center whitespace-nowrap">
                <span>Take Control of</span>
                <span className="accent">Your Money</span>
              </h1>
              <div className="intro-buttons-container">
                <button
                  onClick={handleDiscoverPremium}
                  name="_action"
                  value="discoverPremium"
                  className="btn btn--premium flex bg-electric_blue text-white items-center justify-center w-full max-w-xs px-4 py-2 text-base mt-4"
                >
                  <span>Discover Premium</span>
                  <StarIcon width={20} />
                </button>
                <button
                  onClick={handleLoginPage}
                  className="btn btn--dark bg-hslblack text-white flex items-center justify-center w-full max-w-xs py-2 text-base mt-4"
                >
                  <span>Sign In / Sign Up</span>
                  <UserCircleIcon width={20} />
                </button>
              </div>
            </div>
            <div className=" min-w-full mt-8">
              <div className=" flex flex-row items-center justify-items-start justify-center gap-8">
                <img
                  src={womanWithLaptop}
                  alt="Woman with laptop"
                  className="rounded-lg max-w-[140px] sm:max-w-[200px]"
                />
                <img
                  src={budgetBoxes}
                  alt="Budget boxes"
                  className="rounded-lg max-w-[140px] sm:max-w-[200px]"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="intro flex flex-col">
              <h1 className="flex flex-col items-center intro-heading justify-items-center whitespace-nowrap">
                <span>Take Control of</span>
                <span className="accent">Your Money</span>
              </h1>
              <div className="intro-buttons-container">
                <button
                  onClick={handleDiscoverPremium}
                  name="_action"
                  value="discoverPremium"
                  className="btn btn--premium flex bg-electric_blue text-white items-center justify-center w-full max-w-xs px-4 py-2 text-base mt-4"
                >
                  <span>Discover Premium</span>
                  <StarIcon width={20} />
                </button>
                <button
                  onClick={handleLoginPage}
                  className="btn btn--dark bg-hslblack text-white flex items-center justify-center w-full max-w-xs py-2 text-base mt-4"
                >
                  <span>Sign In / Sign Up</span>
                  <UserCircleIcon width={20} />
                </button>
              </div>
            </div>
            <div className="items-end min-w-full mt-8 flex justify-between">
              <img
                src={womanWithLaptop}
                alt="Woman with laptop"
                className="absolute top-96 left-40 xl:left-auto rounded-lg xl:right-[65%] 2xl:right-[62%] max-w-[140px] sm:max-w-[250px]"
              />
              <div className="border-2 flex flex-row">
                <img
                  src={budgetBoxOne}
                  alt="Woman with laptop"
                  className="absolute right-36 rounded-lg xl:right-[18%] 2xl:right-[25%] max-w-[140px] sm:max-w-[350px]"
                />
                <img
                  src={budgetBoxTwo}
                  alt="Woman with laptop"
                  className="absolute top-1/2 right-16 rounded-lg xl:right-[12%] 2xl:right-[20%] max-w-[140px] sm:max-w-[300px]"
                />
              </div>
            </div>
          </>
        ))}
    </>
  );
};

export default Intro;

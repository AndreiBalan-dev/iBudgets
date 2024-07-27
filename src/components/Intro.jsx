import React, { useRef, useState } from "react";
import { Form } from "react-router-dom";

// library
import { StarIcon, UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";
import LoginPage from "./LoginPage";
import Waitlist from "./Waitlist";

const Intro = () => {
  const formRef = useRef(null);
  const [isInLoginPage, setIsInLoginPage] = useState(false);
  const [isInDiscoverPage, setIsInDiscoverPage] = useState(false);

  const handleDiscoverPremium = () => {
    setIsInDiscoverPage(true);
  };

  const handleLoginPage = () => {
    setIsInLoginPage(true);
  };

  const handleGoBack = () => {
    setIsInLoginPage(false);
    setIsInDiscoverPage(false);
  };

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
          <div>
            <h1>
              Take Control of <span className="accent">Your Money</span>
            </h1>
            <p>
              Personal budgeting is the secret to financial freedom. Start your
              journey today.
            </p>

            <input type="hidden" name="_action" value="newUser" />
            <button
              onClick={handleLoginPage}
              className="btn btn--dark bg-hslblack text-white flex items-center justify-center px-4 py-2 text-base font-normal mr-2 mt-4"
            >
              <span>Create Account</span>
              <UserPlusIcon width={20} />
            </button>
            <button
              onClick={handleDiscoverPremium}
              name="_action"
              value="discoverPremium"
              className="btn btn--dark bg-hslblack text-white flex items-center justify-center px-4 py-2 text-base font-normal mr-2"
            >
              <span>Discover Premium</span>
              <StarIcon width={20} />
            </button>
          </div>
          <img src={illustration} alt="Person with money" width={600} />
        </div>
      )}
    </>
  );
};

export default Intro;

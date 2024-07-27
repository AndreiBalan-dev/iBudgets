import React, { useRef } from 'react';
import { Form } from "react-router-dom";

// library
import { StarIcon, UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const formRef = useRef(null);

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <Form ref={formRef} method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?" aria-label="Your Name" autoComplete="given-name"
          />
          <button type="submit" name="_action" value="newUser" className="btn btn--dark bg-hslblack text-white flex items-center justify-center px-4 py-2 text-base font-normal mr-2">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
          <button type="submit" name="_action" value="discoverPremium" className="btn btn--dark bg-hslblack text-white flex items-center justify-center px-4 py-2 text-base font-normal mr-2">
            <span>Discover Premium</span>
            <StarIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;

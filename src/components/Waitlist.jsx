import React, { useState } from "react";

const Waitlist = ({ handleGoBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, e.g., sending the email to your backend.
    setMessage("Thank you for signing up! You'll hear from us soon.");
    setEmail("");
  };

  return (
    <div className="flex flex-col justify-center min-w-full items-center">
      <h2 className="flex text-7xl sm:text-7xl md:text-8xl font-bold mb-4 gap-5 flex-col sm:flex-row items-center justify-center">
        <span>Join</span>
        <span className="">Our</span>
        <span className="accent">Waitlist</span>
      </h2>

      <p className="mb-6 text-sm sm:text-lg md:text-xl">
        Sign up with your email to join our waitlist for premium features.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-between">
          <button
            type="submit"
            className="btn btn--dark text-white bg-hslblack flex items-center justify-center px-4 py-2 text-base font-normal ml-2 sm:min-w-screen-sm md:min-w-screen-md min-w-full"
          >
            Sign Up
          </button>
          <button
            onClick={handleGoBack}
            className="btn btn--dark text-white bg-hslblack flex items-center justify-center px-4 py-2 text-base font-normal ml-2 sm:min-w-screen-sm md:min-w-screen-md min-w-full"
          >
            Go Back
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default Waitlist;

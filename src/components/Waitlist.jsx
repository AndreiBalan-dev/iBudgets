import React, { useEffect, useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import supabase from "../../supabaseClient";

const Waitlist = ({ handleGoBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [emails, setEmails] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("users").select("email");
      if (data) {
        setEmails(data);
      }
      if (error) {
        console.log("error has occured", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here, e.g., sending the email to your backend.

    if (emails.some((user) => user.email === email)) {
      setMessage("Thank you for signing up! You'll hear from us soon.");
    } else {
      const { data, error } = await supabase.from("users").insert([{ email }]);
      if (data) {
        console.log("horray! you've signed up");
      }
      if (error) {
        setMessage("An error occurred. Please try again later.");
      }
    }
    setMessage("Thank you for signing up! You'll hear from us soon.");
    setEmail("");
  };

  return (
    <div className="flex flex-col justify-center min-w-full items-center">
      <h2 className="flex text-7xl sm:text-7xl md:text-7.5xl lg:text-8xl font-bold mb-4 gap-5 flex-col md:flex-row items-center justify-center">
        <span>Join Our</span>
        <span className="accent text-7.5xl sm:text-9xl md:text-7.5xl">
          Waitlist
        </span>
      </h2>

      <p className="mb-6 text-base sm:text-lg md:text-xl mt-4">
        Sign up to join our waitlist for premium features.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
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
            className="btn btn--dark text-white bg-hslblack flex items-center justify-center mt-5 px-4 py-2 text-base font-normal ml-2 sm:min-w-screen-sm md:min-w-screen-md min-w-64 hover:min-w-[17rem] transition-all duration-300"
          >
            Sign Up
            <RocketLaunchIcon width={18} className="mt-[0.12rem]" />
          </button>
        </div>
      </form>
      {message && <p className="mt-16 accent font-semibold">{message}</p>}
    </div>
  );
};

export default Waitlist;

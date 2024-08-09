import { useState, useEffect } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import supabase from "../utils/supabaseClient";

interface WaitlistProps {
  handleGoBack: () => void;
}

const Waitlist: React.FC<WaitlistProps> = ({ handleGoBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("waitlist").select("email");
      if (data) {
        setEmails(data.map((entry) => entry.email));
      }
      if (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emails.includes(email)) {
      setMessage("Thank you for signing up! You'll hear from us soon.");
    } else {
      const { data, error } = await supabase
        .from("waitlist")
        .insert([{ email }]);
      if (data) {
        setMessage("Thank you for signing up! You'll hear from us soon.");
      }
      if (error) {
        setMessage("An error occurred. Please try again later.");
      }
    }

    setEmail("");
  };

  return (
    <div className="flex flex-col justify-center min-w-full items-center text-center">
      <h2 className="font-bold mb-4">Join Our Waitlist</h2>
      <p className="mb-6">Sign up to join our waitlist for premium features.</p>
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
        <button
          type="submit"
          className="btn btn--dark flex items-center justify-center mt-5"
        >
          Sign Up
          <RocketLaunchIcon width={18} className="ml-2" />
        </button>
      </form>
      {message && <p className="mt-4 text-accent">{message}</p>}
    </div>
  );
};

export default Waitlist;

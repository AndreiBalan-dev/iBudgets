import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Waitlist = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      localStorage.removeItem("waitlist");
      navigate(0); 
    };
    
  return (
    <>
        <h2>Welcome to Premium Features</h2>
        <p>You now have access to premium features!</p>
        <button onClick={handleGoBack} className="btn btn--dark text-white bg-hslblack flex items-center justify-center px-4 py-2 text-base font-normal mr-2">
            Go Back
        </button>
    </>
  );
};

export default Waitlist;

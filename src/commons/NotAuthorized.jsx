import React from "react";
import { MainButton } from "../components/ui/buttons";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleSignUpClicked = () => {
    navigate("/register");
  };

  const handleSignInClicked = () => {
    navigate("/login");
  };
  return (
    <section className="flex justify-center items-center  bg-slate-400 h-screen">
      <div className="flex flex-col items-center p-4">
        <h2 className="text-3xl text-white font-bold">401</h2>
        <h3 className="text-black text-xl font-bold">Not Authorized</h3>
        <div className="flex mt-5 gap-3">
          <MainButton text="Sign In" handleClick={handleSignInClicked} />

          <MainButton text="Sign Up" handleClick={handleSignUpClicked} />
        </div>
      </div>
    </section>
  );
};

export default NotAuthorized;

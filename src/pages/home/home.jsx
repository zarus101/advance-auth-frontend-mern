import React from "react";
import { MainButton } from "../../components/ui/buttons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClicked = () => {
    navigate("/register");
  };

  const handleSignInClicked = () => {
    navigate("/login");
  };

  return (
    <section>
      <div className="flex justify-center bg-slate-400 items-center h-screen">
        <div className="flex gap-3">
          <MainButton text="Sign In" handleClick={handleSignInClicked} />

          <MainButton text="Sign Up" handleClick={handleSignUpClicked} />
        </div>
      </div>
    </section>
  );
};

export default Home;

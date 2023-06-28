import React from "react";
import { MainButton } from "../components/ui/buttons";
import { NavLink, useNavigate } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout, UserName } from "../components/protect/hiddnLink";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUpClicked = () => {
    navigate("/register");
  };

  const handleSignInClicked = () => {
    navigate("/login");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    console.log("hello");
    navigate("/login");
  };
  return (
    <div className="z-[1000px] sticky top-0 bg-white shadow-md">
      <div className="containers">
        <div className="flex justify-between items-center w-full  p-5">
          <div className="logo h-full">
            <h2 className="text-center text-[25px] font-bold tracking-widest">APP</h2>
          </div>
          <div className="buttons flex text-center w-[20%] justify-end gap-3">
            <ShowOnLogin>
              <div className="flex mt-3 gap-4 text-center align-middle">
                <FaUserCircle size={40} className="text-4xl" /> {/* Increase the size of the icon */}
                <UserName />
              </div>
            </ShowOnLogin>
            <ShowOnLogout>
              <div className="flex  gap-4 items-center">
                <MainButton text="Sign In" handleClick={handleSignInClicked} />

                <MainButton text="Sign Up" handleClick={handleSignUpClicked} />
              </div>
            </ShowOnLogout>
            <ShowOnLogin>
              <div className="flex items-center">
                <MainButton text="Log Out" handleClick={logoutUser} />
              </div>
            </ShowOnLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

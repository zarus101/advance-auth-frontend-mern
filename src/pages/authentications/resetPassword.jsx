import React, { useEffect, useState } from "react";
import { GridComponent } from "../../components/ui/design";
import image1 from "../../assests/login/shape1.png";

import LeftSide from "../../components/authentication/LeftSide";
import { MainButton } from "../../components/ui/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";

const ResetPassword = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const navigate = useNavigate();

  const style2 = {
    transform: `translate(${-(mousePosition.x - 500) / 200}px, ${-(mousePosition.y - 500) / 200}px)`,
  };

  const handleSignInClicked = () => {
    navigate("/login");
  };

  //////

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const {isSuccess, message}= useSelector((state)=>state.auth)

  const handleResetClicked = async (e) => {
    e.preventDefault();
    if (newPass.length < 6) {
      return toast.error("Passwrod must be of 6 characters");
    }
    if (newPass !== confirmPass) {
      return toast.error("Password do not match");
    }

    const userData = {
      password: newPass,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("Password Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);


  return (
    <>
      <div className="login-container bg-loginImg h-[100vh] bg-contain bg-no-repeat pt-[100px]  px-10" onMouseMove={handleMouseMove}>
        <div className="fixedimage h-full absolute left-0 bottom-0 top-0 -z-10">
          <figure>
            <img src={image1} alt="img" className="h-[100vh]" />
          </figure>
        </div>
        <div className="containers relative">
          <GridComponent col="grid-cols-3">
            <LeftSide style2={style2} text="Reset your password" text1="If you remember your password" text2="Sign In" hanldeClick={handleSignInClicked} />

            <div className="form-part py-10 pl-3 flex flex-col justify-center gap-5 ">
              <div className="flex flex-col gap-5">
                <input type="password" placeholder="New Password****" name="newPass" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
                <input type="password" placeholder="Confirm Password****" name="confirmPass" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
              </div>

              <div className="button">
                <MainButton text="Reset Password" handleClick={handleResetClicked} />
              </div>
              <div className="text-red-500 font-semibold text-[20px] flex justify-center cursor-pointer">
                <h3 onClick={handleSignInClicked}>cancel this ?</h3>
              </div>
            </div>
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

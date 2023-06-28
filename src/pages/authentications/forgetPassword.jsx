import React, { useState } from "react";
import { GridComponent } from "../../components/ui/design";
import image1 from "../../assests/login/shape1.png";

import LeftSide from "../../components/authentication/LeftSide";
import { MainButton } from "../../components/ui/buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/services/authService";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/features/auth/authSlice";

const ForgetPassword = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const navigate = useNavigate();

  const style2 = {
    transform: `translate(${-(mousePosition.x - 500) / 100}px, ${-(mousePosition.y - 500) / 100}px)`,
  };


  ///
  const [email, setEmail]= useState("")
  const dispatch= useDispatch()
  const handleSignInClicked = () => {
    navigate("/login");
  };



  const hanldeRecoveryClicked=async()=>{
    if(!email){
      toast.error("email is required")
    }
    if(!validateEmail(email)){
      toast.error("email is not valid")
    }
    const userData={
      email: email
    }
    await dispatch(forgetPassword(userData))
  }

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
            <LeftSide style2={style2} text="Provide your email to send recovery link" text1="If you remember your password" text2="Sign In" hanldeClick={handleSignInClicked} />

            <div className="form-part py-10 pl-3 flex flex-col justify-center gap-5 ">
              <div className="flex flex-col gap-5">
                <input type="text" placeholder="Enter Email" name= "email" value={email} onChange={(e)=> setEmail(e.target.value)} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
              </div>

              <div className="button flex justify-center">
                <MainButton text="Request recovery Link" handleClick={hanldeRecoveryClicked} />
              </div>
              <div className="text-red-500 font-semibold text-[20px] flex justify-center cursor-pointer">
                <h3  onClick={handleSignInClicked}>cancel this ?</h3>
              </div>

            </div>
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

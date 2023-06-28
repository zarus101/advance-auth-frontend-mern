import React, { useEffect, useState } from "react";
import { GridComponent } from "../../components/ui/design";
import image1 from "../../assests/login/shape1.png";

import LeftSide from "../../components/authentication/LeftSide";
import { MainButton } from "../../components/ui/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, loginWithCode } from "../../redux/features/auth/authSlice";

const LoginWithCode = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const navigate = useNavigate();

  const style2 = {
    transform: `translate(${-(mousePosition.x - 500) / 100}px, ${-(mousePosition.y - 500) / 100}px)`,
  };

  const handleSignInClicked = () => {
    navigate("/login");
  };


  const {isSuccess, isLoggedIn}= useSelector((state)=> state.auth)


  ///
  const [loginCode, setLoginCode]= useState("")
  const dispatch= useDispatch()
  const {email}= useParams()


  const handleProceedClicked=async()=>{
    const data={
      loginCode: loginCode
    }
    await dispatch(loginWithCode({email ,data}))

  }

  
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);


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
            <LeftSide style2={style2} text="Proceed to the login with code sent in your email"/>

            <div className="form-part py-10 pl-3 flex flex-col justify-center gap-5 ">
              <div className="flex flex-col gap-5">
                <input type="text" placeholder="Enter Login Code" name="loginCode" value={loginCode} onChange={(e)=> setLoginCode(e.target.value)} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
              </div>

              <div className="button">
                <MainButton text="Proceed to Login" handleClick={handleProceedClicked} />
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

export default LoginWithCode;

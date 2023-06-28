import React, { useEffect, useState } from "react";
import { GridComponent } from "../../components/ui/design";
import image1 from "../../assests/login/shape1.png";

// import { AiOutlineGooglePlus } from "react-icons/ai";
import LeftSide from "../../components/authentication/LeftSide";
import { MainButton } from "../../components/ui/buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { RESET, login, loginWithGoogle, sendLoginCode } from "../../redux/features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const style2 = {
    transform: `translate(${-(mousePosition.x - 500) / 100}px, ${-(mousePosition.y - 500) / 100}px)`,
  };

  //
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isSuccess, isError, twoFactor } = useSelector((state) => state.auth);

  ///register navigation
  const handleSignUpClicked = () => {
    navigate("/register");
  };

  ////foregt navigation
  const hanldeForgetClicked = () => {
    navigate("/forgetpassword");
  };

  ///login function
  const handleSignInClicked = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  ///function for after logging
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    console.log(twoFactor);
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));

      navigate(`/loginwithcode/${email}`);
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, isError, twoFactor, dispatch, navigate, email]);

  const loginGoogle = async (credentialResponse) => {
    console.log(credentialResponse.credential);
    const data={
      userToken:  credentialResponse.credential
    }

    await dispatch(loginWithGoogle( data ));
  };
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
            <LeftSide style2={style2} text="Sign In to go to homepage" text1="If you don't have an acoount" text2="Sign Up" hanldeClick={handleSignUpClicked} />

            <div className="form-part py-10 pl-3 flex flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                <input type="text" placeholder="Enter Email" name="email" value={email} onChange={hanldeInputChange} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />

                <input type="password" placeholder="************" name="password" value={password} onChange={hanldeInputChange} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
              </div>
              <div className="text-[15px] cursor-pointer text-gray-400 hover:text-gray-700 transition-all duration-500" onClick={hanldeForgetClicked}>
                <h3>Forget Password?</h3>
              </div>

              <div className="button flex justify-center">
                <MainButton text="Sign In" handleClick={handleSignInClicked} />
              </div>
              <div className="flex w-full gap-8 mt-5 items-center ">
                <hr className="w-[30%] h-5 " />
                <p className="text-[15px] text-gray-400 mt-[-15px]">Or continue with</p>
                <hr className="w-[30%] h-5 " />
              </div>

              <div className=" flex justify-center">
                {/* <button className="p-5 border rounded-2xl text-red-500">
                  <AiOutlineGooglePlus size={30} />
                </button> */}
                <GoogleLogin
                  onSuccess={loginGoogle}
                  onError={() => {
                    console.log("Login Failed");
                    toast.error("Login Failed");
                  }}
                />
              </div>
            </div>
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default Login;

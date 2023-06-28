import React, { useEffect, useState } from "react";
import { GridComponent } from "../../components/ui/design";
import image1 from "../../assests/login/shape1.png";
import { AiOutlineGooglePlus } from "react-icons/ai";
import LeftSide from "../../components/authentication/LeftSide";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../components/ui/buttons";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { register, sendVerificationEmail } from "../../redux/features/auth/authSlice";
const initialState = {
  fullName: "",
  email: "",
  password: "",
  password2: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { fullName, email, password, password2 } = formData;
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const timesIcon = <RxCross2 color="red" size={20} />;
  const checkIcon = <AiOutlineCheck color="green" size={20} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }

    return timesIcon;
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };


  const style2 = {
    transform: `translate(${-(mousePosition.x - 500) / 100}px, ${-(mousePosition.y - 500) / 100}px)`,
  };

  const handleSignInClicked = () => {
    navigate("/login");
  };

  /////hanlding the input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    ///check lower and uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    ///check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    ///check for special charaters
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    ///check for pass length
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const handleSignUpClicked =async (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if(!uCase) {
      return toast.error("password must contain lowercase and uppercase")
    }
    if(!num){
      return toast.error("password must contain number")
    }
    if(!sChar){
      return toast.error("password must contain special character")
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData= {
      fullName: fullName,
      email: email,
      password: password
    }

    // registering the user
    await dispatch(register(userData))
    //sending the link for verification
    await dispatch(sendVerificationEmail())
  };

  useEffect(()=>{
    if(isSuccess && isLoggedIn){
      navigate("/profile")
    }

  }, [isSuccess, isLoggedIn, navigate])

  return (
    <>
      <div className="login-container bg-loginImg h-[100vh] bg-contain bg-no-repeat pt-[100px]  px-10" onMouseMove={handleMouseMove}>
        <div className="fixedimage h-full absolute left-0 bottom-0 top-0 -z-10">
          <figure>
            <img src={image1} alt="img" className="h-[100vh]" />
          </figure>
        </div>
        <div className="containers relative ">
          <GridComponent col="grid-cols-3">
            <LeftSide style2={style2} text="Sign Up to go to homepage" text1="If you already have an acoount" text2="Sign In" hanldeClick={handleSignInClicked} />

            <div className="form-part py-2 pl-3 flex flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                <input type="text" placeholder="Full Name" name="fullName" value={fullName} onChange={handleInputChange} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
                <input type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />

                <input type="password" placeholder="Password********" name="password" value={password} onChange={handleInputChange} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
                <input type="password" placeholder="Confirm Password********" name="password2" value={password2} onChange={handleInputChange} className="bg-gray-200 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-5 outline-0" />
              </div>

              {/* password strength  */}
              <div>
                <ul>
                  <li>
                    <span className="flex gap-1">
                      {switchIcon(uCase)}
                      &nbsp; Lowercase & Uppercase
                    </span>
                  </li>
                  <li>
                    <span className="flex gap-1">
                      {switchIcon(num)}
                      &nbsp; Number (0-9){" "}
                    </span>
                  </li>
                  <li>
                    <span className="flex gap-1">
                      {switchIcon(sChar)}
                      &nbsp; Special characters( @#$%^&*())
                    </span>
                  </li>
                  <li>
                    <span className="flex gap-1">
                      {switchIcon(passLength)}
                      &nbsp; At least 8 characters
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-2 items-center ">
                <input type="checkbox" className="h-5 w-5 rounded  text-indigo-600" />

                <h3 className="text-[20px]">
                  I agree with <span className="  text-indigo-600">Terms</span> and <span className="text-indigo-600">Privacy poilicy</span>
                </h3>
              </div>

              <div className="button flex justify-center">
                <MainButton text="Sign Up" handleClick={handleSignUpClicked} />
              </div>
         
            </div>
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default Register;

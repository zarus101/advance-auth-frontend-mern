import React, { useState } from "react";
import { GridComponent } from "../../components/ui/design";
import image1 from "../../assests/login/shape1.png";

import LeftSide from "../../components/authentication/LeftSide";
import { MainButton } from "../../components/ui/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";

const VerifyUser = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const style2 = {
    transform: `translate(${-(mousePosition.x - 500) / 100}px, ${-(mousePosition.y - 500) / 100}px)`,
  };

  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.auth);


  const verifyAccount=async()=>{
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
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
            <LeftSide style2={style2} text="Click the button to verify the acoount"/>

            <div className="form-part py-10 pl-3 flex flex-col justify-center gap-5 ">
    
              <div className="button">
                <MainButton text="Verify Account" handleClick={verifyAccount} />
              </div>
              <p>click the button to verify your account</p>
     

            </div>
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default VerifyUser;

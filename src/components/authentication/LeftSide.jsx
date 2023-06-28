import React from "react";
import flyingimg from "../../assests/login/flying-img.png";
import logo from "../../assests/login/logo-34.png";
import { MainHeading } from "../ui/titles";

const LeftSide = ({style2, text, hanldeClick, text1, text2}) => {

  return (
    <div className="left-part relative col-span-2">
      <div className="animated-image absolute top-0 h-full w-[60%] right-0">
        <figure style={style2}>
          <img src={flyingimg} alt="img" className="h-full" />
        </figure>
      </div>
      <div className="text-section flex flex-col gap-10">
        <div className="logo h-[50px]">
          <figure className="h-full w-[20%] mobile:w-[40%]">
            <img src={logo} alt="logo" className="h-full w-full bg-cover" />
          </figure>
        </div>
        <div className="text-1 w-[40%] mobile:w-[100%]">
          <MainHeading text={text} />
        </div>
        <div className="text-2 text-[25px] font-semibold">
          <h3>{text1}</h3>
          <h3>
            You can <span className=" text-indigo-600 font-bold hover:text-indigo-800 duration-500 cursor-pointer" onClick={hanldeClick}>{text2}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

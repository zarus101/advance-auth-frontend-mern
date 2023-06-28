import React from "react";
import { UserName } from "../../components/protect/hiddnLink";

const Profile = () => {
  return (
    <>
      <section>
        <div className="flex justify-center bg-slate-400 items-center h-screen">
          <h2 className="text-center text-white text-[20px] font-bold">Welcome <UserName/></h2>
        </div>
      </section>
    </>
  );
};

export default Profile;

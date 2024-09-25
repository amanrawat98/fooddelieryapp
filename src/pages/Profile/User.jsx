import React from "react";
import { useSelector } from "react-redux";

const User = () => {
  const userData = useSelector((state) => state.user.userData);

  console.log(userData);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col">
        <div className="w-24 rounded-full overflow-hidden items-center mx-auto">
          {/*             <img src={`${userData.customerImageUrl === "" ? : }`} />
           */}{" "}
        </div>
        <h2 className="text-2xl font-bold">{`Hi there ${userData?.firstName}`}</h2>
      </div>

      <div></div>
    </div>
  );
};

export default User;

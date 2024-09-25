import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoReorderFour } from "react-icons/io5";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 text-xl space-y-5 bg-gray-300">
        <div
          className="cursor-pointer flex  gap-3 items-center hover:bg-slate-200 p-2"
          onClick={() => navigate("/profile")}
        >
          {" "}
          <CgProfile className="text-[#ea580c]  size-7" /> Profile
        </div>
        <div
          className="cursor-pointer flex  gap-3 items-center hover:bg-slate-200 p-2"
          onClick={() => navigate("/profile/orders")}
        >
          {" "}
          <IoReorderFour className="text-[#ea580c]  size-7" /> My Orders
        </div>
        <div className="cursor-pointer flex  gap-3 items-center hover:bg-slate-200 p-2">
          <IoIosLogOut className="text-[#ea580c]  size-7" /> Logout
        </div>
      </div>
      <div className="col-span-3 bg-slate-400">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userFallBackImg from "../../assets/user.png";

const User = () => {
  const userData = useSelector((state) => state.user.userData);

  console.log(userData);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    setUser({
      name: userData.firstName  === "" ? "N/A " : userData.firstName,
      email: userData.email === "" ? "N/A " : userData.email,
      phone: userData.phone === "" ? "N/A " : userData.phone,
      dateOfBirth: userData.dateOfBirth === "" ? "N/A " : userData.dateOfBirth,
      gender:
        userData.gender === "Prefer Not To Disclose" ? "N/A" : userData.gender,
    });
  }, [userData]);

  return (
    <div className="space-y-3">
      <div className="flex justify-center flex-col space-y-3">
        <div className=" rounded-full  items-center mx-auto">
          <img
            className="w-20 mx-auto"
            src={`${
              userData?.customerImageUrl === ""
                ? userFallBackImg
                : userData?.customerImageUrl
            }`}
          />{" "}
          <h2 className="text-2xl font-bold">{`Hi there ${userData?.firstName}`}</h2>
        </div>
      </div>

      <div className="flex justify-center space-y-4">
        <form className="space-y-5">
          <div className="gap-3 flex items-center">
            <label htmlFor="name" className="text-lg w-20">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user?.name}
              disabled
              className="outline-none px-5 py-2 rounded-3xl  bg-orange-200"
            />
          </div>
          <div className="gap-3 flex items-center">
            <label htmlFor="email" className="text-lg w-20">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user?.email}
              disabled
              className="outline-none px-5 py-2  rounded-3xl  bg-orange-200"
            />
          </div>{" "}
          <div className="gap-3 flex items-center ">
            <label htmlFor="number" className="text-lg w-20">
              Mobile No
            </label>
            <input
              type="text"
              name="number"
              id="number"
              value={user?.phone}
              className="outline-none   px-5 py-2 rounded-3xl  bg-orange-200"
              disabled
            />
          </div>{" "}
          <div className="gap-3 flex items-center">
            <label htmlFor="date" className="text-lg w-20">
              D.O.B
            </label>
            <input
              type={user?.dateOfBirth === "" ? "date" : "text"}
              name="date"
              id="date"
              value={user?.dateOfBirth}
              disabled
              className="outline-none   px-5 py-2 rounded-3xl  bg-orange-200"
            />
          </div>{" "}
          <div className="gap-3 flex items-center">
            <label htmlFor="gender" className="text-lg w-20">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              id="gender"
              value={user?.gender}
              disabled
              className="outline-none  px-5 py-2 rounded-3xl  bg-orange-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;

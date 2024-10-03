import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const ShowAndHidePassword = ({ name,value, handleSetResetPasswordData, inputName, placeholderValue }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="relative">
      <input
        placeholder={placeholderValue}
        name={inputName}
        value={value}
        type={passwordShown ? "text" : "password"}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleSetResetPasswordData}
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
        onClick={togglePasswordVisiblity}
      >
        {passwordShown ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
  );
};

export default ShowAndHidePassword;

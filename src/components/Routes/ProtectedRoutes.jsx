import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  const navigate = useNavigate();

  return isUserLogin ? children : navigate("/");
};

export default ProtectedRoutes;

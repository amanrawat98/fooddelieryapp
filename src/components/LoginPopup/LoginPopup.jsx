import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserLoginStatus } from "../../feature/userSlice";
import {
  setOutletData,
  setResturantData,
} from "../../feature/resturantDataSlice";
import { setCartItems } from "../../feature/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowAndHidePassword from "../ShowAndHidePassword";
import { emailRegex, phoneRegex } from "../../constaints/constaints";

const Login = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const resturantdata = useSelector((state) => state?.resturant?.resturantdata);

  let restaurantId;

  if (resturantdata?.result?.restaurantId) {
    restaurantId = resturantdata?.result?.restaurantId;
  }

  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const [resetPasswordData, setResetPasswordData] = useState({
    otp: "",
    password: "",
    comformPassword: "",
  });

  const handleSetResetPasswordData = (e) => {
    const { value, name } = e.target;
    setResetPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let cartId;
  let outletId;
  if (cartItems && cartItems.cartId) {
    cartId = cartItems.cartId;
  }

  if (cartItems && cartItems.outletId) {
    outletId = cartItems.outletId;
  }

  const [loginData, setLoginData] = useState({
    email: "",
    phone: "",
    password: "",
    loginMethod: "email",
    role: "customer",
    outletId: outletId || null,
    temporaryCartId: cartId || null,
  });

  const handleSetUserData = (e) => {
    const { value } = e.target;

    if (emailRegex.test(value)) {
      setLoginData((prev) => ({
        ...prev,
        email: value,
        phone: "",
      }));
    } else if (phoneRegex.test(value)) {
      setLoginData((prev) => ({
        ...prev,
        phone: value,
        email: "",
      }));
    }
  };

  const handleUserLogin = async (payload) => {
    console.log(payload);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login`,
      payload
    );
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...(loginData.email
        ? { email: loginData.email }
        : { phone: loginData.phone }),
      password: loginData.password,
      loginMethod: loginData.email ? "email" : "phone", // Set login method
      role: "customer",
      outletId: outletId || null,
      temporaryCartId: cartId || null,
    };

    const data = await handleUserLogin(payload);
    const resturantdata = data;
    const { result, customerCart, restaurantData } = resturantdata || {};
    const { restaurantOutlets } = restaurantData || {};

    if (resturantdata && restaurantOutlets) {
      dispatch(setResturantData(resturantdata));
      dispatch(setOutletData(restaurantOutlets[0]));
      dispatch(setCartItems(customerCart));
    }
    if (resturantdata.detail) {
      dispatch(setUserLoginStatus(true));
    }

    dispatch(setUserData(data?.result));
    localStorage.clear("sessionid");
    setIsLogin(false);

    navigate('/')
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const payload = {
      email: loginData.email, // You may choose to send the email or phone here
      restaurantId: restaurantId,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/forgot-password`,
        payload
      );

      const { result } = response?.data;

      if (result) {
        setPage("resetPassword");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      {page === "login" && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[65%] ">
          <div
            className="text-end text-3xl cursor-pointer "
            onClick={() => setIsLogin(false)}
          >
            X
          </div>
          <h2 className="text-center text-3xl font-semibold mb-3">Login</h2>
          <h3 className="text-center text-gray-400 text-sm mb-3">
            Add your details to login
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text" // Changed to text to accept both email and phone
              placeholder="Your email or Phone no"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSetUserData}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-500 transition duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full border-2 py-2 rounded-lg border-orange-400 text-black"
              onClick={() => setIsLogin(false)}
            >
              Cancel
            </button>
            <h3
              className="text-center text-gray-400 text-sm cursor-pointer"
              onClick={() => {
                setPage("forgotPassword");
              }}
            >
              Forgot Your password?
            </h3>
          </form>
        </div>
      )}

      {page === "forgotPassword" && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[65%]">
          <div
            className="text-end text-3xl cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            X
          </div>
          <div className="space-y-4 mb-11 mt-6">
            <h2 className="text-center text-3xl font-semibold">
              Forgot Password
            </h2>
            <h3 className="text-center text-gray-400 text-sm">
              Add your details to reset your password
            </h3>
          </div>

          <form className="space-y-6" onSubmit={handleSendOtp}>
            <input
              type="text" // Changed to text to accept both email and phone
              placeholder="Your email or Phone no"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleSetUserData(e)}
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-500 transition duration-300"
            >
              Get OTP
            </button>
            <button
              type="button"
              className="w-full border-2 py-2 rounded-lg border-orange-400 text-black"
              onClick={() => setIsLogin(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {page === "resetPassword" && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[75%]">
          <div
            className="text-end text-3xl cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            X
          </div>
          <div className="space-y-4 mb-4 ">
            <h2 className="text-center text-3xl font-semibold">
              Reset Password
            </h2>
            <h3 className="text-center text-gray-400 text-sm">
              Add your details to update your password
            </h3>
          </div>

          <form className="space-y-6" onSubmit={handleSendOtp}>
            <input
              type="text"
              placeholder="OTP"
              name="otp"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSetResetPasswordData}
            />
            <input
              type="password"
              placeholder="New Password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSetResetPasswordData}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              name="comformPassword"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSetResetPasswordData}
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-500 transition duration-300"
            >
              Reset Password
            </button>
            <button
              type="button"
              className="w-full border-2 py-2 rounded-lg border-orange-400 text-black"
              onClick={() => setIsLogin(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

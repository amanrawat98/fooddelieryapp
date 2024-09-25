import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserLoginStatus } from "../../feature/userSlice";
import {
  setOutletData,
  setResturantData,
} from "../../feature/resturantDataSlice";
import { setCartItems } from "../../feature/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const resturantdata = useSelector((state) => state.resturant.resturantdata);
  const navigate = useNavigate();

  let cartId;
  let outletId;
  if (cartItems && cartItems.cartId) {
    cartId = cartItems.cartId;
  }

  if (cartItems && cartItems.outletId) {
    outletId = cartItems.outletId;
  }

  console.log(cartItems, cartId, outletId);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    loginMethod: "email",
    role: "customer",
    phone: "",
    outletId: outletId || null,
    temporaryCartId: cartId || null,
  });

  const handleSetUserData = (e) => {
    const { value, name } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserLogin = async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login`,
      payload
    );
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleUserLogin(loginData);

    const resturantdata = data;
    const { result, customerCart, restaurantData } = resturantdata || {};
    const { restaurantOutlets } = restaurantData || {};

    console.log(customerCart);

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
    navigate("/")
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div
            className="text-end text-3xl cursor-pointer"
            onClick={() => {
              console.log("sf");
              setIsLogin(false);
            }}
          >
            X
          </div>
          <h2 className="text-center text-2xl font-semibold">Login</h2>
          <input
            type="email"
            placeholder="Your email"
            name="email"
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
            onChange={handleSetUserData}
          />
          <input
            type="text"
            placeholder="Phone No."
            name="phone"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSetUserData}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

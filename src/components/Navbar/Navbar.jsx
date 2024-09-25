import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus } from "../../feature/userSlice";
import {
  setResturantData,
  setOutletData,
} from "../../feature/resturantDataSlice";
import { setCartItems } from "../../feature/CartSlice";
import SignUp from "../SignUpPage/SignUpPage";
import Login from "../LoginPopup/LoginPopup";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const isUserLogin = useSelector((state) => state?.user?.isUserLogin);
  console.log(cartitems);

  const { cartCount } = cartitems || {};

  /*   console.log(cartitems);

  let cartCount;

  if(cartitems && cartitems !== undefined) {
   cartCount = cartitems.cartCount;
  }

  console.log(cartCount); */

  const dispatch = useDispatch();

  // Handle Logout
  const handleLogout = async () => {
    dispatch(setUserLoginStatus(false));
    const newSessionId = uuidv4();
    localStorage.setItem("sessionid", newSessionId);

    const getResturantData = async (sessionid) => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
        {
          params: { sessionKey: sessionid, restaurantId: 1 },
        }
      );
      return response.data;
    };

    try {
      const data = await getResturantData(newSessionId);
      const { result, customerCart } = data || {};
      const { restaurantOutlets } = result || {};

      if (result) {
        dispatch(setResturantData(result));
      }
      if (restaurantOutlets && restaurantOutlets.length > 0) {
        dispatch(setOutletData(restaurantOutlets[0]));
      }
      if (customerCart) {
        dispatch(setCartItems(customerCart));
      }

      navigate("/");

      console.log("API Response after logout:", data);
    } catch (error) {
      console.error(
        "Error fetching restaurant data with new session ID",
        error
      );
    }
  };

  return (
    <div className="">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/">
          <img src={assets?.logo} alt="logo" className="w-32" />
        </Link>
        <ul className=" space-x-6 hidden md:flex ">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`hover:text-orange-600 ${
              menu === "home" ? "text-orange-600" : "text-gray-800"
            }`}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={`hover:text-orange-600 ${
              menu === "menu" ? "text-orange-600" : "text-gray-800"
            }`}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={`hover:text-orange-600 ${
              menu === "mobile-app" ? "text-orange-600" : "text-gray-800"
            }`}
          >
            Mobile App
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={`hover:text-orange-600 ${
              menu === "contact-us" ? "text-orange-600" : "text-gray-800"
            }`}
          >
            Contact Us
          </a>
        </ul>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Link to="/cart">
              <img
                src={assets?.basket_icon}
                alt="basket_icon"
                className="w-6"
              />
            </Link>
            <div
              className={` flex absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 justify-center items-center`}
            >
              <p className="text-xs">{cartCount}</p>
            </div>
          </div>
          {!isUserLogin && (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsLogin(true)}
                className="bg-orange-600 text-white py-1 px-4 rounded-lg hover:bg-orange-500 transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className="border border-orange-600 text-orange-600 py-1 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition duration-200"
              >
                Signup
              </button>
            </div>
          )}
          {isUserLogin && (
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="bg-orange-600 text-white py-1 px-4 rounded-lg hover:bg-orange-500 transition duration-200"
              >
                Logout
              </button>

              <div
                className="avatar cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <div className="w-12 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {isSignUp && <SignUp setIsSignUp={setIsSignUp} />}
    </div>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchresturantdata } from "../../utility/FetchResturantData";
import { setCartCount } from "../../feature/CartSlice";
import { setUserLoginStatus } from "../../feature/userSlice";
import axios from "axios";
import Login from "../LoginPopup/LoginPopup";
import SignUp from "../SignUpPage/SignUpPage";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();

  const [menu, setMenu] = useState("home");

  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);


  const [itemCount, setItemCount] = useState(0);

  const cartitems = useSelector((state) => state.cart.cartItems);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  const itemcount = useSelector((state) => state.cart.cartCount);

  const dispatch = useDispatch();

  const { resturantdata, isLoading, isError, refetch } = fetchresturantdata();
  const { customerCart } = resturantdata || {};

  useEffect(() => {
    if (cartitems) {
      setItemCount(cartitems?.cartCount || 0);
      dispatch(setCartCount(cartitems?.cartCount || 0));
      refetch();
    }
  }, [cartitems, dispatch, refetch]);

  const handleLogout = async () => {
    dispatch(setUserLoginStatus(false));

    const sessionid = localStorage.getItem("sessionid") || null;
    console.log(sessionid);
    /*   const data = resturantData?.result?.restaurantOutlets[0];
     */
    const getResturantData = async (sessionid) => {
      console.log(sessionid);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/restaurant-data/`,
        {
          params: {
            sessionKey: sessionid,
            restaurantId: 1,
          },
        }
      );
      return response.data;
    };
    const data = await getResturantData(sessionid);
    console.log(data);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={cartitems?.cartCount === 0 ? "dotHidden" : "dot"}>
            <p>{itemcount}</p>
          </div>{" "}
        </div>
        {!isUserLogin && (
          <div className="flex gap-2">
            <button onClick={() => setIsLogin(true)}>Login</button>
            <button onClick={() => setIsSignUp(true)}>Signup</button>
          </div>
        )}

{isUserLogin && (
          <div className="flex gap-2">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}


       {isLogin && <Login setIsLogin={setIsLogin} />} 
       {isSignUp && <SignUp setIsSignUp={setIsSignUp} />} 

      </div>
    </div>
  );
};

export default Navbar;

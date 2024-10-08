import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ProductDetail from "./pages/ProductDetail";
import CategoryViewPage from "./CategoryViewPage";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/LoginPopup/LoginPopup";
import SignUp from "./components/SignUpPage/SignUpPage";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Profile/Orders";
import User from "./pages/Profile/User";
import { useQuery } from "react-query";
import axios from "axios";
import { setResturantTheme } from "./feature/resturantDataSlice";
import OrderStatus from "./pages/Profile/OrderStatus";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const props = {
    isLogin,
    setIsLogin,
    isSignUp,
    setIsSignUp,
  };


  const showLoginPage = ()=> {
    console.log("click");
    setIsLogin(true);
  }

  useEffect(() => {
    const sessionid = localStorage.getItem("sessionid");
    const id = v4();

    if (sessionid === null && isUserLogin === false) {
      localStorage.setItem("sessionid", id);
    } else if (sessionid === "") {
      console.log("user has login");
    }
  }, []);

  const getThemeData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/theme-data`,
      {
        params: {
          restaurantId: 5,
        },
      }
    );

    return response?.data?.result;
  };

  const { data, isLoading } = useQuery("theme-data", getThemeData);

  useEffect(() => {
    dispatch(setResturantTheme(data));
  }, [data]);

  return (
    <>
      {isLogin ? <LoginPopup setShowLogin={setShowLogin}  /> : <></>}
      <div className="app px-2 md:px-10">
        <Navbar setShowLogin={setShowLogin} {...props} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin}  showLoginPage={showLoginPage}/>} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/orders" element={<Orders />} />
            <Route path="/profile/orderstatus/:orderid" element={<OrderStatus />} />

            <Route index element={<User />} />
          </Route>

          <Route
            path="/product/:menuid/:productid"
            element={<ProductDetail />}
          />
          <Route path="/category/:categoryid" element={<CategoryViewPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

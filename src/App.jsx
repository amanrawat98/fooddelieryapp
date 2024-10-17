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
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Profile/Orders";
import User from "./pages/Profile/User";
import { useQuery } from "react-query";
import axios from "axios";
import { setResturantTheme } from "./feature/resturantDataSlice";
import OrderStatus from "./pages/Profile/OrderStatus";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const props = {
    isLogin,
    setIsLogin,
    isSignUp,
    setIsSignUp,
  };

  const showLoginPage = () => {
    console.log("click");
    setIsLogin(true);
  };



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
      {isLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app px-2 md:px-10">
        <Navbar setShowLogin={setShowLogin} {...props} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Cart setShowLogin={setShowLogin} showLoginPage={showLoginPage} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          >
            <Route
              path="/profile/orders"
              element={
                <ProtectedRoutes>
                  <Orders />{" "}
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile/orderstatus/:orderid"
              element={
                <ProtectedRoutes>
                  <OrderStatus />{" "}
                </ProtectedRoutes>
              }
            />

            <Route
              index
              element={
                <ProtectedRoutes>
                  <User />
                </ProtectedRoutes>
              }
            />
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

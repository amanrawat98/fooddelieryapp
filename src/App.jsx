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
import { useSelector } from "react-redux";
import Login from "./components/LoginPopup/LoginPopup";
import SignUp from "./components/SignUpPage/SignUpPage";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);

  useEffect(() => {
    const sessionid = localStorage.getItem("sessionid");
    const id = v4();
    console.log(id);

    if (sessionid === null && isUserLogin === false) {
      localStorage.setItem("sessionid", id);
    } else if (sessionid === "") {
      console.log("user has login");
    }
  }, []);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
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

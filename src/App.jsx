import React, { Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ProductDetail from "./pages/ProductDetail";
import CategoryViewPage from "./CategoryViewPage";
import { useDispatch } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Profile/Orders";
import User from "./pages/Profile/User";
import { useQuery } from "react-query";
import axios from "axios";
import { setResturantTheme } from "./feature/resturantDataSlice";
import OrderStatus from "./pages/Profile/OrderStatus";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import NotFoundPage from "./components/NotFoundPage";
import { createDynamicTheme } from "./theme";
import LayoutLoader from "./components/Loading/LayoutLoader";

const App = () => {

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [theme, setTheme] = useState(null);

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

  useEffect(() => {
    const getTheme = async () => {
      // const dynamicColors = await fetchColorsFromAPI(); 
      const dynamicTheme = createDynamicTheme({});
      console.log(dynamicTheme,"my themeeee")
      setTheme(dynamicTheme);
    };

    getTheme();
  }, []);
  if (!theme) {
    return <LayoutLoader />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar  {...props} />
            <Box sx={{
              flex: 1, overflowY: 'auto', display: "flex", flexDirection: "column"
            }}>
              <Box sx={{ px: "1rem", mb: "1rem", flex: 1 }}>
                <Suspense fallback={<CircularProgress />}>
                  <Outlet />
                </Suspense>
              </Box>
              <Footer />
            </Box>
          </Box>
        }>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Cart showLoginPage={showLoginPage} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;

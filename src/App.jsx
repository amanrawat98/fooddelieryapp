import React, { Suspense, lazy, useEffect, } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail";
import CategoryViewPage from "./CategoryViewPage";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Profile/Orders";
import User from "./pages/Profile/User";
import OrderStatus from "./pages/Profile/OrderStatus";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import { Box, ThemeProvider } from "@mui/material";
import NotFoundPage from "./components/NotFoundPage";
import LayoutLoader from "./components/Loading/LayoutLoader";
import CommonDialog from "./components/Common/CommonDialog";
import useApp from "./hooks/useApp";
import Header from "./components/Header";

const Home = lazy(() => import('./pages/Home/Home'));

const App = () => {
  const { theme, isLoading } = useApp();
 
  if (isLoading) {
    return <LayoutLoader />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CommonDialog />
      <Routes>
        <Route path="/" element={
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <Box sx={{
              flex: 1, overflowY: 'auto', display: "flex", flexDirection: "column"
            }}>
              <Box sx={{ flex: 1 }}>
                <Suspense fallback={<LayoutLoader />}>
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
              <Cart />
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
              index
              element={<User />}
            />
            <Route
              path="orders"
              element={<Orders />}
            />
            <Route
              path="orderstatus/:orderid"
              element={<OrderStatus />}
            />
          </Route>
          <Route
            path="/product/:menuid/:productid"
            element={<ProductDetail />}
          />
          <Route path="/category/:categoryId" element={<CategoryViewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;

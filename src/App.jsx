import React, { Suspense, lazy, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import LayoutLoader from "./components/Loading/LayoutLoader";
import CommonDialog from "./components/Common/CommonDialog";
import useApp from "./hooks/useApp";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./components/NotFoundPage";
import CategoryContainer from "./pages/CategoryContainer";

const Home = lazy(() => import('./pages/Home/Home'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const User = lazy(() => import('./pages/Profile/User'));
const Orders = lazy(() => import('./pages/Profile/Orders'));
const OrderStatus = lazy(() => import('./pages/Profile/OrderStatus'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CategoryViewPage = lazy(() => import('./CategoryViewPage'));

const App = () => {
  const { theme, isLoading } = useApp();

  if (isLoading) {
    return <LayoutLoader />;
  }

  
  const normalRoutes = [
    { path: "/", element: <Home /> },
    { path: "/cart", element: <Cart /> },
    { path: "/category", element: <CategoryContainer /> },
    { path: "/category/:menuCategoryId", element: <CategoryViewPage /> },
    { path: "/product/:menuCategoryId/:menuItemId", element: <ProductDetail /> },
  ];

  const protectedRoutes = [
    { path: "orders", element: <Orders /> },
    { path: "orderStatus/:orderId", element: <OrderStatus /> },
  ];

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
         
          {normalRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          
          <Route path="/profile" element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }>
            <Route index element={<User />} />
            {protectedRoutes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;

// src/routes/routes.js

import React, { lazy } from "react";


const Home = lazy(() => import("../pages/Home/Home"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const CategoryViewPage = lazy(() => import("../CategoryViewPage"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Orders = lazy(() => import("../pages/Profile/Orders"));
const User = lazy(() => import("../pages/Profile/User"));
const OrderStatus = lazy(() => import("../pages/Profile/OrderStatus"));

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/product/:menuid/:productid",
    element: <ProductDetail />,
  },
  {
    path: "/category/:categoryid",
    element: <CategoryViewPage />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

export const protectedRoutes = [
  {
    path: "/profile",
    element: <Profile />, // This will now use an outlet for nested routes
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orderstatus/:orderid",
        element: <OrderStatus />,
      },
      {
        index: true,
        element: <User />,
      },
    ],
  },
];

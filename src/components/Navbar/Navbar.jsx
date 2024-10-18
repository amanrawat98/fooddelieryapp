import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedAddress,
  setUserData,
  setUserLoginStatus,
} from "../../feature/userSlice";
import {
  setResturantData,
  setOutletData,
} from "../../feature/resturantDataSlice";
import { setCartItems } from "../../feature/CartSlice";
import SignUp from "../SignUpPage/SignUpPage";
import Login from "../LoginPopup/LoginPopup";
import { assets } from "../../assets/assets";
import userFallBackImg from "../../../src/assets/user.png";
import { getResturantData } from "../../utility/apiServices";
import useCustomToast from "../../hooks/Toast/useToast";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Avatar,
  Typography,
  Container,
  Box,
  Stack,
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Navbar = ({ isLogin, setIsLogin=()=>{}, isSignUp, setIsSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const isUserLogin = useSelector((state) => state?.user?.isUserLogin);
  const theme = useSelector((state) => state?.resturant?.resturantTheme);
  const userData = useSelector((state) => state.user.userData);
  const [menu, setMenu] = useState("home");

  const { cartCount } = cartitems || {};

  /*   console.log(cartitems);

  let cartCount;

  if(cartitems && cartitems !== undefined) {
   cartCount = cartitems.cartCount;
  }

  console.log(cartCount); */

  useEffect(() => {
    if (isLogin || isSignUp) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }

    // Clean up function to reset scroll when component unmounts or modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLogin, isSignUp]);

  // Handle Logout
  const handleLogout = async () => {
    dispatch(setUserLoginStatus(false));
    const newSessionId = uuidv4();
    localStorage.clear("sessionid");
    toast.success("User logout successfully")
    navigate("/");

    const handleGetResturantData = async () => {
      const response = await getResturantData();
      return response;
    };

    try {
      const data = await handleGetResturantData();
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

      dispatch(setUserData(null));
      dispatch(setSelectedAddress(null));

      console.log("API Response after logout:", data);
    }
     catch (error) {
      console.error(
        "Error fetching restaurant data with new session ID",
        error
      );
    }
  
  };

  const props = { isLogin, setIsLogin, isSignUp, setIsSignUp };

  return (
    <Box sx={{ backgroundColor: '#090b15', py: "10px" }}>
    <Box sx={{px:4}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <img
            src={theme?.appLogoImageUrl}
            alt="logo"
            style={{ width: '64px', borderRadius: '50%' }}
          />
        </Link>
  
        <Stack direction="row" alignItems="center" spacing={4}>
  <IconButton component={Link} to="/cart" sx={{ color: 'white' }}>
    <Badge badgeContent={cartCount} color="error">
      <ShoppingBasketIcon sx={{ color: 'white' }} />
    </Badge>
  </IconButton>
  <Stack direction="row" spacing={3}>
  {!isUserLogin ? (
    <>
      <Button
        variant="contained"
        color="warning"
        onClick={() => setIsLogin(true)}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        color="warning"
        onClick={() => setIsSignUp(true)}
      >
        Signup
      </Button>
    </>
  ) : (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Avatar
        alt="User Avatar"
        src={userData?.customerImageUrl || userFallBackImg}
        onClick={() => navigate("/profile")}
        sx={{ cursor: 'pointer', width: 36, height: 36, ml: 2 }} 
      />
    </>
  )}
</Stack>


        </Stack>
      </Toolbar>
    </Box>
  
    {isLogin && <Login {...props} />}
    {isSignUp && <SignUp setIsSignUp={setIsSignUp} />}
  </Box>
  
  );
};

export default Navbar;

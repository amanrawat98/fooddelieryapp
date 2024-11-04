import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../slices/userSlice";
import SignUp from "../SignUpPage/SignUpPage";
import Login from "../Login";
import userFallBackImg from "../../../src/assets/user.png";
import useCustomToast from "../../hooks/Toast/useToast";
import { Toolbar, IconButton, Badge, Button, Avatar, Box, Stack, } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSession } from "../../hooks/useSession";
import { openDialog } from "../../slices/dialogSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const { isUserLogin, userData } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.themeData);
  const { cartCount } = cartItems || {};
  const { clearSession } = useSession()
  const handleLogout = async () => {
    dispatch(resetUserState());
    clearSession();
    navigate("/");
    toast.success("User logout successfully")
  }
  const handleLoginSignUp = (type) => {
    const dialogComponent = {
      login: { content: <Login />, title: "Login" },
      signup: { content: <SignUp />, title: "Sign Up" }
    }
    dispatch(openDialog({ ...dialogComponent?.[type] }))
  }

  return (
    <Box sx={{ backgroundColor: "primary.dark", py: "10px" }}>
      <Box sx={{ px: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/">
            <img
              src={theme?.appLogoImageUrl}
              alt="logo"
              style={{ width: '64px', borderRadius: '50%' }}
            />
          </Link>

          <Stack direction="row" alignItems="center" spacing={4}>
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={cartCount || "0"} color="error">
                <ShoppingBasketIcon sx={{ color: 'primary.light' }} />
              </Badge>
            </IconButton>
            <Stack direction="row" spacing={3}>
              {!isUserLogin ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => handleLoginSignUp("login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleLoginSignUp("signup")}
                  >
                    Sign up
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
    </Box>

  );
};

export default Header;

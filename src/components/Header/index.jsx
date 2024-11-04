import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../slices/userSlice";
import SignUp from "../SignUpPage/SignUpPage";
import Login from "../Login";
import userFallBackImg from "../../../src/assets/user.png";
import useCustomToast from "../../hooks/Toast/useToast";
import { Toolbar, IconButton, Badge, Button, Avatar, Box, Stack, Drawer, } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSession } from "../../hooks/useSession";
import { openDialog } from "../../slices/dialogSlice";
import Cart from "../../pages/Cart/Cart";
import { Close } from "@mui/icons-material";
import ProfileMenu from "../ProfileMenu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };
  return (
    <Box sx={{ backgroundColor: "primary.dark", py: "10px" }}>
      <ProfileMenu {...{ anchorEl, handleClose, handleLogout }} />
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
            <IconButton onClick={toggleDrawer(true)} >
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
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button> */}
                  <Avatar
                    alt="User Avatar"
                    src={userData?.customerImageUrl}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ cursor: 'pointer', width: 36, height: 36, ml: 2 }}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Box>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "primary.light",

          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
          <IconButton onClick={toggleDrawer(false)} aria-label="close"
            sx={{ background: "none", color: "secondary.main", padding: 0 }}>
            <Close />
          </IconButton>
        </Box>
        <Cart toggleDrawer={toggleDrawer} />
      </Drawer>
    </Box>

  );
};

export default Header;

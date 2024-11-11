import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../slices/userSlice";
import SignUp from "../SignUpPage/SignUpPage";
import Login from "../Login";
import useCustomToast from "../../hooks/Toast/useToast";
import { Toolbar, IconButton, Badge, Button, Avatar, Box, Stack, Drawer, } from '@mui/material';
import { useSession } from "../../hooks/useSession";
import { openDialog } from "../../slices/dialogSlice";
import Cart from "../../pages/Cart/Cart";
import { Close, ShoppingCart } from "@mui/icons-material";
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
      signUp: { content: <SignUp />, title: "Sign Up" }
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
        <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
          <Link to="/">
            <img
              src={theme?.appLogoImageUrl}
              alt="logo"
              style={{ width: '64px', borderRadius: '50%' }}
            />
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, sm: 2, md: 4 }} // Responsive spacing based on screen size
            sx={{ width: '100%', justifyContent: { xs: 'space-between', sm: 'flex-end' } }}
          >
            <IconButton onClick={toggleDrawer(true)} sx={{ p: { xs: 0.5, sm: 1 } }}>
              <Badge badgeContent={cartCount || "0"} color="error">
                <ShoppingCart sx={{ color: 'primary.light', fontSize: { xs: 20, sm: 24, md: 28 } }} />
              </Badge>
            </IconButton>
            <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
              {!isUserLogin ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => handleLoginSignUp("login")}
                    sx={{ minWidth: { xs: 60, sm: 80 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleLoginSignUp("signUp")}
                    sx={{ minWidth: { xs: 60, sm: 80 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <Avatar
                  alt="User Avatar"
                  src={userData?.customerImageUrl}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    cursor: 'pointer',
                    width: { xs: 28, sm: 36 },
                    height: { xs: 28, sm: 36 },
                    ml: { xs: 1, sm: 2 },
                  }}
                />
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
            minWidth: "30%"
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

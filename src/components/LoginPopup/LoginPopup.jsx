import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserLoginStatus } from "../../feature/userSlice";
import { setOutletData, setResturantData } from "../../feature/resturantDataSlice";
import { setCartItems } from "../../feature/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowAndHidePassword from "../ShowAndHidePassword";
import { emailRegex, phoneRegex } from "../../constaints/constaints";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import useCustomToast from "../../hooks/Toast/useToast";
import { inputStyles } from "../../theme/utils";

const Login = ({ setIsLogin = () => {} }) => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const resturantdata = useSelector((state) => state?.resturant?.resturantdata);

  let restaurantId;
  if (resturantdata?.result?.restaurantId) {
    restaurantId = resturantdata?.result?.restaurantId;
  }

  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const { register, handleSubmit, setValue,getValues, formState: { errors } } = useForm({
    mode: 'onBlur', 
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      comformPassword: '', 
    },
  });

  const handleUserLogin = async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login`,
      payload
    );
    return response.data;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      ...(data.email ? { email: data.email } : { phone: data.phone }),
      password: data.password,
      loginMethod: data.email ? "email" : "phone",
      role: "customer",
      outletId: cartItems?.outletId || null,
      temporaryCartId: cartItems?.cartId || null,
    };

    try {
      const resturantdata = await handleUserLogin(payload);
      const { result, customerCart, restaurantData } = resturantdata || {};
      const { restaurantOutlets } = restaurantData || {};

      if (resturantdata && restaurantOutlets) {
        dispatch(setResturantData(resturantdata));
        dispatch(setOutletData(restaurantOutlets[0]));
        dispatch(setCartItems(customerCart));
      }
      if (resturantdata.detail) {
        dispatch(setUserLoginStatus(true));
        toast.success(<span>Login successfully</span>);
      } 

      dispatch(setUserData(result));
      localStorage.clear("sessionid");
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      toast.error(<span>Something went wrong </span>);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (data) => {
    setOtpLoading(true);

    const payload = {
      email: data.email,
      restaurantId: restaurantId,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/forgot-password`,
        payload
      );

      const { result } = response?.data;

      if (result) {
        setPage("resetPassword");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  };

 

  return (
    <Dialog open={true} onClose={() => setIsLogin(false)} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {page === "login" ? "Login" : page === "forgotPassword" ? "Forgot Password" : "Reset Password"}
          <IconButton edge="end" color="inherit" onClick={() => setIsLogin(false)}>
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: "2rem" }}>
        {page === "login" && (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              placeholder="Your email or Phone no"
           
              fullWidth
              variant="outlined"
              {...register("email", {
                required: "Email or phone number is required",
                pattern: {
                  value: emailRegex,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              sx={inputStyles}
            />
            <TextField
              type="password"
              placeholder="Password"
          
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              fullWidth
              variant="outlined"
              sx={inputStyles}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#ff6347",
                "&:hover": { backgroundColor: "#e5533d" },
                mb: 2,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#ff6347", color: "#ff6347", mb: 2 }}
              onClick={() => setIsLogin(false)}
            >
              Cancel
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ cursor: "pointer", color: "#676767" }}
              onClick={() => setPage("forgotPassword")}
            >
              Forgot Your password?
            </Typography>
          </form>
        )}

        {page === "forgotPassword" && (
          <form className="space-y-4" onSubmit={handleSubmit(handleSendOtp)}>
            <TextField
              type="text"
              placeholder="Your email or Phone no"
         
              fullWidth
              variant="outlined"
              {...register("email", {
                required: "Email or phone number is required",
                pattern: {
                  value: emailRegex,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              sx={inputStyles}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={otpLoading}
              sx={{
                backgroundColor: "#ff6347",
                "&:hover": { backgroundColor: "#e5533d" },
                mb: 2,
              }}
            >
              {otpLoading ? <CircularProgress size={24} color="inherit" /> : "Get OTP"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#ff6347", color: "#ff6347", mb: 2 }}
              onClick={() => setIsLogin(false)}
            >
              Cancel
            </Button>
          </form>
        )}

        {page === "resetPassword" && (
          <form className="space-y-4" onSubmit={handleSubmit(handleSendOtp)}>
            <TextField
              type="text"
              placeholder="OTP"
              name="otp"
             
              fullWidth
              variant="outlined"
              {...register("otp", {
                required: "OTP is required",
              })}
              error={!!errors.otp}
              helperText={errors.otp ? errors.otp.message : ''}
              sx={inputStyles}
            />
            <TextField
              type="password"
              placeholder="New Password"
              name="password"
           
              fullWidth
              variant="outlined"
              {...register("password", {
                required: "New password is required",
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              sx={inputStyles}
            />
            <TextField
              type="password"
              placeholder="Confirm Password"
              name="comformPassword"
            
              fullWidth
              variant="outlined"
              {...register("comformPassword", {
                required: "Confirm password is required",
                validate: value => value === getValues("password") || "Passwords do not match",
              })}
              error={!!errors.comformPassword}
              helperText={errors.comformPassword ? errors.comformPassword.message : ''}
              sx={inputStyles}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#ff6347",
                "&:hover": { backgroundColor: "#e5533d" },
                mb: 2,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#ff6347", color: "#ff6347", mb: 2 }}
              onClick={() => setIsLogin(false)}
            >
              Cancel
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Login;

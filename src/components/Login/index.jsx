import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserLoginStatus } from "../../slices/userSlice";
import { setOutletData, setRestaurantData } from "../../slices/restaurantDataSlice";
import { setCartItems } from "../../slices/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../../constants";
import { TextField, Button, Typography, CircularProgress, } from "@mui/material";
import { useForm } from "react-hook-form";
import useCustomToast from "../../hooks/Toast/useToast";
import { inputStyles } from "../../theme/utils";
import { closeDialog } from "../../slices/dialogSlice";
import { useSession } from "../../hooks/useSession";
import { handleUserLogin } from "../../utility/apiServices";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const outletState = useSelector((state) => state.outlet);
  const resturantData = useSelector((state) => state?.restaurant?.resturantdata);
  const { clearSession, } = useSession()
  let restaurantId;
  if (resturantData?.result?.restaurantId) {
    restaurantId = resturantData?.result?.restaurantId;
  }

  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      comformPassword: '',
    },
  });

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
        dispatch(setRestaurantData(resturantdata));
        dispatch(setOutletData(restaurantOutlets[outletState?.selectedOutlet || 0]));
        dispatch(setCartItems(customerCart));
      }
      if (resturantdata.detail) {
        dispatch(setUserLoginStatus(true));
        toast.success(<span>Login successfully</span>);
      }

      dispatch(setUserData(result));
      clearSession()
      handleCloseDialog()
      navigate("/");
    } catch (error) {
      toast.error(<span>Something went wrong </span>);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseDialog = () => {
    dispatch(closeDialog())
  }
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
      toast.error(<div>{error?.response?.data?.detail || "Something went wrong"}</div>)
    } finally {
      setOtpLoading(false);
    }
  };



  return (
    <>
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
            onClick={handleCloseDialog}
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
            onClick={handleCloseDialog}
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
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
        </form>
      )}
    </>
  );
};

export default Login;

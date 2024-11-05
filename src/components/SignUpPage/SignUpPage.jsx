import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, CircularProgress, Typography, } from "@mui/material";

import { emailRegex, phoneRegex } from "../../constants";
import useCustomToast from "../../hooks/Toast/useToast";
import { closeDialog, openDialog } from "../../slices/dialogSlice";
import Login from "../Login";

const SignUp = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const restaurantData = useSelector((state) => state.restaurant.restaurantData);
  const toast = useCustomToast();
  let restaurantId;
  let cartId;

  if (cartItems?.cartId) {
    cartId = cartItems?.cartId;
  }

  if (restaurantData?.result?.restaurantId) {
    restaurantId = restaurantData?.result?.restaurantId;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", password: "", phone: "", },
    mode: "onBlur",
  });

  const initialSignUpData = {
    restaurantId: restaurantId,
    outletId: cartItems?.outletId,
    temporaryCartId: cartId,
    role: "customer",
  };

  const handleUserSignUp = async (payload) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error(<div>Some thing went wrong form our side</div>)
    }
    finally {
      setLoading(false)
    }
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };
  const onSubmit = async (data) => {
    const signUpDetails = { ...initialSignUpData, ...data };
    await handleUserSignUp(signUpDetails);
    handleClose()
  };


  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '4px',
      },
      '& input': {
        padding: '10px 14px',
        height: 'auto',
        fontSize: '16px',
      },
    },
    mb: 2,
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          placeholder="First name"
          {...register("firstName", { required: "First name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ""}
          fullWidth
          variant="outlined"
          sx={inputStyles}
        />
        <TextField
          type="text"
          placeholder="Last name"
          {...register("lastName", { required: "Last name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
          fullWidth
          variant="outlined"
          sx={inputStyles}
        />
        <TextField
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailRegex,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          fullWidth
          variant="outlined"
          sx={inputStyles}
        />
        <TextField
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          fullWidth
          variant="outlined"
          sx={inputStyles}
        />
        <TextField
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: phoneRegex,
              message: "Invalid phone number",
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone ? errors.phone.message : ""}
          fullWidth
          variant="outlined"
          sx={inputStyles}
        />
        <Typography
          variant="body2"
          align="center"
          sx={{ cursor: "pointer", color: "#676767" }}
          onClick={() =>dispatch(openDialog({ content: <Login />, title: "Login" }))
        }
        >
          Already have an account? <span style={{color:"var(--primary)"}}>Log in</span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            my: 2
          }}
        >
          <Button
            type="button"
            variant="outlined"
            sx={{
              borderColor: "#ff6347",
              color: "#ff6347",
              width: "45%",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#ff6347",
              "&:hover": { backgroundColor: "#e5533d" },
              width: "45%",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>

      </form>
    </>
  );
};

export default SignUp;

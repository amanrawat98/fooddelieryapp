import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, CircularProgress, Typography, } from "@mui/material";

import { emailRegex, phoneRegex } from "../../constants";
import useCustomToast from "../../hooks/Toast/useToast";
import { closeDialog, openDialog } from "../../slices/dialogSlice";
import Login from "../Login";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const dispatch = useDispatch()
  const {signUpMutation} = useAuth();
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

  

  const handleClose = () => {
    dispatch(closeDialog());
  };
  const onSubmit = async (data) => {
    const signUpDetails = { ...initialSignUpData, ...data };
     signUpMutation.mutate(signUpDetails);
   
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
          sx={{ mb: 2 }}
        />
        <TextField
          type="text"
          placeholder="Last name"
          {...register("lastName", { required: "Last name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }} />
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
          sx={{ mb: 2 }} />
        <TextField
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }} />
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
          sx={{ mb: 2 }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ cursor: "pointer", color: "secondary.main" }}
          onClick={() => dispatch(openDialog({ content: <Login />, title: "Login" }))
          }
        >
          Already have an account? <Box component={"span"} sx={{ color: "primary.main" }}>Log in</Box>
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
            disabled={signUpMutation?.isLoading}
            sx={{

              width: "45%",
            }}
          >
            {signUpMutation?.isLoading ? (
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

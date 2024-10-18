import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { emailRegex, phoneRegex } from "../../constaints/constaints";
import useCustomToast from "../../hooks/Toast/useToast";

const SignUp = ({ setIsSignUp }) => {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const resturantdata = useSelector((state) => state.resturant.resturantdata);
  const toast = useCustomToast();
  let restaurantId;
  let cartId;

  if (cartItems?.cartId) {
    cartId = cartItems?.cartId;
  }

  if (resturantdata?.result?.restaurantId) {
    restaurantId = resturantdata?.result?.restaurantId;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
    mode: "onBlur",
  });

  const [signUpData, setSignUpData] = useState({
    resturantId: restaurantId,
    outletId: cartItems?.outletId || null,
    temporaryCartId: cartId,
    role: "customer",
  });

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
    finally{
      setLoading(false)
    }
  };


  const onSubmit = async (data) => {
    const signUpDetails = { ...signUpData, ...data };
    await handleUserSignUp(signUpDetails);
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
    <Dialog
      open={true}
      onClose={() => setIsSignUp(false)}
      aria-labelledby="sign-up-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="sign-up-dialog-title">
        <Typography variant="h6" align="center" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Sign Up
          <IconButton edge="end" color="inherit" onClick={() => setIsSignUp(false)}>
            <CloseIcon />
          </IconButton>
        </Typography>

      </DialogTitle>
      <DialogContent>
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
     <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", 
    gap: 2, 
    my:2
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
    onClick={() => setIsSignUp(false)}
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
      </DialogContent>

    </Dialog>
  );
};

export default SignUp;

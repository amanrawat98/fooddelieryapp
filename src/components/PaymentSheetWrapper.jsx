import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../feature/CartSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useCustomToast from "../hooks/Toast/useToast";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHER_KEY);

const Checkout = ({ clientSecret, deliveryType, cartId, setClientSecret }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userdata = useSelector((state) => state.user.selectedAddress);
  
  const { customerId, outletId, cartItems: items } = cartItems;
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
 

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe not initialized");
      return;
    }
    setIsLoading(true);
    const returnUrl = "http://localhost:5173/cart"; 

    const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: "if_required",
    });

    if (paymentError) {
      toast.error(<span>{paymentError.message}</span>);
     
    } else {
      console.log(paymentIntent.status);

      let payload;
      if (deliveryType === "takeaway") {
        payload = {
          cartId: cartId,
          orderType: deliveryType,
          paymentIntentId: paymentIntent?.id,
          currency: "cad",
        };
      } else {
        payload = {
          cartId: cartId,
          orderType: deliveryType,
          paymentIntentId: paymentIntent?.id,
          currency: "cad",
          deliveryAddressId: userdata?.addressId,
        };
      }

      try {
        const paymentIntentResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart/checkout/`,
          payload
        );

        console.log("paymentIntentResponse", paymentIntentResponse);

        if (paymentIntentResponse.status === 201) {
          const { orderMenuItems } = paymentIntentResponse?.data?.result || {};
          console.log(orderMenuItems);

          toast.success("Payment successful! Thank you for your order.");

          for (let item of items) {
            await axios.delete(
              `${import.meta.env.VITE_BASE_URL}/cart/`,
              {
                data: {
                  cartId: cartItems?.cartId,
                  cartItemId: item.cartItemId,
                },
              }
            );
          }
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/cart/`,
          {
            params: {
              customerId,
              outletId,
            },
          }
        );

        console.log(response?.data?.result);
        const data = response?.data?.result;
        dispatch(setCartItems(data));
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while processing your payment. Please try again.");
      }

      setClientSecret("");
    }

    setIsLoading(false);
  };

  return (
    <Dialog 
    open={!!clientSecret}
    onClose={() => setClientSecret("")}
    maxWidth="md"
    fullWidth
    PaperProps={{
      sx: {
        width: { xs: '90%', sm: '80%', md: '600px' }, 
        maxWidth: '100%', 
      },
    }}
    >
      <DialogTitle>
        Checkout
        <IconButton
          aria-label="close"
          onClick={() => setClientSecret("")}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
       
        <Box sx={{ width: "100%" }}>
          <PaymentElement />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!stripe || isLoading}
          onClick={handlePayment}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PaymentSheetWrapper = ({ clientSecret, deliveryType, cartId, setClientSecret }) => {
  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Checkout clientSecret={clientSecret} deliveryType={deliveryType} cartId={cartId} setClientSecret={setClientSecret} />
    </Elements>
  );
};

export default PaymentSheetWrapper;

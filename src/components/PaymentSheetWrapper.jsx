import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../feature/CartSlice";

// Load your publishable key from Stripe dashboard
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHER_KEY);

const Checkout = ({ clientSecret, deliveryType, cartId, setClientSecret }) => {
  console.log("Client Secret: ", clientSecret);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userdata = useSelector((state) => state.user.selectedAddress);

  const { customerId, outletId, cartItems: items } = cartItems;
  const dispatch = useDispatch();

  console.log("cartitems", cartItems);

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setMessage("Stripe not initialized");

      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // If you want to allow a redirect in case it's required, you can include return_url here
        // return_url: "http://localhost:5173/cart",
      },
      redirect: "if_required", // This allows for redirection only if necessary
    });

    if (error) {
      console.log("Payment failed:", error.message);
      setClientSecret("");

      // Handle error here (display error message to user)
    } else {
      console.log(paymentIntent.status); // Check status

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

          console.log(cartItems?.cartId);
          for (let item of items) {
            console.log(item);
            const response = await axios.delete(
              `${import.meta.env.VITE_BASE_URL}/cart/`,
              {
                data: {
                  cartId: cartItems?.cartId,
                  cartItemId: item.cartItemId,
                },
              }
            );

            console.log(response);
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
      }

      setClientSecret("");
      // Handle success here
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-fit h-80 ">
      <ImCross
        className="mb-2 cursor-pointer ml-auto"
        onClick={() => {
          setClientSecret("");
          console.log("cc");
        }}
      />

      <PaymentElement />
      <button
        disabled={!stripe || isLoading}
        onClick={handlePayment}
        className="bg-orange-500 px-6 py-3 text-white rounded-md mt-5 "
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

const PaymentSheetWrapper = ({
  clientSecret,
  deliveryType,
  cartId,
  paymentIntentId,
  setClientSecret,
}) => {
  const options = {
    clientSecret,
    appearance: {
      theme: "stripe", // Can be 'night', 'flat', 'stripe', or custom styles
    },
  };

  const props = {
    deliveryType,
    cartId,
    paymentIntentId,
    setClientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Checkout clientSecret={clientSecret} {...props} />
    </Elements>
  );
};

export default PaymentSheetWrapper;


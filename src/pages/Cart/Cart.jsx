import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaymentSheetWrapper from "../../components/PaymentSheetWrapper";
import { handleCreateIntentId } from "../../utility/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOrSelectAddress from "../../components/Address.jsx/AddOrSelectAddress";
import CartItem from "../../components/Cart/CartItem";
import { Box, Button, Container, Divider, FormControlLabel, Paper, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import GoBackButton from "../../components/Common/Buttons/GoBackButton";
import { openDialog } from "../../slices/dialogSlice";
import Login from "../../components/Login";
import AddressContainer from "./AddressContainer";
import CartItems from "./CartItems";
import useLocationSearch from "../../components/mapApi.jsx/useLocationSearch";

export const deliveryFee = 2;

const Cart = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const { userData, isUserLogin } = useSelector((state) => state?.user);
  const address = userData?.addresses || [];
  const { isAddressInRange } = useLocationSearch()
  const [selectedAddress, setSelectedAddress] = useState({ ...address?.[0] });
  const [deliveryType, setDeliveryType] = useState("takeaway");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const outletId = cartitems?.outletId || null;
  const { cartItems, cartId } = cartitems || {};

  const handleNotLogin = () => {
    dispatch(openDialog({ content: <Login />, title: "Login" }))
    // navigate("/");
  };

  const handleCreatePaymentIntent = async (payload) => {
    try {
      const response = await handleCreateIntentId(payload);
      return response;
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!cartItems?.length) {
        return toast.error("No Item in Cart!");
      }

      if (!isUserLogin) {
        handleNotLogin();
        return;
      }
      const defaultAddress = address?.find(address => address?.isDefault);
      const formedAddress = `${defaultAddress.landmark}, ${defaultAddress.areaLocality}`
      const isAddressInOutletArea = await isAddressInRange(formedAddress)
        if(!isAddressInOutletArea){
          toast.error(<span>We cannot process your order in this area at the moment. Please try a different location.</span>);
          return
        }
      const payload = { outletId, cartId };
      const { clientSecret, paymentIntentId } = await handleCreatePaymentIntent(payload);
      setClientSecret(clientSecret);
      setPaymentIntentId(paymentIntentId);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const handleAddAddress = () => {
    if (!isUserLogin) {
      handleNotLogin();
      return;
    }
    const dialogContent = {
      content: <AddOrSelectAddress />,
      title: "Select Address"
    }
    dispatch(openDialog(dialogContent))

  };

  useEffect(() => {
    const defaultAddress = address.find((item) => item?.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [address]);


  return (
    <>
      {/* <GoBackButton /> */}
      <Box sx={{ position: 'relative', p: 3 }}>
        <ToastContainer position="top-center" />
        <CartItems   {...{ cartitems, cartId, cartItems }} />


        <Box sx={{ mt: 3, px: 2 }}>
          <RadioGroup
            row
            onChange={(e) => setDeliveryType(e.target.value)}
            defaultValue="takeaway"
          >
            <FormControlLabel
              value="takeaway"
              control={<Radio />}
              label={<Typography sx={{ fontWeight: 'bold', color: '#4f4f4f' }}>Takeaway</Typography>}
            />
            <FormControlLabel
              value="delivery"
              control={<Radio />}
              label={<Typography sx={{ fontWeight: 'bold', color: '#4f4f4f' }}>Delivery</Typography>}
            />
          </RadioGroup>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            gap={2} // adds spacing between items
          >
            <Button
              variant="contained"
              onClick={handleCheckout}
              disabled={!cartItems?.length}
              sx={{
                width: { xs: '100%', md: 'auto' }, // full width on mobile, auto on desktop
                mb: { xs: 2, md: 0 }, // margin-bottom for mobile view
              }}
            >
              Checkout
            </Button>


          </Box>
        </Box>
        {deliveryType === "delivery" && (
          <AddressContainer {...{ selectedAddress, handleAddAddress }} />
        )}

        {clientSecret && (
          <PaymentSheetWrapper {...{
            deliveryType,
            cartId,
            paymentIntentId,
            setClientSecret,
            clientSecret
          }} />
        )}

      </Box>
    </>
  );
};

export default Cart;

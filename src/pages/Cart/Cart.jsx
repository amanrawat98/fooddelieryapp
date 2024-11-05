import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaymentSheetWrapper from "../../components/PaymentSheetWrapper";
import { CiLocationOn } from "react-icons/ci";
import { handleCreateIntentId } from "../../utility/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOrSelectAddress from "../../components/Address.jsx/AddOrSelectAddress";
import CartItem from "../../components/Cart/CartItem";
import { Box, Button, Container, Divider, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import GoBackButton from "../../components/Common/Buttons/GoBackButton";
import { openDialog } from "../../slices/dialogSlice";
import Login from "../../components/Login";
import { Edit } from "@mui/icons-material";

export const deliveryFee = 2;

const Cart = ({toggleDrawer}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const {userData,isUserLogin} = useSelector((state) => state?.user);
  const address = userData?.addresses || [];

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
      content: <AddOrSelectAddress {...{
        selectedAddressId: selectedAddress?.addressId,
      }} />
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

        <Box sx={{ mb: 3 }}>
      
          {!cartItems?.length ? (
            <Container maxWidth="md" sx={{ marginTop: "2rem", textAlign: 'center' }}>
              <Paper elevation={2} sx={{ padding: '1rem', borderRadius: '1rem' }}>
                <Box fontSize={"1.25rem"} color={"primary.main"}>
                  No Items in cart
                </Box>
              </Paper>
            </Container>
          ) : (
            cartItems?.map((item, idx) => (
              <CartItem key={item.id + "cart_id" + idx} item={item} cartId={cartId} />
            ))
          )}
        </Box>

        <Box sx={{ mt: 3, color:"secondary.main" }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Box fontSize={"1.25rem"}>Subtotal</Box>
              <Typography variant="body1">${cartitems?.cartSubTotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Box fontSize={"1.25rem"}>Delivery Fee</Box>
              <Typography>${cartitems?.cartTax}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Box fontSize={"1.25rem"}>Total</Box>
              <Typography>${cartitems?.cartTotal}</Typography>
            </Box>
          </Box>
        </Box>
        {deliveryType === "delivery" && (
            <Box  sx={{ marginTop: "2rem", textAlign: 'center' }}>
              <Paper elevation={2} sx={{ padding: '1rem', borderRadius: '1rem' }}>
                  <Box display="flex" justifyContent="space-between" sx={{color: 'primary.main'}}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                      Delivery Address
                    </Typography>
                    <Tooltip title="Edit address" placement="top" arrow>
                      <Edit onClick={handleAddAddress}/>
                      </Tooltip>
                  </Box>
                  {address?.length ? (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CiLocationOn size={24}/>
                        <Typography sx={{  fontSize: '1rem' }}>
                          {`${selectedAddress?.floor} ${selectedAddress?.houseNo}, ${selectedAddress?.building}, ${selectedAddress?.areaLocality}`}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1" sx={{  mb: 2 }}>
                      No address available. Add a New One...
                    </Typography>
                  )}
                </Paper>
              </Box>

            )}
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

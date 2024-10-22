import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaymentSheetWrapper from "../../components/PaymentSheetWrapper";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { handleCreateIntentId } from "../../utility/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOrSelectAddress from "../../components/Address.jsx/AddOrSelectAddress";
import CartItem from "../../components/Cart/CartItem";
import { Box, Button, Container, Divider, FormControlLabel, IconButton, Paper, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material";
import GoBackButton from "../../components/Common/Buttons/GoBackButton";

export const deliveryFee = 2;

const Cart = ({ showLoginPage = () => { } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const userData = useSelector((state) => state?.user?.userData);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  
  const [selectedAddress, setSelectedAddress] = useState({});
  const [deliveryType, setDeliveryType] = useState("takeaway");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [isAddressDialog, setIsAddressDialog] = useState(false);
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;
  const { cartItems, cartId } = cartitems || {};
  const address = userData?.addresses || [];
  
  const handleNotLogin = () => {
    showLoginPage();
    navigate("/");
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
  
  useEffect(() => {
    document.body.style.overflow = isAddressDialog ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddressDialog]);
  const handleCancelAddressDialog=()=>{
    setIsAddressDialog((prev) => !prev);
  }
  const handleAddAddress = () => {
    if (!isUserLogin) {
      handleNotLogin();
      return;
    }
    handleCancelAddressDialog()
  };
  
  useEffect(() => {
    const defaultAddress = address.find((item) => item?.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [address]);
  

  return (
    <>
      <GoBackButton />
      <Box sx={{ position: 'relative', p: 3 }}>
        <ToastContainer position="top-center" />

        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              mb: 2,
            }}
          >
            {["Title", "Price", "Quantity", "Total", "Remove"].map((item, index) => (
              <Typography
                key={index}
                sx={{
                  gridColumn: item === "Title" ? "span 2" : "span 1",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {!cartItems?.length ? (
            <Container maxWidth="md" sx={{ marginTop: "2rem", textAlign: 'center' }}>
              <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '1rem' }}>
                <Typography variant="h6" component="h6" color={"var(--primary)"}>
                  No Items in cart
                </Typography>
              </Paper>
            </Container>
          ) : (
            cartItems?.map((item, idx) => (
              <CartItem key={item.id + "cart_id" + idx} item={item} cartId={cartId} />
            ))
          )}
        </Box>

        <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h6">Cart Total</Typography>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>${cartitems?.cartSubTotal}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography>Delivery Fee</Typography>
              <Typography>${cartitems?.cartTax}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="h6">Total</Typography>
              <Typography>${cartitems?.cartTotal}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography>If you have a promo code, enter it here</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField
              type="text"
              placeholder="Enter promo code"
              variant="outlined"
            />
            <Button variant="contained" >Submit</Button>
          </Box>
        </Box>
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

            {deliveryType === "delivery" && (
             <Box sx={{ flex: 1, width: '100%' }}>
             <Box
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 backgroundColor: '#fff8e1',
                 border: address?.length ? '2px solid #ffb74d' : '2px solid #ff6f61',
                 borderRadius: '12px',
                 p: 3,
                 boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                 width: address?.length ? '80%' : 'max-content', 
                 my: 2,
               }}
             >
               <Box display="flex" justifyContent="space-between">
                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ff6f61' }}>
                   Delivery Address
                 </Typography>
                 <IconButton onClick={handleAddAddress}>
                   <MdEdit size={24} />
                 </IconButton>
               </Box>
               {address?.length ? (
                 <>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                     <CiLocationOn size={24} color="#ff6f61" />
                     <Typography sx={{ color: '#4f4f4f', fontSize: '1rem' }}>
                       {`${selectedAddress?.floor} ${selectedAddress?.houseNo}, ${selectedAddress?.building}, ${selectedAddress?.areaLocality}`}
                     </Typography>
                   </Box>
                 </>
               ) : (
                 <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
                   No address available. Add a New One...
                 </Typography>
               )}
             </Box>
           </Box>
           
            )}
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

        {isAddressDialog && isUserLogin ? <AddOrSelectAddress {...{
          handleCancelAddressDialog,
          isAddressDialog,
          selectedAddressId:selectedAddress?.addressId,
          address,
        }} /> : null}
      </Box>
    </>
  );
};

export default Cart;

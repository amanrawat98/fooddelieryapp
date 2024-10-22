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
  const [selectedAddress, setSelectedAddress] = useState({});
  const [deliveryType, setDeliveryType] = useState("takeaway");

  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [isSelectPassword, setIsSelectPassword] = useState(false);

  const sessionid = localStorage.getItem("sessionid");
  // Use customerId and outletId from the userdata and cartitems if available
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;
  const { cartItems, cartId } = cartitems || {};

  let address;
  if (userData?.addresses) {
    address = userData?.addresses;
  }

  let floor, houseNo, building, areaLocality;

  if (address & address?.[0]) {
    let addr = address?.[0];
    floor = addr;
    houseNo = addr;
    building = addr;
    areaLocality = addr;
  }

  const props = {
    deliveryType,
    cartId,
    paymentIntentId,
    setClientSecret,
  };

  const handleCheckout = async () => {
    try {
      if (cartitems.cartItems.length <= 0) {
        return toast.error("No Item in Cart !");
      }
      const payload = {
        outletId: outletId,
        cartId: cartId,
      };
      const handleCreatePaymentIntent = async () => {
        const response = await handleCreateIntentId(payload);
        return response;
      };

      if (!sessionid) {
        showLoginPage();
        navigate("/");
      }

      if (deliveryType === "takeaway" || deliveryType !== "takeaway") {
        const { clientSecret, paymentIntentId } =
          await handleCreatePaymentIntent();

        setClientSecret(clientSecret);
        setPaymentIntentId(paymentIntentId);
        // const response = await axios.post(
        //   `${import.meta.env.VITE_BASE_URL}/create-payment-intent/`,
        //   {
        //     outletId: outletId,
        //     cartId: cartId,
        //   }
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSelectPassword) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSelectPassword]);

  // AddorSelectAddress component props

  const AddorSelectAddressProps = {
    setIsSelectPassword,
    isSelectPassword,
    address,
  };

  useEffect(() => {
    console.log(address);

    const seltectedAddress = address?.find((item) => {
      return item.isDefault === true;
    });

    console.log(seltectedAddress);
    setSelectedAddress(seltectedAddress);
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
        <RadioGroup
          row
          sx={{ mt: 3, gap: 2 }}
          onChange={(e) => setDeliveryType(e.target.value)}
          defaultValue="takeaway"
        >
          <FormControlLabel
            value="takeaway"
            control={<Radio />}
            label="Takeaway"
          />
          <FormControlLabel
            value="delivery"
            control={<Radio />}
            label="Delivery"
          />
        </RadioGroup>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          {address ? (
            deliveryType === "delivery" && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  my: 2,
                  border: '2px solid orange',
                  borderRadius: '8px',
                  p: 2,
                  width: 'fit-content',
                }}
              >
                <Typography variant="h6">Delivery Address</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CiLocationOn />
                  <Typography>
                    {`${selectedAddress?.floor} ${selectedAddress?.houseNo} ${selectedAddress?.building} ${selectedAddress?.areaLocality}`}
                  </Typography>
                  <MdEdit onClick={() => setIsSelectPassword((prev) => !prev)} />
                </Box>
              </Box>
            )
          ) : (
            deliveryType === "delivery" && (
              <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                my: 2,
                border: '2px solid var(--primary)',
                borderRadius: '12px',
                p: 3,
                width: "40%",
                mx: 'auto',
                backgroundColor: 'rgba(240, 240, 240, 0.8)', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Delivery Address
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                No address available, Add a New One...
              </Typography>
              <Tooltip title="Edit Address" arrow>
                <Box>
                <IconButton 
                  onClick={() => setIsSelectPassword((prev) => !prev)} 
                  
                >
                  <MdEdit size={24} /> 
                </IconButton>
                </Box>
              </Tooltip>
            </Box>
              
            )
          )}
        </Box>

        <Button
          variant="contained"
          onClick={handleCheckout}
          disabled={!cartItems?.length}
        >
          Checkout
        </Button>

        {clientSecret && (
          <Box
            sx={{
              position: 'absolute',
              width: 'fit-content',
              height: 'fit-content',
              backgroundColor: '#f0f0f0',
              p: 2,
              borderRadius: '8px',
              mx: 'auto',
              mt: 2,
            }}
          >
            <PaymentSheetWrapper clientSecret={clientSecret} {...props} />
          </Box>
        )}

        {isSelectPassword && <AddOrSelectAddress {...AddorSelectAddressProps} />}
      </Box>
    </>
  );
};

export default Cart;

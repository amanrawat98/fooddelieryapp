import React, { useCallback } from "react";
import { assets } from "../../assets/assets";
import {
  deleteCartItem,
  getCartItems,
  getResturantData,
  handleAddToCart,
} from "../../utility/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../feature/CartSlice";
import axios from "axios";
import { debounce } from "lodash";
import { Box, IconButton, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";

const CartItem = ({ item }) => {
  const cartitems = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();

  const { cartItems, cartId } = cartitems || {};
  const outletId = cartitems?.outletId || null;
  const customerId = cartitems?.customerId || null;

  const handleDeleteCartItem = async (itemid, cartid) => {
    const payload = {
      cartId: cartid,
      cartItemId: itemid,
    };

    try {
      await deleteCartItem(payload);

      const updatedItems = cartItems?.filter(
        (item) => item?.cartItemId !== itemid
      );

      console.log(updatedItems);
      dispatch(
        setCartItems({
          ...cartitems,
          cartItems: updatedItems,
        })
      );

      const ResturantData = async () => {
        let response;

        if (customerId && outletId) {
          response = await getCartItems(cartId);
        } else {
          response = await getResturantData();
        }

        return response;
      };

      const resturantdata = await ResturantData();

      const { result, customerCart } = resturantdata || {};

      if (customerCart) {
        dispatch(setCartItems(customerCart));
      }

      if (result && customerId) {
        dispatch(setCartItems(result));
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  // Add to Cart

  const addToCart = async (payload) => {
    const response = await handleAddToCart(payload);

    dispatch(setCartItems(response?.data?.result));
  };
  console.log(cartId)
  const handleAddToCartDebounced = useCallback(
    debounce(async (type, item) => {
      await addToCart({
        cartId: cartId,
        menuItemId: item?.cartMenuItemId,
        quantity: type === "increment" ? item.quantity + 1 : item.quantity - 1,
      });
    }, 40), // 40ms debounce delay
    []
  );

  return (
    <Box
      key={item?.cartItemId}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        padding: '16px 0',
      }}
    >
      <Typography variant="body1" sx={{ gridColumn: 'span 2' }}>
        {item?.cartMenuItemName}
      </Typography>
      <Typography variant="body1" sx={{ gridColumn: 'span 1' }}>
        ${item?.cartMenuItemPrice}
      </Typography>
     
      
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => handleAddToCartDebounced('decrement', item)}>
              <Remove sx={{ color: 'white' }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                color: 'green',
                fontSize: '1rem',
              }}
            >
              {item?.quantity}
            </Typography>
            <IconButton onClick={() => handleAddToCartDebounced('increment', item)}>
              <Add sx={{ color: 'white' }} />
            </IconButton>
          </Box>
     
      <Typography variant="body1" sx={{ gridColumn: 'span 1' }}>
        ${(item?.cartMenuItemPrice * item?.quantity).toFixed(2)}
      </Typography>
      <Box>
      <IconButton onClick={() => handleDeleteCartItem(item?.cartItemId, cartId)}>
        <Delete />
      </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;

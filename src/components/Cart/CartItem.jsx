import React from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAddToCart } from "../../hooks/useAddToCart";
import QuantityControl from "../Common/QuantityControl";

const CartItem = ({ item }) => {
  const { deleteFromCart, isLoading, isError, debouncedAddToCart } = useAddToCart()
  const addToCart = async (quantity, menuItemId) => {
    debouncedAddToCart({ quantity, menuItemId })
  };

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

      <QuantityControl {...{ quantity: item?.quantity, updateQuantity: (quantity) => { addToCart(quantity, item?.cartMenuItemId) } }} />


      <Typography variant="body1" sx={{ gridColumn: 'span 1' }}>
        ${(item?.cartMenuItemPrice * item?.quantity).toFixed(2)}
      </Typography>
      <Box>
        <IconButton onClick={() => deleteFromCart({ cartItemId: item?.cartItemId })} disabled={isLoading}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;

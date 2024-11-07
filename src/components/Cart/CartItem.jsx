import React from "react";
import { Box, CircularProgress, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Add, Close, Delete, Remove } from "@mui/icons-material";
import { useAddToCart } from "../../hooks/useAddToCart";
import QuantityControl from "../Common/QuantityControl";

const CartItem = ({ item }) => {
  const { deleteFromCart, isLoading, isError, debouncedAddToCart } = useAddToCart()
  const addToCart = async (quantity, menuItemId) => {
    debouncedAddToCart({ quantity, menuItemId })
  };

  return (
    <Paper
      key={item?.cartItemId}
      elevation={3}
      sx={{
        display: 'flex',
        gap: 2,
        padding: '0.8rem 0.5rem 0.8rem 1.25rem',
        mb: 2,
        flexWrap: "wrap",
        alignItems: "center",
       borderRadius:"1rem"
      }}
    >
      <Stack gap={1} flex={1}>
        <Box sx={{ wordBreak: "break-all", maxWidth: "25rem", fontSize: "1.25rem", color: "secondary.main" }}>
          {item?.cartMenuItemName}
        </Box>
        <Box sx={{ color: "secondary.main", ml: 2 }}>
          ${item?.cartMenuItemPrice} <Close sx={{ color: "secondary.main",fontSize:"0.8rem" }} /> {item.quantity}
        </Box>
        <Box display={"flex"} gap={1}>
          <Box>Total Amount:</Box>
          <Box sx={{ color: "primary.main", fontWeight: 600 }}>${(item?.cartMenuItemPrice * item?.quantity).toFixed(2) || 0}</Box>
        </Box>
      </Stack>
      <Box display={"flex"} gap={2} marginLeft={"1rem"}>
        <QuantityControl {...{ quantity: item?.quantity, isLoading, onlyIcon: true, updateQuantity: (quantity) => { addToCart(quantity, item?.cartMenuItemId) }, sx: { flexDirection: "column-reverse", gap: 1, borderRadius: "1rem" } }} />
        <Tooltip title="Delete" placement="top" arrow>
          <span>
            {isLoading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              <Close
                onClick={() => deleteFromCart({ cartItemId: item?.cartItemId })}
                disabled={isLoading}
                sx={{ color: "secondary.main",fontSize:"1.25rem" }}
              />
            )}
          </span>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default CartItem;

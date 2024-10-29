import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  cartCount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    }
  },
});

export const { setCartItems, setCartCount } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  cartRefetchFunction: null,
  cartCount:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    setRefetchFunction: (state, action) => {
      state.cartRefetchFunction = action.payload;
    },
    setCartCount: (state,action)=> {
      state.cartCount = action.payload;
    }
  },
});

export const { setCartItems, setRefetchFunction, setCartCount } = cartSlice.actions;
export default cartSlice.reducer;

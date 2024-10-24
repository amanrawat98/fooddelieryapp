import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturantdata: {},
  outletData: {},
  customerCart: {},
 };

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,

  reducers: {
    setRestaurantData: (state, action) => {
      state.resturantdata = action.payload;
    },

    setOutletData: (state, action) => {
      state.outletData = action.payload;
    },
   
  },
});

export const { setRestaurantData, setOutletData  } = restaurantSlice.actions;

export default restaurantSlice.reducer;

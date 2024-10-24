import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedOutlet: 0,
  restaurantOutlets: [],
};

const outletSlice = createSlice({
  name: 'outlet',
  initialState,
  reducers: {
    setSelectedOutlet: (state, action) => {
      state.selectedOutlet = action.payload;
    },
    setRestaurantOutlets: (state, action) => {
      state.restaurantOutlets = action.payload;
    },
  
  },
});

export const { setSelectedOutlet, setRestaurantOutlets} = outletSlice.actions;
export default outletSlice.reducer;

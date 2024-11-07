import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedOutlet: 0,
  restaurantOutlets: [],
  selectedOutletData:{}
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
    setSelectedOutletData: (state, action) => {
      state.selectedOutletData = action.payload
    }
  },
});

export const { setSelectedOutlet, setRestaurantOutlets,setSelectedOutletData } = outletSlice.actions;
export default outletSlice.reducer;

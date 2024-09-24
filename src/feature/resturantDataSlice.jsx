import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturantdata: {},
  outletData: {},
  customerCart: {},
};

const resturantSlice = createSlice({
  name: "resturant",
  initialState,

  reducers: {
    setResturantData: (state, action) => {
      state.resturantdata = action.payload;
    },

    setOutletData: (state, action) => {
      state.outletData = action.payload;
    },
  },
});

export const { setResturantData, setOutletData } = resturantSlice.actions;

export default resturantSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturantdata: {},
  outletData: {},
  customerCart: {},
  resturantTheme:{}
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
    setResturantTheme: (state, action) => {
      state.resturantTheme = action.payload;
    }
  },
});

export const { setResturantData, setOutletData, setResturantTheme } = resturantSlice.actions;

export default resturantSlice.reducer;

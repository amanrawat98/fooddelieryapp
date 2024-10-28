import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeData: {},
};

const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    setThemeData: (state, action) => {
      state.themeData = action.payload;
    },
  },
});

export const { setThemeData } = themeSlice.actions;
export default themeSlice.reducer;

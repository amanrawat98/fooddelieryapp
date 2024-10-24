import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {},
};

const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    setThemeData: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemeData } = themeSlice.actions;
export default themeSlice.reducer;

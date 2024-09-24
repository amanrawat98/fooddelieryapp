import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: null,
  isUserLogin: false,
  userRole: null,
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setToken: (state, action) => {
      state.jwtToken = action.payload;
    },

    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },

    setUserLoginStatus: (state, action) => {
      state.isUserLogin = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    
  },
});

export const { setToken, setUserLoginStatus, setUserRole, setUserData } =
  userSlice.actions;

export default userSlice.reducer;

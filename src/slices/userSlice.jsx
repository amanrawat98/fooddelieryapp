import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: null,
  isUserLogin: false,
  userRole: null,
  userData: {},
  selectedAddress: {}
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
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    resetUserState: (state, action) => {
      state.jwtToken = null,
        state.isUserLogin = false,
        state.userRole = null,
        state.userData = {},
        state.selectedAddress = {}
    }
  },
});

export const { setToken, setUserLoginStatus, setUserRole, setUserData, setSelectedAddress,resetUserState } =
  userSlice.actions;

export default userSlice.reducer;

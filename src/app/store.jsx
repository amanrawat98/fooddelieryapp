import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../feature/userSlice";
import { userApi } from "../feature/createApi";
import resturantReducer from "../feature/resturantDataSlice";
import CartReducer from "../feature/CartSlice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const presistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: useReducer,
  resturant: resturantReducer,
  cart: CartReducer
});

const presistedreducer = persistReducer(presistConfig, reducer);

export const store = configureStore({
  reducer: presistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

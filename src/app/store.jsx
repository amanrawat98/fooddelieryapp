import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../feature/userSlice";
import { userApi } from "../feature/createApi";
import resturantReducer from "../feature/resturantDataSlice";
import CartReducer from "../feature/CartSlice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart","resturant"],  // other then these no one persist
};

const reducer = combineReducers({
  user: useReducer,
  resturant: resturantReducer,
  cart: CartReducer,
});

const presistedreducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: presistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

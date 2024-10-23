import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../slices/userSlice";
import restaurantReducer from "../slices/restaurantDataSlice";
import CartReducer from "../slices/cartSlice";
import themeReducer from "../slices/themeSlice";
import dialogSlice from "../slices/dialogSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";  


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart", "restaurant"],  // Only persist these slices
};


const reducer = combineReducers({
  user: useReducer,
  restaurant: restaurantReducer,
  cart: CartReducer,
  dialog: dialogSlice,  
  theme: themeReducer,
});


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],  // Ignore redux-persist actions for serializability check
      },
      
    }),
});

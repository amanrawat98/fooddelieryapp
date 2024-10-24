import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../slices/userSlice";
import restaurantReducer from "../slices/restaurantDataSlice";
import CartReducer from "../slices/cartSlice";
import themeReducer from "../slices/themeSlice";
import dialogSlice from "../slices/dialogSlice";
import outletReducer from "../slices/outletSlice"
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer } from "redux-persist";  

const selectedOutletTransform = createTransform(
  (inboundState) => ({
    selectedOutlet: inboundState.selectedOutlet,// only persist selectedOutlet form outlet slice
    // anotherPersistedState: inboundState.anotherPersistedState,
  }),
  (outboundState) => outboundState, 
  { whitelist: ['outlet'] } 
);
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [selectedOutletTransform], // for specific state from slice
  whitelist: ["user","outlet"],  // Only persist these slices
};


const reducer = combineReducers({
  user: useReducer,
  restaurant: restaurantReducer,
  cart: CartReducer,
  dialog: dialogSlice,  
  theme: themeReducer,
  outlet: outletReducer,
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

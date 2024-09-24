import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

let presistor = persistStore(store);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <PersistGate loading={null} persistor={presistor}>
        <BrowserRouter>
          <StoreContextProvider>
            <App />
          </StoreContextProvider>
        </BrowserRouter>{" "}
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);

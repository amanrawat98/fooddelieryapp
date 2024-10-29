import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { ToastProvider } from "./hooks/Toast/ToastContext.jsx";

let presistor = persistStore(store);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
    },
  },
}
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <PersistGate loading={null} persistor={presistor}>
    <ToastProvider>
        <BrowserRouter>
            <App />
         </BrowserRouter>
        </ToastProvider>
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);

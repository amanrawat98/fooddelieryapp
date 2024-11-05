
import React, { createContext, useContext, useReducer, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';


const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

const toastReducer = (state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { open: true, message: action.payload.message, severity: action.payload.severity };
    case HIDE_TOAST:
      return { ...state, open: false };
    default:
      return state;
  }
};

const ToastContext = createContext();


export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { open: false, message: null, severity: '' });

  const showToast = (message, severity) => {
    dispatch({ type: SHOW_TOAST, payload: { message, severity } });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch({ type: HIDE_TOAST });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={state.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleClose} severity={state.severity} sx={{ width: '100%' }}>
        {/* <AlertTitle>{state.severity}</AlertTitle> */}
          {state.message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
};


export const useToast = () => {
  return useContext(ToastContext);
};

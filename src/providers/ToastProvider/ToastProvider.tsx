/* eslint-disable react/prop-types */
import React, { useState, useContext, useMemo } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface iMessage {
  title?: string;
  message: string;
}

interface iToast {
  success: ({ title, message }: iMessage) => void;
  error: ({ title, message }: iMessage) => void;
  warning: ({ title, message }: iMessage) => void;
}

interface iContext {
  toast: iToast;
}

const defaultContext = {
  toast: {
    success: () => {},
    error: () => {},
    warning: () => {},
  },
};

const ToastContext = React.createContext<iContext>(defaultContext);

export const useToast = () => useContext(ToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<any>();

  const success = ({ title, message }: iMessage) =>
    setToast({
      type: "success",
      title,
      message,
    });

  const error = ({ title, message }: iMessage) =>
    setToast({
      type: "error",
      title,
      message,
    });

  const warning = ({ title, message }: iMessage) =>
    setToast({
      type: "warning",
      title,
      message,
    });

  const value = useMemo(
    () => ({
      toast: {
        success,
        error,
        warning,
      },
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(undefined)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ maxWidth: 400 }}
      >
        <Alert severity={toast?.type} sx={{ width: 400 }}>
          <AlertTitle>{toast?.title}</AlertTitle>
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

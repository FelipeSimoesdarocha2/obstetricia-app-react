/* eslint-disable react/prop-types */
import React, { useState, useContext, useMemo } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import Button from "../../components/button/Button";

interface iMessage {
  title: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface iConfirm {
  show: ({ title }: iMessage) => Promise<any>;
}

interface iContext {
  confirm: iConfirm;
}

const defaultContext = {
  confirm: {
    show: async () => {},
  },
};

const ConfirmContext = React.createContext<iContext>(defaultContext);

export const useConfirm = () => useContext(ConfirmContext);

const ConfirmProvider: React.FC = ({ children }) => {
  const [dialog, setDialog] = useState<any>();

  const handleOnConfirm = async () => {
    dialog.confirm(true);

    setDialog(undefined);
  };

  const handleOnCancel = async () => {
    dialog.cancel(false);

    setDialog(undefined);
  };

  const show = ({ title, onConfirm, onCancel }: iMessage) =>
    new Promise((resolve, reject) => {
      setDialog({
        title,
        confirm: (value: any) => {
          resolve(value);
          onConfirm?.();
        },
        cancel: (value: any) => {
          reject(value);
          onCancel?.();
        },
      });
    });

  const value = useMemo(
    () => ({
      confirm: {
        show,
      },
    }),
    []
  );

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <Dialog open={!!dialog} onClose={handleOnCancel}>
        <DialogTitle>{dialog?.title}</DialogTitle>
        <DialogActions>
          <Button
            style={{ padding: "10px" }}
            onClick={handleOnConfirm}
            title="Sim"
            name="Sim"
          />
          <Button
            style={{ padding: "10px" }}
            type="secondary"
            onClick={handleOnCancel}
            title="Não"
            name="Não"
          />
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;

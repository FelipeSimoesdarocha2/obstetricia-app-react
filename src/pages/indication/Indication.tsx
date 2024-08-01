import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, IconButton, Toolbar, Typography } from "@mui/material";
import styles from "./Indication.module.scss";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { sendIndication } from '../../@core/@http/indication/indication'
import { useToast } from '../../providers/ToastProvider/ToastProvider'

interface iProps {
  open: boolean;
  onClose: () => void;
}

function Indication({ open, onClose }: iProps) {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const { toast } = useToast();

  const handleChange = (value: string) => {
    setEmail(value)
  }

  const handleSendIndication = async () => {
    try {
      setLoading(true);

      await sendIndication(email);

      toast.success({
        title: 'Obstcare',
        message: 'Foi enviado um email para o amigo indicado.'
      })

      onClose()
    } catch (error: any) {
      toast.error({
        title: 'Erro!',
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open}  >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}  >
        <span />
        <DialogTitle style={{ fontFamily: 'Sarabun', fontWeight: '700', marginLeft: '2rem' }}>
          INDIQUE UM AMIGO
        </DialogTitle>
        <IconButton
          edge="end"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <DialogContent dividers>
        <Grid container>
          <Typography mx={1}>Indique o OBSTCARE para seu colega e receba 1 mês grátis.</Typography>
          <Grid md={6}>
            <Input
              label="E-mail"
              placeholder="E-mail de seu colega..."
              id="email"
              type="input"
              value={email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ textAlign: 'center' }}>
        <Grid container direction="column" gap={2}>
          <Typography><b>Confirmar Indicação?</b></Typography>
          <Grid gap={2} className={styles.btn}>
            <Button
              loading={loading}
              className={styles.btn}
              name="SIM"
              onClick={handleSendIndication}
            />
            <Button
              className={styles.btn}
              type="secondary"
              name="NÃO"
              onClick={onClose}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

Indication.defaultProps = {
};

export default Indication;

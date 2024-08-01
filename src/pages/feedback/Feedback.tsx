/* eslint-disable */
import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, IconButton, Toolbar, Typography } from "@mui/material";

import styles from "./Feedback.module.scss";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { sendFeedback } from '../../@core/@http/feedback/feedback'

import { useToast } from '../../providers/ToastProvider/ToastProvider'
interface iProps {
  open: boolean;
  onClose: () => void;
}

function Feedback({ open, onClose }: iProps) {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const { toast } = useToast();

  const handleChange = (value: string) => {
    setMessage(value)
  }

  const handleSendFeedback = async () => {
    try {
      setLoading(true);

      await sendFeedback(message);

      toast.success({
        title: 'Obstcare',
        message: 'Mensagem enviada com sucesso!'
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
          Feedback
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
          <Typography mx={1}>
            Nos conte sobre sua experiência com o OBSTCARE até o momento. Seu <br />
            feedback nos ajuda a entregar o melhor serviço para você.
          </Typography>
          <Grid item xs={12} className={styles.textarea}>
            <Input
              type="text"
              textarea
              id="messageSended"
              label="Mensagem"
              placeholder="Escreva aqui..."
              value={message}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ textAlign: 'center' }}>
        <Grid container direction="column" gap={2}>
          <Typography><b>Enviar mensagem?</b></Typography>
          <Grid gap={2} className={styles.btn}>
            <Button
              loading={loading}
              className={styles.btn}
              name="SIM"
              onClick={handleSendFeedback}
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

Feedback.defaultProps = {
};

export default Feedback;

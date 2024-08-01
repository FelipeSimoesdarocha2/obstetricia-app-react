/* eslint-disable eqeqeq */
/* eslint-disable radix */

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

import { useToast } from "providers/ToastProvider/ToastProvider";
import Button from "../../../../../../components/button/Button";
import Input from "../../../../../../components/input/Input";
import Select from "../../../../../../components/select/Select";

import patientHttp from "../../../../../../@core/@http/patient/patient";
import { IPatientEndServiceRequest } from "../../../../../../@core/@http/models/requests/patient";

interface iProps {
  patientName?: string;
  gestationId: string;
  open: boolean;
  onClose: () => void;
  disabled?: boolean;
}

function DesfechoModal({
  patientName,
  gestationId,
  open,
  onClose,
  disabled,
}: iProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<Partial<IPatientEndServiceRequest>>({});

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const goToHome = () => navigate("/");

  const onChange = (prop: string, value: string | number) => {
    setData({
      ...data,
      [prop]: value,
    });
  };

  const validOnSave = () => {
    const { outcome, gestationalAgeWeeks, babyWeigth } = data;

    if (
      (!outcome && outcome != 0) ||
      outcome == -1 ||
      !gestationalAgeWeeks ||
      !babyWeigth
    ) {
      throw Error("Um ou mais campos obrigatórios não foram preenchidos");
    }
  };

  const onSave = async () => {
    try {
      setLoading(true);

      validOnSave();

      await patientHttp.endService(gestationId, data);

      goToHome();
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.response?.data || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        FINALIZAR ATENDIMENTO
        {disabled && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {!disabled && (
            <Grid item xs={12}>
              <DialogContentText id="alert-dialog-description">
                Para finalizar o atendimento da gestante <b>{patientName}</b>,
                informe os campos abaixo.
              </DialogContentText>
            </Grid>
          )}
          <Grid item xs={6}>
            <Select
              id="outcome"
              value={data.outcome}
              label="Qual foi o <b>desfecho</b>?"
              placeholder="Selecione"
              required
              options={[
                { value: 0, description: "Parto normal" },
                { value: 1, description: "Cesárea" },
                { value: 2, description: "Aborto" },
              ]}
              onChange={(value) => onChange("outcome", parseInt(value))}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              type="number"
              id="gestationalAgeWeeks"
              label="Com que <b>idade gestacional</b>?"
              value={data.gestationalAgeWeeks}
              required
              onChange={(value) => onChange("gestationalAgeWeeks", value)}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              type="number"
              id="babyWeigth"
              label="E o <b>peso</b> do recém nascido?"
              value={data.babyWeigth}
              required
              onChange={(value) => onChange("babyWeigth", value)}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              type="text"
              id="additionalRemarks"
              label="Alguma <b>observação</b> adicional?"
              value={data.additionalRemarks}
              onChange={(value) => onChange("additionalRemarks", value)}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="text"
              textarea
              id="messageSended"
              label="Gostaria de enviar uma <b>mensagem personalizada</b> para a gestante? (Opcional)"
              value={data.messageSended}
              onChange={(value) => onChange("messageSended", value)}
              placeholder="Digite sua mensagem..."
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </DialogContent>
      {!disabled && (
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogTitle sx={{ textAlign: "center" }}>
                Deseja encerrar essa gestação?
              </DialogTitle>
            </Grid>
            <Grid item xs={6}>
              <Button
                loading={loading}
                onClick={onSave}
                title="Sim"
                name="Sim"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="secondary"
                onClick={onClose}
                title="Não"
                name="Não"
              />
            </Grid>
          </Grid>
        </DialogActions>
      )}
    </Dialog>
  );
}

DesfechoModal.defaultProps = {
  patientName: "",
  disabled: false,
};

export default DesfechoModal;

/* eslint-disable eqeqeq */
/* eslint-disable radix */

import React, { useState } from "react";
import styles from "./UltrasomModal.module.scss";

import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import { useToast } from "providers/ToastProvider/ToastProvider";
import Button from "../../../../../../components/button/Button";
import Input from "../../../../../../components/input/Input";
import Select from "../../../../../../components/select/Select";

import patientHttp from "../../../../../../@core/@http/patient/patient";
import { IPatientEndServiceRequest } from "../../../../../../@core/@http/models/requests/patient";
import InputDate from "components/input-date/InputDate";
import CloseIcon from "@mui/icons-material/Close";
import imagem from "@core/@http/imagem/imagem";
import SaveModalCarteirinha from "../saveModalCarteirinha";
interface iProps {
  patientName?: string;
  gestationId: string;
  open: boolean;
  onClose: () => void;
  disabled?: boolean;
  patientData: any;
}
function UltrassomModal({
  patientName,
  gestationId,
  open,
  onClose,
  disabled,
  patientData,
}: iProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<Partial<IPatientEndServiceRequest>>({});
  const [openModalExclude, setOpenModalExclude] = useState(false);

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

  const onExclude = async () => {
    try {
      setLoading(true);

      await imagem.deleteImagem(patientData?.id);

      toast.success({
        title: "Sucesso",
        message: "Ultrassom excluído com sucesso",
      });
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.response?.data || error.message,
      });
    } finally {
      setOpenModalExclude(false);
      onClose();
    }
  };

  const excludeConfirm = () => {
    setOpenModalExclude(true);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ overflowX: "hidden" }}>
        <div className={styles.headerConsulta}>
          <span className={styles.titleSection}>Ultrassom</span>
          <CloseIcon className={styles.icon} onClick={onClose} />
        </div>
        <div className={styles.line} />
        <div className={styles.spacer} />
        <Input
          type="text"
          value={patientData?.tipo}
          width="60%"
          id="nome-completo"
          label="Tipo"
          disabled
          modal
        />
        <Input
          type="text"
          value={patientData?.data}
          width="60%"
          id="nome-completo"
          label="Data"
          disabled
          modal
        />
        {/* <InputDate
          info=""
          width="60%"
          value={patient?.data}
          id="data-dum"
          required={!patient?.data}
          label="Data"
          disabled
          onChange={() => {}}
        /> */}
        <Input
          type="text"
          width="100%"
          height={"200px"}
          value={patientData?.resultado}
          id="nome-completo"
          label="Resultado"
          required
          className={styles.textArea}
          disabled
          textarea
        />
        <div className={styles.line} />
        <div className={styles.spacer} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            name="Excluir"
            type="primary"
            onClick={excludeConfirm}
            className={`${styles.btnAction}`}
          />
          <Button
            name="Sair"
            type="secondary"
            onClick={onClose}
            className={`${styles.btnAction} ${styles.secondary}`}
          />
        </div>
      </DialogContent>
      <SaveModalCarteirinha
        patientName={""}
        gestationId={""}
        open={openModalExclude}
        onClose={() => {
          setOpenModalExclude(false);
        }}
        onAdd={() => {
          onExclude();
        }}
        title={"Tem certeza que deseja excluir este ultrassom?"}
        buttonText={"SIM"}
        buttonTextCancel={"NÃO"}
      />
    </Dialog>
  );
}

UltrassomModal.defaultProps = {
  patientName: "",
  disabled: false,
};

export default UltrassomModal;

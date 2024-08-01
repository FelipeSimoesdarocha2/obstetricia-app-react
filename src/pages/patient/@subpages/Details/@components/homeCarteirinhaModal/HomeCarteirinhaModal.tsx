/* eslint-disable eqeqeq */
/* eslint-disable radix */

import React from "react";
import { useState } from "react";
import styles from "./HomeCarteirinhaModal.module.scss";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useToast } from "providers/ToastProvider/ToastProvider";
import Button from "../../../../../../components/button/Button";
import Input from "../../../../../../components/input/Input";
import patientHttp from "../../../../../../@core/@http/patient/patient";
import { IPatientEndServiceRequest } from "../../../../../../@core/@http/models/requests/patient";
import InputDate from "components/input-date/InputDate";
import CloseIcon from "@mui/icons-material/Close";

interface iProps {
  patientName?: string;
  gestationId: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  disabled?: boolean;
  title?: string;
  desc?: string;
  buttonText?: string;
  buttonExit?: string;
}

const patientData = {
  tipo: "Mofrológica de 1º Tri",
  data: "01/01/0001",
  resultado: "01/01/0001",
  queixa: 0,
};

function HomeCarteirinhaModal({
  patientName,
  gestationId,
  open,
  onClose,
  disabled,
  title,
  desc,
  buttonText,
  buttonExit,
  onAdd,
}: iProps) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(patientData);

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
      <DialogContent style={{ overflowX: "hidden" }}>
        <div className={styles.headerConsulta}>
          <span className={styles.titleSection}>{title}</span>
          <CloseIcon className={styles.icon} onClick={onClose} />
        </div>
        <div className={styles.line} />
        <div className={styles.spacer} />
        <span className={styles.descSection}>{desc}</span>
        <div className={styles.spacer} />
        <div className={styles.line} />
        <div className={styles.spacer} />
        <div className={styles.rowInput}>
          <Button
            name={buttonText ?? ""}
            onClick={onAdd}
            className={`${styles.btnAction}`}
          />
          <Button
            name={buttonExit ?? "Sair"}
            type="secondary"
            onClick={onClose}
            className={`${styles.btnAction} ${styles.secondary}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

HomeCarteirinhaModal.defaultProps = {
  patientName: "",
  disabled: false,
};

export default HomeCarteirinhaModal;

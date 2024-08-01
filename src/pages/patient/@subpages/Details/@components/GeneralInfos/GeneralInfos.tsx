import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DraftsIcon from "@mui/icons-material/Drafts";
import InventoryIcon from "@mui/icons-material/Inventory";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { Link } from "react-router-dom";
import defaultUser from "../../../../../../@core/images/ProfilePicture.png";
import Button from "../../../../../../components/button/Button";
import PhoneText from "../../../../../../components/phone-text/PhoneText";
import StatusContainer from "../../../../../../components/status/container/StatusContainer";
import DesfechoModal from "../DesfechoModal";
import styles from "./GeneralInfos.module.scss";
import DocumentModal from "../OpenDocuments";
import Status from "../../../../../../components/status/Status";

import Card from "./card.svg";

export interface IPatientGeneralInfos {
  averageNotes: string | number;
  nome: string;
  imageUrl: string;
  phone: string;
  email: string;
  finished: boolean;
  peso: number;
  glicemiaJejum: number;
  glicemia24horasApos: number;
  pressaoArterialContraida: number;
  pressaoArterialRelaxada: number;
}

interface IGeneralInfosProps {
  isLoading: boolean;
  generalInfos: IPatientGeneralInfos;
  gestationId: string;
  carteirinhaId: string | undefined;
  id: string;
  monitoramentos: boolean;
  setMonitoramentos: Function;
  carterinha: boolean;
  setCarterinha: Function;
  setAllTabsFalse: () => void;
}

function GeneralInfos(props: IGeneralInfosProps) {
  const {
    isLoading,
    generalInfos,
    gestationId,
    id,
    monitoramentos,
    setMonitoramentos,
    carterinha,
    setCarterinha,
    carteirinhaId,
    setAllTabsFalse,
  } = props;

  const [openDesfecho, setOpenDesfecho] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);

  const inProgress = !generalInfos?.finished;

  const changeSelected = (local: "carteirinha" | "monitoramento") => {
    setAllTabsFalse();
    if (local === "carteirinha") {
      setMonitoramentos(false);
      if (!carterinha) {
        setCarterinha(true);
      }
    } else {
      setCarterinha(false);
      if (!monitoramentos) {
        setMonitoramentos(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton height={150} />
      ) : (
        <>
          <img
            src={generalInfos?.imageUrl ?? defaultUser}
            className={styles.patientImage}
            alt="Paciente"
          />
          <div className={styles.infos}>
            <strong>{generalInfos?.nome}</strong>
            <PhoneText number={generalInfos?.phone} />
            <p>{generalInfos?.email}</p>
            <p className={styles.status}>
              {inProgress ? "" : "Atendimento Finalizado"}
            </p>
          </div>
        </>
      )}
      <div className={styles.containerButtons}>
        <div
          className={styles.buttonPaci}
          onClick={() => changeSelected("monitoramento")}
        >
          {monitoramentos && <div className={styles.active} />}
          <img src={Card} alt="" />
          <p className={styles.text}>Monitoramentos</p>
        </div>
        {carteirinhaId && (
          <div
            className={styles.buttonPaci}
            onClick={() => changeSelected("carteirinha")}
          >
            {carterinha && <div className={styles.active} />}
            <img src={Card} alt="" />
            <p className={styles.text}>Carteirinha</p>
          </div>
        )}
      </div>

      <StatusContainer
        isLoading={isLoading}
        key="peso"
        type="danger"
        headerTitle="Peso"
        status={[
          <Status
            type="danger"
            statusTitle=""
            key="status-peso"
            value={generalInfos?.peso}
            text="kg"
          />,
        ]}
        headerSubTitle=""
      />
      <StatusContainer
        isLoading={isLoading}
        key="glicemia"
        type="normal"
        headerTitle="Glicemia"
        headerSubTitle="% acima do controle"
        status={[
          <Status
            type="normal"
            statusTitle=""
            key="status-normal"
            value={generalInfos?.averageNotes}
            text="%"
          />,
        ]}
      />

      <StatusContainer
        isLoading={isLoading}
        key="pressaoArterial"
        type="success"
        headerTitle="PA"
        headerSubTitle=""
        status={[
          <Status
            type="success"
            statusTitle=""
            key="status-pressaoArterial"
            value={`${generalInfos?.pressaoArterialContraida}/${generalInfos?.pressaoArterialRelaxada}`}
            text="mmHg"
          />,
        ]}
      />

      <div className={styles.buttons}>
        {inProgress && (
          // @ts-ignore
          <Link
            to={`/patients/${id}/${gestationId}`}
            style={{
              width: "-webkit-fill-available",
              textDecoration: "none",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              type="secondary"
              iconLeft={<EditIcon />}
              name="Editar cadastro"
            />
          </Link>
        )}
        <Button
          type="secondary"
          iconLeft={<DraftsIcon />}
          name="Abrir Documentos"
          onClick={() => setOpenDocument(true)}
        />
        <Button
          type="secondary"
          iconLeft={<InventoryIcon />}
          name="Desfecho Gestacional"
          onClick={() => setOpenDesfecho(true)}
        />
      </div>
      <DesfechoModal
        patientName={generalInfos?.nome}
        gestationId={gestationId}
        open={openDesfecho}
        onClose={() => setOpenDesfecho(false)}
        disabled={!inProgress}
      />

      <DocumentModal
        patient={gestationId}
        open={openDocument}
        onClose={() => setOpenDocument(false)}
        disabled={!inProgress}
      />
    </div>
  );
}

export default GeneralInfos;

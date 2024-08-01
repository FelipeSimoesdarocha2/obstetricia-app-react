/* eslint-disable eqeqeq */
/* eslint-disable radix */

import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./HomeCarteirinhaModalCompartilhamento.module.scss";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useToast } from "providers/ToastProvider/ToastProvider";
import Button from "../../../../../../components/button/Button";
import patientHttp from "../../../../../../@core/@http/patient/patient";
import { IPatientEndServiceRequest } from "../../../../../../@core/@http/models/requests/patient";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "components/checkboxModal/Checkbox";
import carteirinhaProblems, {
  ResponseCarteirinha,
} from "@core/@http/carteirinha/carteirinhaProblems";
import Input from "components/input/Input";
import { on } from "events";
import QRCode from "react-qr-code";
interface iProps {
  patientName?: string;
  gestationId: string;
  open: boolean;
  onClose: () => void;
  disabled?: boolean;
  editing: boolean;
  title?: string;
  desc?: string;
  carteirinhaId: string;
  carteirinha: ResponseCarteirinha | undefined;
}

const patientData = {
  gestationId: "",
  carteirinhaId: "",
  informacoesBasicas: false,
  consultas: false,
  historicos: false,
  vacinas: false,
  examesLaboratoriais: false,
  examesImagem: false,
  graficosMonitoramento: false,
  pressao: false,
  peso: false,
  alturaUlterina: false,
  glicemias: false,
  humor: false,
  sintomas: false,
  movFetal: false,
};

function HomeCarteirinhaModalCompartilhamento({
  gestationId,
  open,
  onClose,
  title,
  desc,
  carteirinhaId,
  editing,
  carteirinha,
}: iProps) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(patientData);

  const [data, setData] = useState<Partial<IPatientEndServiceRequest>>({});
  const [link, setLink] = useState<boolean>(false);
  const [responseLink, setResponseLink] = useState<{
    linkCarteirinhaId: string;
    carteirinhaId: string;
    link: string;
  }>({
    linkCarteirinhaId: "",
    carteirinhaId: "",
    link: "",
  });

  useEffect(() => {
    setLink(carteirinha?.linkCarteirinha ? true : false);
    setResponseLink({
      linkCarteirinhaId: "",
      carteirinhaId: "",
      link: carteirinha?.linkCarteirinha ?? "",
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onDeleteLinkCarteirinha = async () => {
    try {
      const response = await carteirinhaProblems.deleteLink(
        carteirinha?.linkCarteirinhaId ?? responseLink.linkCarteirinhaId
      );
      onCloseModal();
      toast.success({
        title: "Link deletado com sucesso",
        message: "",
      });
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    patient.gestationId = gestationId;
    patient.carteirinhaId = carteirinhaId;
    try {
      setLoading(true);

      const response = await carteirinhaProblems.gerarLink(patient);
      console.log(11111, response);
      setLink(true);
      setResponseLink(response);
      toast.success({
        title: "Sucesso",
        message: "Link gerado com sucesso",
      });
      // onCloseModal();
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckedByName = (string: string) => {
    setPatient({
      ...patient,
      // @ts-ignore
      [string]: !patient[string],
    });
  };

  const Compartilhar = () => {
    return (
      <>
        <span className={styles.titleSection}>
          Quais informações você deseja incluir no link?
        </span>
        <div className={styles.line} />
        <div className={styles.spacer} />

        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("informacoesBasicas")}
            title={"Informações básicas"}
            checked={patient.informacoesBasicas}
          />
        </div>
        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("consultas")}
            title={"Consultas"}
            checked={patient.consultas}
          />
        </div>
        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("historicos")}
            title={"Históricos"}
            checked={patient.historicos}
          />
        </div>
        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("vacinas")}
            title={"Vacinas"}
            checked={patient.vacinas}
          />
        </div>
        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("examesLaboratoriais")}
            title={"Exames Laboratoriais"}
            checked={patient.examesLaboratoriais}
          />
        </div>
        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("examesImagem")}
            title={"Exames de Imagem"}
            checked={patient.examesImagem}
          />
        </div>
        <div className={styles.width30}>
          <Checkbox
            onChange={(e) => toggleCheckedByName("graficosMonitoramento")}
            title={"Gráficos de monitoramento (30 dias)"}
            checked={patient.graficosMonitoramento}
          />
        </div>
        {patient.graficosMonitoramento && (
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("pressao")}
                title={"Pressão"}
                checked={patient.pressao}
              />
            </div>
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("peso")}
                title={"Peso"}
                checked={patient.peso}
              />
            </div>
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("alturaUlterina")}
                title={"Altura Uterina"}
                checked={patient.alturaUlterina}
              />
            </div>
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("glicemias")}
                title={"Glicemias"}
                checked={patient.glicemias}
              />
            </div>
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("humor")}
                title={"Humor"}
                checked={patient.humor}
              />
            </div>
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("sintomas")}
                title={"Sintomas"}
                checked={patient.sintomas}
              />
            </div>
            <div className={styles.width30}>
              <Checkbox
                onChange={(e) => toggleCheckedByName("movFetal")}
                title={"Mov. Fetal"}
                checked={patient.movFetal}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const onCloseModal = () => {
    setLink(false);
    setPatient(patientData);
    onClose();
  };
  console.log("carteirinha, link", link);
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
          <CloseIcon className={styles.icon} onClick={onCloseModal} />
        </div>
        <div className={styles.line} />
        <div className={styles.spacer} />
        <span className={styles.descSection}>{desc}</span>
        <div className={styles.spacer} />
        {carteirinha?.linkCarteirinha || link ? (
          <>
            <span className={styles.titleSection}>
              Você ja criou uma carterinha!
            </span>
            <div className={styles.line} />
            <div className={styles.spacer} />
            <div className={styles.row}>
              <Input
                label=""
                type="text"
                width="60%"
                value={carteirinha?.linkCarteirinha ?? responseLink.link}
                id="nome-completo"
                required
                className={styles.textArea}
              />
              <div className={styles.containerLink}>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(
                      carteirinha?.linkCarteirinha ?? responseLink?.link
                    );
                    toast.success({
                      title: "Sucesso",
                      message: "Link copiado com sucesso",
                    });
                  }}
                  className={styles.containerLinkText}
                >
                  COPIAR LINK
                </span>
              </div>
            </div>
            <div className={styles.spacer} />
            <div className={styles.rowQrCode}>
              <QRCode
                size={135}
                style={{ height: "auto", width: "135px" }}
                value={carteirinha?.linkCarteirinha ?? responseLink.link}
                viewBox={`0 0 256 256`}
              />
              <div className={styles.containerLink}>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(responseLink.link);
                    toast.success({
                      title: "Sucesso",
                      message: "QrCode copiado com sucesso",
                    });
                  }}
                  className={styles.containerLinkText}
                >
                  COPIAR QR CODE
                </span>
              </div>
            </div>
          </>
        ) : (
          <Compartilhar />
        )}

        <div className={styles.spacer} />
        <div className={styles.rowInput}>
          {carteirinha?.linkCarteirinha || link ? (
            <>
              <Button
                name="EXCLUIR"
                type="secondary"
                onClick={onDeleteLinkCarteirinha}
                className={`${styles.btnAction} ${styles.secondaryDeletar}`}
              />
              <Button
                name="Sair"
                type="secondary"
                onClick={onClose}
                className={`${styles.btnAction} ${styles.secondary}`}
              />
            </>
          ) : (
            <Button
              name={"GERAR LINK"}
              onClick={onSave}
              className={`${styles.btnAction}`}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

HomeCarteirinhaModalCompartilhamento.defaultProps = {
  patientName: "",
  disabled: false,
};

export default HomeCarteirinhaModalCompartilhamento;

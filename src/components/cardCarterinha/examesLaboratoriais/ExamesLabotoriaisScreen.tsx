import React from "react";
import Prancheta from "../imagens/prancheta.png";
import styles from "../CardCartetinha.module.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InputDate from "components/input-date/InputDate";
import { useEffect, useState } from "react";
import Input from "components/input/Input";
import RadioButton from "components/radio/RadioButton";
import Card from "components/card/Card";
import Button from "components/button/Button";
import Select from "components/select/Select";
import Table, { ITableBody, ITableHead } from "components/table/Table";
import { IPatientDetails } from "@core/models/patient";
import { Dialog, DialogActions, DialogTitle, Skeleton } from "@mui/material";
import LaboratorioModal from "pages/patient/@subpages/Details/@components/laboratorioModal/LaboratorioModal";
import { handlerDocument } from "./handleDocument";
import imagemExame from "@core/@http/exameLaboratorias/exameLaboratorias";
import { useToast } from "providers/ToastProvider/ToastProvider";
import exameLaboratorias from "@core/@http/exameLaboratorias/exameLaboratorias";
import SaveModalCarteirinha from "pages/patient/@subpages/Details/@components/saveModalCarteirinha";
import { set } from "lodash";
import { ResponseCarteirinha } from "@core/@http/carteirinha/carteirinhaProblems";
import { format } from "date-fns";

type consultaProps = {
  goBack: Function;
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  historicoId: string;
  carteirinhaId: string;
  isLoading: boolean;
  carteirinha: ResponseCarteirinha | undefined;
};

const patientData = {
  tipo: 0,
  data: "",
  resultado: "",
  queixa: 0,
  destaque: 0,
};

const tableHead: ITableHead[] = [
  {
    name: "Nome",
  },
  {
    name: "Data",
  },
  {
    name: "Resultado",
  },
  {
    name: "",
  },
];

function ExamesLabotoriaisScreen(props: consultaProps) {
  const {
    goBack,
    patient: user,
    gestationId,
    isLoading,
    carteirinhaId,
    carteirinha,
  } = props;
  const [patient, setPatient] = useState(patientData);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModalDetais, setOpenModalDetais] = useState(false);
  const [tableBody, setTableBody] = useState<ITableBody>({ rows: [] });
  const [patientDataModal, setPatientDataModal] = useState({});
  const { toast } = useToast();
  const maxDateString = format(new Date(), "yyyy-MM-dd");

  const onChangeTipo = (tipo: number) => {
    setPatient({ ...patient, tipo });
  };
  const onChangeData = (data: string) => {
    setPatient({ ...patient, data });
  };
  const onChangeResultado = (resultado: string) => {
    setPatient({ ...patient, resultado });
  };
  const onChangeDestaque = (destaque: number) => {
    setPatient({ ...patient, destaque: destaque });
  };

  const requiredQueixa = patient?.queixa === undefined;

  const onClickSave = async () => {
    const dataRequest = handlerDocument(patient, carteirinhaId, gestationId);
    try {
      const response = await exameLaboratorias.createExameLaboratoria(
        dataRequest
      );
      setModalOpen(true);
      setPatient(patientData);
      fetchHistory();
      toast.success({
        title: "Sucesso",
        message: "Exame Laboratorial criado com sucesso",
      });
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    }
  };

  const onClickCancelar = () => {
    goBack();
  };

  const onClickRow = (item: any) => {
    console.log(item);
    let patientDataModalTest = {
      tipo: 0,
      data: "",
      resultado: "",
      id: item.id,
      destaque: 0,
    };

    item.columns.forEach((column: any) => {
      if (column.id === "1") {
        patientDataModalTest.tipo = column.value;
      } else if (column.id === "2") {
        patientDataModalTest.data = column.value;
      } else if (column.id === "3") {
        patientDataModalTest.resultado = column.value;
      }
    });
    console.log(patientDataModalTest);
    setPatientDataModal(patientDataModalTest);

    setOpenModalDetais(true);
  };

  const removeProblem = () => {};

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await exameLaboratorias.getExameLaboratoriais(
        carteirinhaId || ""
      );
      setTableBody({
        rows: response,
      });
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: "Erro ao crirar Exame de Laboratorial",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [openModalDetais, user]);

  return (
    <div className={`${styles.card}`}>
      {isLoading ? (
        <>
          <Skeleton height={150} />
          <Skeleton height={300} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </>
      ) : (
        <>
          <div className={styles.headerConsulta}>
            <div className={styles.containerBack}>
              <div className={styles.containerIcon}>
                <ChevronLeftIcon
                  onClick={() => goBack()}
                  style={{
                    color: "#1A535C",
                  }}
                />
              </div>
              <span className={styles.text}>Voltar</span>
            </div>
            <div className={styles.containerMid}>
              <img src={Prancheta} className={styles.imageContainer} />
              <div className={styles.containerText}>
                <span className={styles.title}>Exames Laboratoriais</span>
                <span className={styles.subTitle}>Preenchido</span>
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeExamesLaboratoriais}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.spacerHeader} />
          <span className={styles.titleSection}>Adicionar novo exame</span>
          <div className={styles.line} />
          <div className={styles.spacer} />
          <Select
            id="outcome"
            value={patient.tipo}
            label="Selecione um tipo"
            placeholder="Selecione"
            width="30%"
            required
            options={[
              { value: 1, description: "ABO/Rh" },
              { value: 2, description: "Coombs Indireto" },
              { value: 3, description: "Hemoglobina Glicada" },
              { value: 4, description: "Hb/Ht" },
              { value: 5, description: "Glicemia de Jejum" },
              { value: 6, description: "TTGO 75mg" },
              { value: 7, description: "antis-hiv" },
              { value: 8, description: "Sífilis (VDRL)" },
              { value: 9, description: "HbsAg" },
              { value: 10, description: "Anti HCV" },
              { value: 11, description: "TSH/T4" },
              { value: 12, description: "Toxoplasmose IgG e IgM" },
              { value: 13, description: "Rubéola IgG e IgM" },
              { value: 14, description: "Citomegalovirus IgG e IgM" },
              { value: 15, description: "Sumário de urina" },
              { value: 16, description: "Urocultura" },
              { value: 17, description: "Dosagem de vitamina D" },
              { value: 18, description: "PSGB " },
              { value: 19, description: "Outro" },
            ]}
            onChange={(value) => onChangeTipo(parseInt(value))}
          />
          <InputDate
            info=""
            width="30%"
            value={patient?.data}
            id="data-dum"
            required={!patient?.data}
            label="Data"
            onChange={onChangeData}
            max={maxDateString}
          />
          <Input
            type="text"
            width="60%"
            height={"200px"}
            value={patient?.resultado}
            id="nome-completo"
            label="Resultado"
            required
            onChange={onChangeResultado}
            className={styles.textArea}
            textarea
          />
          <RadioButton
            id="riscos"
            label="Destacar na carterinha? Essa informação será colocada no início da carterinha em destaque. "
            values={[
              {
                id: "risco-baixo",
                label: "Sim",
                checked: patient?.destaque === 1,
                onChange: (_) => onChangeDestaque(1),
                required: requiredQueixa,
              },
              {
                id: "risco-baixo2",
                label: "Não",
                checked: patient?.destaque === 0,
                onChange: (_) => onChangeDestaque(0),
                required: requiredQueixa,
              },
            ]}
          />
          <Card
            header={{ title: "", rightContent: null }}
            width="100%"
            classBody={styles.cardBody}
            body={
              <>
                <Button
                  name="Salvar"
                  isSubmit
                  loading={loading}
                  onClick={onClickSave}
                  className={styles.btnAction}
                />

                <Button
                  name="Cancelar"
                  type="secondary"
                  onClick={onClickCancelar}
                  className={`${styles.btnAction} ${styles.secondary}`}
                />
              </>
            }
          />
          <div className={styles.spacerHeader} />
          <span className={styles.titleSection}>Lista de exames</span>
          <div className={styles.line} />
          <div className={styles.spacer} />
          <div className={styles.table}>
            <Table
              body={tableBody}
              head={tableHead}
              isLoading={false}
              onClickRow={(item) => onClickRow(item)}
            />
          </div>

          <LaboratorioModal
            patientName={user?.nome}
            gestationId={user?.nome ?? ""}
            open={openModalDetais}
            patientData={patientDataModal}
            onClose={() => setOpenModalDetais(false)}
          />

          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle>
              Tem certeza que deseja excluir este exame?
            </DialogTitle>
            <DialogActions>
              <Button
                loading={loading}
                className={styles.btn}
                onClick={() => removeProblem()}
                title="Sim"
                name="Sim"
              />
              <Button
                className={styles.btn}
                type="secondary"
                onClick={() => setOpenDelete(false)}
                title="Não"
                name="Não"
              />
            </DialogActions>
          </Dialog>
          <SaveModalCarteirinha
            patientName={""}
            gestationId={""}
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              goBack();
            }}
            onAdd={() => {
              setModalOpen(false);
            }}
            title={"Exame salvo com com sucesso!"}
            buttonText={"ADICIONAR NOVO EXAME"}
            buttonTextCancel={"SAIR"}
          />
        </>
      )}
    </div>
  );
}

export default ExamesLabotoriaisScreen;

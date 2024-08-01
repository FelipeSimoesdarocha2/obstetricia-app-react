import React from "react";
import styles from "../CardCartetinha.module.scss";
import Baby2 from "../imagens/baby.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InputDate from "components/input-date/InputDate";
import { useEffect, useState } from "react";
import Input from "components/input/Input";
import RadioButton from "components/radio/RadioButton";
import Card from "components/card/Card";
import Button from "components/button/Button";
import Select from "components/select/Select";
import Table, {
  ITableBody,
  ITableHead,
  ITableRow,
} from "components/table/Table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IPatientDetails } from "@core/models/patient";
import { Dialog, DialogActions, DialogTitle, Skeleton } from "@mui/material";
import UltrassomModal from "pages/patient/@subpages/Details/@components/ultrassomModal/UltrassomModal";
import { handlerDocument } from "./handleDocument";
import imagem from "@core/@http/imagem/imagem";
import { useToast } from "providers/ToastProvider/ToastProvider";
import SaveModalCarteirinha from "pages/patient/@subpages/Details/@components/saveModalCarteirinha";
import { ResponseCarteirinha } from "@core/@http/carteirinha/carteirinhaProblems";
import { format } from "date-fns";

type consultaProps = {
  goBack: Function;
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  historicoId: string;
  isLoading: boolean;
  carteirinhaId: string;
  carteirinha: ResponseCarteirinha | undefined;
};

const patientData = {
  tipo: 0,
  data: "",
  resultado: "",
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

function ExamesImagemScreen(props: consultaProps) {
  const {
    goBack,
    patient: user,
    gestationId,
    carteirinha,
    carteirinhaId,
    isLoading,
  } = props;
  const [patient, setPatient] = useState(patientData);
  const [exames, setExames] = useState();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModalDetais, setOpenModalDetais] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const [tableBody, setTableBody] = useState<ITableBody>({ rows: [] });
  const [patientDataModal, setPatientDataModal] = useState({});
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

  const requiredQueixa = patient?.destaque === undefined;

  const onClickSave = async () => {
    const dataRequest = handlerDocument(patient, carteirinhaId, gestationId);
    try {
      const response = await imagem.createImagem(dataRequest);
      setModalOpen(true);
      setPatient(patientData);
      fetchHistory();
      toast.success({
        title: "Sucesso",
        message: "Exame Imagem criado com sucesso",
      });
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: "Erro ao crirar Exame de Imagem",
      });
      console.log("error", error);
    }
  };

  const onClickCancelar = async () => {
    goBack();
  };

  const onClickRow = (item: any) => {
    let patientDataModalTest = {
      tipo: 0,
      data: "",
      resultado: "",
      id: item.id,
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

    setPatientDataModal(patientDataModalTest);
    setOpenModalDetais(true);
  };

  const removeProblem = () => {};

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await imagem.getImagem(carteirinhaId || "");
      setTableBody({
        rows: response,
      });
    } catch (error: any) {
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
              <img src={Baby2} className={styles.imageContainer} />
              <div className={styles.containerText}>
                <span className={styles.title}>Exames de Imagem</span>
                <span className={styles.subTitle}>Preenchido</span>
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeExamesDeImagem}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.spacerHeader} />
          <span className={styles.titleSection}>Adicionar novo ultrassom</span>
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
              { value: 1, description: "Morfológico do 1º tri" },
              { value: 2, description: "Morfológico do 2º tri" },
              { value: 3, description: "USG Obstétrico" },
              { value: 4, description: "Cervicometria" },
              { value: 5, description: "Doppler Obstétrico" },
              { value: 6, description: "USG Transvaginal" },
              { value: 7, description: "Ecocardiograma fetal" },
              { value: 8, description: "Outro" },
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
            label="Destacar na carterinha? Essa informação será colocada no início da carterinha em destaque."
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
          <span className={styles.titleSection}>Lista de ultrassons</span>
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

          <UltrassomModal
            patientName={user?.nome}
            gestationId={gestationId}
            open={openModalDetais}
            onClose={() => setOpenModalDetais(false)}
            patientData={patientDataModal}
          />

          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle>
              Tem certeza que deseja excluir este Ultrassom?
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

export default ExamesImagemScreen;

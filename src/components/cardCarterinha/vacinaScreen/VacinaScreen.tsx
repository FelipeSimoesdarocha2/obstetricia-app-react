import React from "react";
import Vacina from "../imagens/seringa.png";
import styles from "../CardCartetinha.module.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InputDate from "components/input-date/InputDate";
import { useEffect, useState } from "react";
import RadioButton from "components/radio/RadioButton";
import Card from "components/card/Card";
import Button from "components/button/Button";
import Select from "components/select/Select";
import Table, { ITableBody, ITableHead } from "components/table/Table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IPatientDetails } from "@core/models/patient";
import { Dialog, DialogActions, DialogTitle, Skeleton } from "@mui/material";
import VacinaModal from "pages/patient/@subpages/Details/@components/vacinaModal/VacinaModal";
import { useToast } from "providers/ToastProvider/ToastProvider";
import { handlerDocument } from "./handleDocument";
import vacina from "@core/@http/vacina/vacina";
import SaveModalCarteirinha from "pages/patient/@subpages/Details/@components/saveModalCarteirinha";
import { set } from "lodash";
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
  dose: 0,
  data: "01/01/0001",
  imune: 0,
  destacarVacina: 0,
};

const tableHead: ITableHead[] = [
  {
    name: "Nome",
  },
  {
    name: "Dose",
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

function VacinaScreen(props: consultaProps) {
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
  const onChangeDose = (dose: number) => {
    setPatient({ ...patient, dose });
  };
  const onChangeData = (data: string) => {
    setPatient({ ...patient, data });
  };

  const onChangeImune = (imune: number) => {
    setPatient({ ...patient, imune });
  };

  const requiredQueixa = patient?.imune === undefined;

  const onClickCancelar = () => {
    goBack();
  };

  const onChangeDestacarVacina = (destacarVacina: number) => {
    setPatient({
      ...patient,
      destacarVacina: destacarVacina,
    });
  };

  const onClickRow = (item: any) => {
    let patientDataModalTest = {
      tipo: 0,
      dose: 0,
      data: "01/01/0001",
      resultado: 0,
      id: item.id,
    };
    item.columns.forEach((column: any) => {
      if (column.id === "1") {
        patientDataModalTest.tipo = column.value;
      } else if (column.id === "2") {
        patientDataModalTest.dose = column.value;
      } else if (column.id === "3") {
        patientDataModalTest.data = column.value;
      } else if (column.id === "4") {
        patientDataModalTest.resultado = column.value;
      }
    });

    setPatientDataModal(patientDataModalTest);
    setOpenModalDetais(true);
  };

  const removeProblem = () => {};

  const onClickSave = async () => {
    const dataRequest = handlerDocument(patient, carteirinhaId, gestationId);

    if (patient.dose && patient.tipo && patient.imune) {
      try {
        const response = await vacina.createVacina(dataRequest);
        if (response) {
          setModalOpen(true);
          setPatient(patientData);
          fetchVacina();
          toast.success({
            title: "Sucesso",
            message: "Vacina criada com sucesso",
          });
        }
      } catch (error: any) {
        toast.error({
          title: "Erro",
          message: "Erro ao criar Vacina",
        });
        console.log("response", error);
      }
    } else {
      toast.error({
        title: "Erro",
        message: "Preencha todos os campos obrigatórios",
      });
    }
  };

  const fetchVacina = async () => {
    try {
      setLoading(true);
      const response = await vacina.getVacina(carteirinhaId || "");

      setTableBody({
        rows: response,
      });
    } catch (error: any) {
      // toast.error({
      //   title: "Erro",
      //   message: error.message,
      // });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacina();
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
              <img src={Vacina} className={styles.imageContainer} />
              <div className={styles.containerText}>
                <span className={styles.title}>Vacinas</span>
                <span className={styles.subTitle}>Preenchido</span>
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeVacina}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.spacerHeader} />
          <span className={styles.titleSection}>Adicionar nova vacina</span>
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
              { value: 1, description: "Anti tetânica" },
              { value: 2, description: "Covid-19" },
              { value: 3, description: "Hepatite B" },
              { value: 4, description: "Influenza" },
            ]}
            onChange={(value) => onChangeTipo(parseInt(value))}
          />
          <Select
            id="outcome"
            value={patient.dose}
            label="Dose (opcional)"
            placeholder="Selecione"
            width="30%"
            required
            options={[
              { value: 1, description: "Dose única" },
              { value: 2, description: "1º dose" },
              { value: 3, description: "2º dose" },
              { value: 4, description: "3º dose" },
            ]}
            onChange={(value) => onChangeDose(parseInt(value))}
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
          <RadioButton
            id="riscos"
            label="Imunização?"
            values={[
              {
                id: "risco-baixo",
                label: "Imunizada",
                checked: patient?.imune === 1,
                onChange: (_) => onChangeImune(1),
                required: requiredQueixa,
              },
              {
                id: "risco-baixo2",
                label: "Não Imunizada",
                checked: patient?.imune === 2,
                onChange: (_) => onChangeImune(2),
                required: requiredQueixa,
              },
              {
                id: "risco-baixo3",
                label: "Sem informação",
                checked: patient?.imune === 3,
                onChange: (_) => onChangeImune(3),
                required: requiredQueixa,
              },
            ]}
          />
          <RadioButton
            id="riscos"
            label="Destacar essa vacina na carterinha? Essa informação será colocada no início da carterinha em destaque."
            values={[
              {
                id: "risco-baixo33",
                label: "Sim",
                checked: patient?.destacarVacina === 1,
                onChange: (_) => onChangeDestacarVacina(1),
              },
              {
                id: "risco-baixo22",
                label: "Não",
                checked: patient?.destacarVacina === 0,
                onChange: (_) => onChangeDestacarVacina(0),
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
          <span className={styles.titleSection}>Lista de vacinas</span>
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

          <VacinaModal
            patientName={user?.nome}
            gestationId={user?.nome ?? ""}
            open={openModalDetais}
            onClose={() => setOpenModalDetais(false)}
            patientData={patientDataModal}
          />

          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle>
              Tem certeza que deseja excluir esta vacina?
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
            title={"Vacina salva com com sucesso!"}
            buttonText={"ADICIONAR NOVA VACINA"}
            buttonTextCancel={"SAIR"}
          />
        </>
      )}
    </div>
  );
}

export default VacinaScreen;

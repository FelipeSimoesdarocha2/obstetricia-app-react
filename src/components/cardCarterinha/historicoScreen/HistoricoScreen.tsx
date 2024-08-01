import React from "react";
import styles from "../CardCartetinha.module.scss";
import Calendar from "../imagens/calendar.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useEffect, useState } from "react";

import Card from "components/card/Card";
import Button from "components/button/Button";
import { IPatientDetails } from "@core/models/patient";
import { ISearchBoxItem } from "components/search-box/SearchBox";
import {
  historicoData,
  historicoData2,
  historicoEnum,
  historicoFamiliarData,
  historicoFamiliarData2,
  historicoObstetricoData,
  historicoObstetricoData2,
} from "../constants";
import { useToast } from "providers/ToastProvider/ToastProvider";
import healthProblemsHttp from "@core/@http/history/historyProblems";
import HistoricoPessoal from "./HistoricoPessoal";
import HistoricoFamilha from "./HistoricoFamilha";
import HistoricoObstetrico from "./HistoricoObstetrico";
import { handleDocument } from "./handlers";
import { set } from "lodash";
import SaveModalCarteirinha from "pages/patient/@subpages/Details/@components/saveModalCarteirinha/SaveModalCarteirinha";
import { ResponseCarteirinha } from "@core/@http/carteirinha/carteirinhaProblems";
import { Skeleton } from "@mui/material";

type historicoProps = {
  goBack: Function;
  carteirinha: ResponseCarteirinha | undefined;
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  historicoId: string;
  carteirinhaId: string;
  isLoading: boolean;
};

function HistoricoScreen(props: historicoProps) {
  const {
    carteirinha,
    goBack,
    patient,
    gestationId,
    historicoId,
    carteirinhaId,
    isLoading,
  } = props;
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [historicoGetById, setHistoricoGetById] = useState<any>([]);
  const [historico, setHistorico] = useState([historicoData, historicoData2]);
  const [historicoFamiliar, setHistoricoFamiliar] = useState([
    historicoFamiliarData,
    historicoFamiliarData2,
  ]);
  const [historicoObstetrico, setHistoricoObstetrico] = useState([
    historicoObstetricoData,
    historicoObstetricoData2,
  ]);
  const [othersHistoryPersonal, setOthersHistoryPersonal] = useState<
    ISearchBoxItem[] | undefined
  >();
  const [othersHistoryFamily, setOthersHistoryFamilyFamily] = useState<
    ISearchBoxItem[] | undefined
  >();
  const [othersHistoryFamilySelected, setOthersHistoryFamilySelected] =
    useState<string[]>([""]);

  const [othersHistoryObstetrico, setOthersHistoryObstetrico] = useState<
    ISearchBoxItem[] | undefined
  >();
  const [othersHistoryObstetricoSelected, setOthersHistoryObstetricoSelected] =
    useState<string[]>([""]);

  const { toast } = useToast();

  const toggleCheckedByName = (name: historicoEnum) => {
    setHistorico((prevHistorico) =>
      prevHistorico.map((condicoesMedicas) =>
        condicoesMedicas.map((condicao) =>
          condicao.name === name
            ? { ...condicao, checked: !condicao.checked }
            : condicao
        )
      )
    );
  };

  const toggleCheckedByNameFamiliar = (name: historicoEnum) => {
    setHistoricoFamiliar((prevHistoricoFamiliar) => {
      const newHistoricoFamiliar = prevHistoricoFamiliar.map((subarray) =>
        subarray.map((condicaoFamiliar) =>
          condicaoFamiliar.name === name
            ? { ...condicaoFamiliar, checked: !condicaoFamiliar.checked }
            : condicaoFamiliar
        )
      );
      return newHistoricoFamiliar;
    });
  };

  const toggleCheckedByNameObstetrico = (name: historicoEnum) => {
    setHistoricoObstetrico((prevHistoricoObstetrico) => {
      const newHistoricoObstetrico = prevHistoricoObstetrico.map((subarray) =>
        subarray.map((condicaoObstetrico) =>
          condicaoObstetrico.name === name
            ? { ...condicaoObstetrico, checked: !condicaoObstetrico.checked }
            : condicaoObstetrico
        )
      );
      return newHistoricoObstetrico;
    });
  };

  const onClickSave = async () => {
    setLoading(true);

    if (editing) {
      try {
        const document = handleDocument(
          historico,
          historicoFamiliar,
          historicoObstetrico,
          gestationId,
          historicoGetById.id
        );
        setLoading(false);
        let historicoIdObjeto = {
          id: historicoId,
        };
        const data = { ...document, ...historicoIdObjeto };
        const response = await healthProblemsHttp.editHistoryCarterinha(data);
        if (response.success) {
          setModalOpen(true);
          toast.success({
            title: "Sucesso",
            message: "Histórico editado com sucesso",
          });
        }
      } catch (error) {
        toast.error({
          title: "Error",
          message: "Erro ao editar histórico",
        });
      }
      return;
    }

    try {
      const document = handleDocument(
        historico,
        historicoFamiliar,
        historicoObstetrico,
        gestationId,
        carteirinhaId
      );
      setLoading(false);

      const response = await healthProblemsHttp.createHistoryCarterinha(
        document
      );
      if (response.success) {
        setModalOpen(true);
        toast.success({
          title: "Sucesso",
          message: "Histórico editado com sucesso",
        });
      }
    } catch (error) {
      toast.error({
        title: "Error",
        message: "Erro ao salvar histórico",
      });
      console.log("error", error);
    }
  };
  const onClickCancelar = () => {
    goBack();
  };

  const updateStateWithResponse = (
    prevState: any,
    response: any,
    enumType: any
  ) => {
    const newState = [...prevState];

    Object.keys(response).forEach((key) => {
      newState.forEach((subarray) => {
        subarray.forEach((item: any) => {
          if (item.name === enumType[key]) {
            const enumKey = key as keyof typeof enumType;
            item.checked = response[enumKey];
          }
        });
      });
    });

    return newState;
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await healthProblemsHttp.historyByPacientId(
        gestationId || ""
      );
      if (response) {
        setEditing(true);
        setHistoricoGetById(response);
        setOthersHistoryPersonal(response.historicoOutrosPessoal);
        setOthersHistoryFamilyFamily(response.historicoOutrosFamiliar);
        setOthersHistoryObstetrico(response.historicoOutrosObstetrico);
        setHistorico((prevState) =>
          updateStateWithResponse(prevState, response, historicoEnum)
        );
        setHistoricoFamiliar((prevState) =>
          updateStateWithResponse(prevState, response, historicoEnum)
        );
        setHistoricoObstetrico((prevState) =>
          updateStateWithResponse(prevState, response, historicoEnum)
        );
      }
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [patient]);

  const cleanAll = () => {
    setHistorico([[], []]);
    setHistoricoFamiliar([[], []]);
    setHistoricoObstetrico([[], []]);
    setOthersHistoryPersonal(undefined);
    setOthersHistoryFamilyFamily(undefined);
    setOthersHistoryObstetrico(undefined);
  };

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
                  onClick={() => {
                    goBack(), cleanAll();
                  }}
                  style={{
                    color: "#1A535C",
                  }}
                />
              </div>
              <span className={styles.text}>Voltar</span>
            </div>
            <div className={styles.containerMid}>
              <img src={Calendar} className={styles.imageContainer} />
              <div className={styles.containerText}>
                <span className={styles.title}>Históricos</span>
                <span className={styles.subTitle}>Preenchido</span>
                <span className={styles.desc}>
                  {" "}
                  {carteirinha?.dataUltimaAtividadeHistoricos}
                </span>
              </div>
            </div>
          </div>
          <HistoricoPessoal
            patient={patient}
            gestationId={gestationId}
            historicoId={historicoId}
            historico={historico}
            othersHistoryPersonal={othersHistoryPersonal}
            toggleCheckedByName={toggleCheckedByName}
          />
          <HistoricoFamilha
            patient={patient}
            gestationId={gestationId}
            historicoId={historicoId}
            historicoFamiliar={historicoFamiliar}
            othersHistoryFamily={othersHistoryFamily}
            toggleCheckedByNameFamiliar={toggleCheckedByNameFamiliar}
          />
          <div className={styles.spacerHeader} />
          <HistoricoObstetrico
            patient={patient}
            gestationId={gestationId}
            historicoId={historicoId}
            historicoObstetrico={historicoObstetrico}
            othersHistoryObstetrico={othersHistoryObstetrico}
            toggleCheckedByNameObstetrico={toggleCheckedByNameObstetrico}
          />
          <span className={styles.titleSection}>Finalizar</span>
          <div className={styles.line} />
          <div className={styles.spacer} />
          <Card
            header={{ title: "", rightContent: null }}
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
          <SaveModalCarteirinha
            patientName={patient?.nome}
            gestationId={patient?.nome ?? ""}
            open={modalOpen}
            onAdd={() => {}}
            onClose={() => {
              setModalOpen(false);
              goBack();
            }}
            title={"Histórico salvo com com sucesso!"}
            buttonText={null}
            buttonTextCancel={"SAIR"}
          />
        </>
      )}
    </div>
  );
}

export default HistoricoScreen;

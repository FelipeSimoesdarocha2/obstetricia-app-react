import React, { ReactElement, useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import patientsService from "../../../../@core/@http/patient/patient";
import pregnantHealthProblems from "../../../../@core/@http/pregnantHealthProblems/pregnantHealthProblems";
import Card from "../../../../components/card/Card";
import GeneralInfos, {
  IPatientGeneralInfos,
} from "./@components/GeneralInfos/GeneralInfos";
import MainInfos, {
  IPatientMainInfos,
} from "./@components/MainInfos/MainInfos";
import IgDppInfos, {
  IPatientIgDppInfos,
} from "./@components/IgDppInfos/IgDppInfos";
import NavButtons, {
  INavButton,
} from "../../../../components/nav-buttons/NavButtons";
import PatientProblems from "./@components/Problems/PatientProblems";
import PatientWeightGraphInfos from "./@components/GraphInfos/PatientWeightGraphInfos";
import dateHelper from "../../../../@core/helpers/date";
import PatientHeatmap from "./@components/Heatmap/PatientHeatmap";
import ChangeMonth from "../../../../components/change-month/ChangeMonth";
import PatientFetalMovementGraphInfos from "./@components/GraphInfos/PatientFetalMovementGraphInfos";
import PatientGlicemiaGraphInfos from "./@components/GraphInfos/PatientGlicemiaGraphInfos";
import PatientGlicemiaJejumGraphInfos from "./@components/GraphInfos/PatientGlicemiaJejumGraphInfos";
import PatientBloodPressureGraphInfos from "./@components/GraphInfos/PatientBloodPressureGraphInfos";
import PatientHumorGraphInfos from "./@components/GraphInfos/PatientHumorGraphInfos";
import PatientSearchBox from "../@components/Form/@components/PatientSearchBox";
import styles from "./PatientDetails.module.scss";

import {
  IPatientDetails,
  IPatientHeatmap,
} from "../../../../@core/models/patient";
import { useToast } from "../../../../providers/ToastProvider/ToastProvider";
import PatientHour22GraphInfos from "./@components/GraphInfos/PatientHour22GraphInfos";
import PatientGlicemiaPosCafeGraphInfos from "./@components/GraphInfos/PatientGlicemiaPosCafeGraphInfos";
import PatientGlicemiaPreAlmocoGraphInfos from "./@components/GraphInfos/PatientGlicemiaPreAlmocoGraphInfos";
import PatientGlicemiaPreJantaGraphInfos from "./@components/GraphInfos/PatientGlicemiaPreJantaGraphInfos";
import PatientGlicemiaPosJantaGraphInfos from "./@components/GraphInfos/PatientGlicemiaPosJantaGraphInfos";
import CardCarterinha from "components/cardCarterinha/CardCartetinha";
import carteirinhaProblems, {
  ResponseCarteirinha,
} from "@core/@http/carteirinha/carteirinhaProblems";

interface IPatientDetailsProps {
  id: string;
  gestationId: string;
}

enum NavButtonsType {
  Peso = 1,
  BloodPressure = 2,
  MovFetal = 3,
  Humor = 4,
}

enum NavButtonsGlicemiaType {
  Glicemia = 1,
  GlicemiaJejum = 2,
  PostCoffee = 3,
  PreLunch = 4,
  PreDinner = 5,
  PostDinner = 6,
  Hour22 = 7,
}

const getInfosPatientGraphElement = (
  type: NavButtonsType,
  isLoading: boolean,
  patient: IPatientDetails | null | undefined
): ReactElement | undefined => {
  switch (type) {
    case NavButtonsType.Peso:
      return (
        <PatientWeightGraphInfos
          isLoading={isLoading}
          allWeigthData={patient?.variacoesPeso?.allWeigthData ?? []}
          lastMonthWeigthData={
            patient?.variacoesPeso?.lastMonthWeigthData ?? []
          }
          lastWeekWeigthData={patient?.variacoesPeso?.lastWeekWeigthData ?? []}
        />
      );
    case NavButtonsType.MovFetal:
      return (
        <PatientFetalMovementGraphInfos
          isLoading={isLoading}
          allFetalMovementData={
            patient?.variacoesMovFetal?.allMovFetalData ?? []
          }
          lastMonthFetalMovementData={
            patient?.variacoesMovFetal?.lastMonthMovFetalData ?? []
          }
          lastWeekFetalMovementData={
            patient?.variacoesMovFetal?.lastWeekMovFetalData ?? []
          }
        />
      );
    case NavButtonsType.BloodPressure:
      return (
        <PatientBloodPressureGraphInfos
          isLoading={isLoading}
          allBloodPressureData={
            patient?.variacoesBloodPressure.allBloodPressureData ?? []
          }
          lastMonthBloodPressureData={
            patient?.variacoesBloodPressure?.lastMonthBloodPressureData ?? []
          }
          lastWeekBloodPressureData={
            patient?.variacoesBloodPressure?.lastWeekBloodPressureData ?? []
          }
        />
      );
    case NavButtonsType.Humor:
      return (
        <PatientHumorGraphInfos
          isLoading={isLoading}
          allHumorData={patient?.variacoesHumor?.allHumorData ?? []}
          lastMonthHumorData={patient?.variacoesHumor?.lastMonthHumorData ?? []}
          lastWeekHumorData={patient?.variacoesHumor?.lastWeekHumorData ?? []}
        />
      );
    default:
      return undefined;
  }
};

const getInfosPatientGraphGlicemiaElement = (
  type: NavButtonsGlicemiaType,
  isLoading: boolean,
  patient: IPatientDetails | null | undefined
): ReactElement | undefined => {
  switch (type) {
    case NavButtonsGlicemiaType.Hour22:
      return (
        <PatientHour22GraphInfos
          isLoading={isLoading}
          allHour22Data={
            patient?.variacoesGlicemia22Horas?.allGlucoseHour22Data ?? []
          }
          lastMonthHour22Data={
            patient?.variacoesGlicemia22Horas?.lastMonthGlucoseHour22Data ?? []
          }
          lastWeekHour22Data={
            patient?.variacoesGlicemia22Horas?.lastWeekGlucoseHour22Data ?? []
          }
        />
      );

    case NavButtonsGlicemiaType.Glicemia:
      return (
        <PatientGlicemiaGraphInfos
          isLoading={isLoading}
          allGlucosePostPrandialData={
            patient?.variacoesGlicemia?.allGlucosePostPrandialData ?? []
          }
          lastMonthGlucosePostPrandialData={
            patient?.variacoesGlicemia?.lastMonthGlucosePostPrandialData ?? []
          }
          lastWeekGlucosePostPrandialData={
            patient?.variacoesGlicemia?.lastWeekGlucosePostPrandialData ?? []
          }
        />
      );
    case NavButtonsGlicemiaType.GlicemiaJejum:
      return (
        <PatientGlicemiaJejumGraphInfos
          isLoading={isLoading}
          allGlucoseFastingData={
            patient?.variacoesGlicemiaJejum?.allGlucoseFastingData ?? []
          }
          lastMonthGlucoseFastingData={
            patient?.variacoesGlicemiaJejum?.lastMonthGlucoseFastingData ?? []
          }
          lastWeekGlucoseFastingData={
            patient?.variacoesGlicemiaJejum?.lastWeekGlucoseFastingData ?? []
          }
        />
      );
    case NavButtonsGlicemiaType.PostCoffee:
      return (
        <PatientGlicemiaPosCafeGraphInfos
          isLoading={isLoading}
          allGlucoseFastingData={
            patient?.variacoesGlicemiaPosCafe?.allGlucosePostCoffeData ?? []
          }
          lastMonthGlucoseFastingData={
            patient?.variacoesGlicemiaPosCafe?.allGlucosePostCoffeData ?? []
          }
          lastWeekGlucoseFastingData={
            patient?.variacoesGlicemiaPosCafe?.allGlucosePostCoffeData ?? []
          }
        />
      );
    case NavButtonsGlicemiaType.PreLunch:
      return (
        <PatientGlicemiaPreAlmocoGraphInfos
          isLoading={isLoading}
          allGlucoseFastingData={
            patient?.variacoesGlicemiaPreAlmoco?.allGlucosePreLunchData ?? []
          }
          lastMonthGlucoseFastingData={
            patient?.variacoesGlicemiaPreAlmoco?.lastMonthGlucosePreLunchData ??
            []
          }
          lastWeekGlucoseFastingData={
            patient?.variacoesGlicemiaPreAlmoco?.lastWeekGlucosePreLunchData ??
            []
          }
        />
      );
    case NavButtonsGlicemiaType.PreDinner:
      return (
        <PatientGlicemiaPreJantaGraphInfos
          isLoading={isLoading}
          allGlucoseFastingData={
            patient?.variacoesGlicemiaPreJanta?.allGlucosePreDinnerData ?? []
          }
          lastMonthGlucoseFastingData={
            patient?.variacoesGlicemiaPreJanta?.lastMonthGlucosePreDinnerData ??
            []
          }
          lastWeekGlucoseFastingData={
            patient?.variacoesGlicemiaPreJanta?.lastWeekGlucosePreDinnerData ??
            []
          }
        />
      );
    case NavButtonsGlicemiaType.PostDinner:
      return (
        <PatientGlicemiaPosJantaGraphInfos
          isLoading={isLoading}
          allGlucoseFastingData={
            patient?.variacoesGlicemiaPosJanta?.allGlucosePostDinnerData ?? []
          }
          lastMonthGlucoseFastingData={
            patient?.variacoesGlicemiaPosJanta
              ?.lastMonthGlucosePostDinnerData ?? []
          }
          lastWeekGlucoseFastingData={
            patient?.variacoesGlicemiaPosJanta?.lastWeekGlucosePostDinnerData ??
            []
          }
        />
      );

    default:
      return undefined;
  }
};

function PatientDetails(props: IPatientDetailsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<IPatientDetails | null>();
  const [heatmap, setHeatmap] = useState<IPatientHeatmap | null>();
  const [selectedMonth, setSelectedMonth] = useState(dateHelper.currentMonth());
  const [selectedYear, setSelectedYear] = useState(dateHelper.currentYear());
  const [carteirinha, setCarteirinha] = useState<ResponseCarteirinha>();

  const [infosPatientGraphElement, setInfosPatientGraphElement] =
    useState<ReactElement>();
  const [
    infosPatientGraphGlicemiaElement,
    setInfosPatientGraphGlicemiaElement,
  ] = useState<ReactElement>();

  const { id, gestationId } = props;

  const [editProblems, setEditProblems] = useState(false);
  const { toast } = useToast();
  const [monitoramentos, setMonitoramentos] = useState(true);
  const [carterinha, setCarterinha] = useState(false);
  const [consulta, setConsulta] = useState(false);
  const [exames, setExames] = useState(false);
  const [historico, setHistorico] = useState(false);
  const [vacinas, setVacinas] = useState(false);
  const [examesImagem, setExamesImagem] = useState(false);
  const fetchPatient = () => {
    patientsService
      .getById(id, gestationId)
      .then((response) => {
        setPatient(response);
        setInfosPatientGraphElement(
          getInfosPatientGraphElement(NavButtonsType.Peso, isLoading, response)
        );
        setInfosPatientGraphGlicemiaElement(
          getInfosPatientGraphGlicemiaElement(
            NavButtonsGlicemiaType.Hour22,
            isLoading,
            response
          )
        );
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  };

  const getPatient = () => {
    setIsLoading(true);

    fetchPatient();
  };

  const getHeatmap = (month: number, year: number) => {
    patientsService
      .getHeatmap(gestationId, { month, year })
      .then((response) => {
        setHeatmap(response);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  };

  const toggleEditProblems = () => setEditProblems(!editProblems);

  const handleAddProblems = async (data: any) => {
    try {
      await pregnantHealthProblems.linkProblem(gestationId, data.id);

      toast.success({
        title: "Obstcare",
        message: "Problema de saúde adicionado com sucesso!",
      });

      fetchPatient();
    } catch (error: any) {
      toast.error({
        title: "Erro!",
        message: error.response?.data || error.message,
      });
    }
  };

  const handleRemoveProblems = async (data: any) => {
    try {
      await pregnantHealthProblems.unlinkProblem(data.id);

      toast.success({
        title: "Obstcare",
        message: "Problema de saúde excluído com sucesso!",
      });

      fetchPatient();
    } catch (error: any) {
      toast.error({
        title: "Erro!",
        message: error.response?.data || error.message,
      });
    }
  };

  useEffect(() => {
    getPatient();
    getHeatmap(selectedMonth, selectedYear);
  }, [id]);

  const onChangeMonthHeatmap = (month: number) => {
    setSelectedMonth(month);
    getHeatmap(month, selectedYear);
  };

  const onChangeYearHeatmap = (year: number) => {
    setSelectedYear(year);
    getHeatmap(selectedMonth, year);
  };

  const onClickGraphNavButtons = (button: INavButton) => {
    setInfosPatientGraphElement(
      getInfosPatientGraphElement(button.type, isLoading, patient)
    );
  };

  const onClickGraphNavButtonsGlicemia = (button: INavButton) => {
    setInfosPatientGraphGlicemiaElement(
      getInfosPatientGraphGlicemiaElement(button.type, isLoading, patient)
    );
  };

  const fetchHistory = async () => {
    try {
      const response = await carteirinhaProblems.getAllCarteirinha(gestationId);
      setCarteirinha(response);
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const setAllTabsFalse = () => {
    setConsulta(false);
    setExames(false);
    setHistorico(false);
    setVacinas(false);
    setExamesImagem(false);
  };

  const onChangeCarteirinha = (state: boolean) => {
    setCarterinha(state);
  };
  const patientCard = {
    title: "",
    rightContent: null,
    body: (
      <GeneralInfos
        isLoading={isLoading}
        generalInfos={patient as IPatientGeneralInfos}
        gestationId={gestationId}
        monitoramentos={monitoramentos}
        setMonitoramentos={setMonitoramentos}
        carterinha={carterinha}
        carteirinhaId={carteirinha?.id}
        setCarterinha={onChangeCarteirinha}
        setAllTabsFalse={setAllTabsFalse}
        id={id}
      />
    ),
  };

  const mainInfosCard = {
    title: "Informações Principais",
    rightContent: null,
    body: (
      <MainInfos
        isLoading={isLoading}
        patientMainInfos={patient as IPatientMainInfos}
      />
    ),
  };

  const calcDumEcoCard = {
    title: "IG E DPP",
    rightContent: null,
    body: (
      <IgDppInfos
        isLoading={isLoading}
        patientIgDppInfos={patient as IPatientIgDppInfos}
      />
    ),
  };

  const problemsCard = {
    title: "Problemas",
    rightContent: !patient?.finished ? (
      <IconButton className={styles.iconButton} onClick={toggleEditProblems}>
        {editProblems ? <CloseIcon /> : <EditIcon />}
      </IconButton>
    ) : null,
    body: editProblems ? (
      <PatientSearchBox
        values={patient?.problemas ?? []}
        onSelectItem={handleAddProblems}
        onRemoveItem={handleRemoveProblems}
      />
    ) : (
      <PatientProblems
        problems={patient?.problemas ?? []}
        isLoading={isLoading}
      />
    ),
  };

  const mainInfosGraphCardGlicemia = {
    title: "Informações Principais Glicemia",
    rightContent: (
      <NavButtons
        buttons={[
          {
            name: "Glicemia Pós Almoço",
            type: NavButtonsGlicemiaType.Glicemia,
          },
          {
            name: "Glicemia Jejum",
            type: NavButtonsGlicemiaType.GlicemiaJejum,
          },
          {
            name: "Glicemia Pós café",
            type: NavButtonsGlicemiaType.PostCoffee,
          },
          {
            name: "Glicemia Pré Almoço",
            type: NavButtonsGlicemiaType.PreLunch,
          },
          {
            name: "Glicemia Pré Janta",
            type: NavButtonsGlicemiaType.PreDinner,
          },
          {
            name: "Glicemia Pós Janta",
            type: NavButtonsGlicemiaType.PostDinner,
          },
          {
            name: "Glicemia 22h",
            type: NavButtonsGlicemiaType.Hour22,
          },
        ]}
        onClickButton={onClickGraphNavButtonsGlicemia}
      />
    ),
    body: infosPatientGraphGlicemiaElement,
  };

  const mainInfosGraphCard = {
    title: "Informações Principais",
    rightContent: (
      <NavButtons
        buttons={[
          {
            name: "Peso",
            active: true,
            type: NavButtonsType.Peso,
          },
          {
            name: "Pressão Arterial",
            type: NavButtonsType.BloodPressure,
          },
          {
            name: "Mov. Fetal",
            type: NavButtonsType.MovFetal,
          },
          {
            name: "Humor",
            type: NavButtonsType.Humor,
          },
        ]}
        onClickButton={onClickGraphNavButtons}
      />
    ),
    body: infosPatientGraphElement,
  };

  const heatmapCard = {
    title: "diário de sintomas",
    rightContent: (
      <ChangeMonth
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onChangeMonth={onChangeMonthHeatmap}
        onChangeYear={onChangeYearHeatmap}
      />
    ),
    body: (
      <PatientHeatmap
        isLoading={isLoading}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        colicaHeatmap={heatmap?.colicaHeatmap ?? []}
        dorCabecaHeatmap={heatmap?.dorCabecaHeatmap ?? []}
        nauseaHeatmap={heatmap?.nauseaHeatmap ?? []}
        tonturaHeatmap={heatmap?.tonturaHeatmap ?? []}
        vomitoHeatmap={heatmap?.vomitoHeatmap ?? []}
      />
    ),
  };

  return (
    <div className={`${styles.container} ${styles.gridTemplateAreas}`}>
      <div className={styles.patientDetailsCard}>
        <Card
          header={patientCard}
          body={patientCard.body}
          key="patient-details-card"
        />
      </div>
      {monitoramentos && (
        <>
          <div className={styles.mainInfosCard}>
            <Card
              header={mainInfosCard}
              body={mainInfosCard.body}
              key="main-infos-card"
            />
          </div>

          <div className={styles.dumEcoCard}>
            <Card
              header={calcDumEcoCard}
              body={calcDumEcoCard.body}
              key="calc-dum-eco-card"
            />
          </div>

          <div className={styles.problemsCard}>
            <Card
              header={problemsCard}
              body={problemsCard.body}
              key="problems-card"
            />
          </div>

          <div className={styles.mainInfosGraphCard}>
            <Card
              header={mainInfosGraphCard}
              body={mainInfosGraphCard.body}
              bodyHeight={300}
              key="main-infos-graph-card"
            />
          </div>

          <div className={styles.mainInfosGraphCard2}>
            <Card
              header={mainInfosGraphCardGlicemia}
              body={mainInfosGraphCardGlicemia.body}
              bodyHeight={300}
              key="main-infos-graph-card-glicemia"
            />
          </div>

          <div className={styles.heatmapCard}>
            <Card
              header={heatmapCard}
              body={heatmapCard.body}
              key="heatmap-graph-card"
            />
          </div>
        </>
      )}
      {carterinha && (
        <>
          <div className={styles.carterinha}>
            <CardCarterinha
              isLoading={isLoading}
              carteirinha={carteirinha}
              patient={patient}
              gestationId={gestationId}
              consulta={consulta}
              setConsulta={setConsulta}
              exames={exames}
              setExames={setExames}
              historico={historico}
              setHistorico={setHistorico}
              vacinas={vacinas}
              setVacinas={setVacinas}
              examesImagem={examesImagem}
              setExamesImagem={setExamesImagem}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PatientDetails;

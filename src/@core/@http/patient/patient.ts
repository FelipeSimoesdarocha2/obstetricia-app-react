/* eslint-disable no-unneeded-ternary */
import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import { LocalStorage } from "../../helpers/localStorage";
import {
  IPatient,
  IPatientDetails,
  IPatientForm,
  IPatientHeatmap,
} from "../../models/patient";
import {
  IPatientRequest,
  IPatientEndServiceRequest,
} from "../models/requests/patient";
import {
  IPatientDetailsGraphAverageResponse,
  IPatientDetailsGraphBloodPressureResponse,
  IPatientDetailsResponse,
  IPatientHeatmapResponse,
  IPatientListResponse,
} from "../models/responses/patient";
import { orderAsc } from "../../helpers/array";
import dateHelper from "../../helpers/date";

export interface IPatientSearch {
  nome: string;
  page: number;
  finished: boolean;
}

export interface IPatientsResponse {
  totalPages: number;
  results: IPatient[];
}

async function getPatients(search: IPatientSearch): Promise<IPatientsResponse> {
  const limit = 10;
  const doctorId = localStorage.getItem(LocalStorage.DoctorId);
  const page = `?page=${search.page}&pagesize=${limit}`;
  const searchName = search.nome ? `&pacientName=${search.nome}` : "";
  const finished = `&finished=${search.finished}`;

  const result = await getAxios().get<IPatientListResponse>(
    `${process.env.REACT_APP_API_URL}/doctors/${doctorId}/pacients${page}${searchName}${finished}`
  );

  const totalPages =
    (result.data.lastPages?.length ?? 0) +
    (result.data.nextPages?.length ?? 0) +
    1;

  return {
    totalPages,
    results:
      result.data.items?.map((patient) => ({
        id: patient.pacientId,
        imageUrl: patient.profilePictureUrl,
        internada: patient.hospitalized,
        nome: patient.fullName,
        procedencia: patient.provenance,
        risco: patient.risk,
        gestationId: patient.gestationId,
        proximaConsulta:
          patient.nextAppointment != null
            ? new Date(patient.nextAppointment)
            : undefined,
        dataProvavel: new Date(
          patient.probablyDateDum || patient.probablyDateFirsEco
        ),
      })) || [],
  };
}

interface IPatientGetByIdProps {
  month: number;
  year: number;
}

async function getHeatmap(
  gestationId: string,
  props: IPatientGetByIdProps
): Promise<IPatientHeatmap> {
  const queryParams = new URLSearchParams();

  queryParams.set("month", (props.month + 1).toString());
  queryParams.set("year", props.year.toString());

  const heatmap = (
    await getAxios().get<IPatientHeatmapResponse>(
      `${
        process.env.REACT_APP_API_URL
      }/gestation/heatmap/${gestationId}?${queryParams.toString()}`
    )
  ).data;

  return {
    colicaHeatmap: heatmap?.colicaHeatmap?.map((c) => c.day) || [],
    dorCabecaHeatmap: heatmap?.dorCabecaHeatmap?.map((d) => d.day) || [],
    nauseaHeatmap: heatmap?.nauseaHeatmap?.map((n) => n.day) || [],
    tonturaHeatmap: heatmap?.tonturaHeatmap?.map((t) => t.day) || [],
    vomitoHeatmap: heatmap?.vomitoHeatmap?.map((v) => v.day) || [],
  };
}

// DESSA TELA
// Graficos
// Modais
async function getById(
  id: string,
  gestationId: string
): Promise<IPatientDetails> {
  const patient = (
    await getAxios().get<IPatientDetailsResponse>(
      `${process.env.REACT_APP_API_URL}/pacients/${id}/gestation/${gestationId}/details`
    )
  ).data;

  console.log(3333, patient);

  const mapWeigth = (weigth: IPatientDetailsGraphAverageResponse) => ({
    mesAno: `${new Date(weigth.date).getDate()}
    ${dateHelper.monthNames[new Date(weigth.date).getMonth()]} ${new Date(
      weigth.date
    ).getFullYear()}`,
    peso: weigth.average,
  });

  const mapGlicemiaJejum = (
    glicemiaJejum: IPatientDetailsGraphAverageResponse
  ) => ({
    mesAno: `${new Date(glicemiaJejum.date).getDate()}
    ${
      dateHelper.monthNames[new Date(glicemiaJejum.date).getMonth()]
    } ${new Date(glicemiaJejum.date).getFullYear()}`,
    glicemiaJejum: glicemiaJejum.average,
  });

  const mapGlicemia = (glicemia: IPatientDetailsGraphAverageResponse) => ({
    mesAno: `${new Date(glicemia.date).getDate()}
    ${dateHelper.monthNames[new Date(glicemia.date).getMonth()]} ${new Date(
      glicemia.date
    ).getFullYear()}`,
    glicemia: glicemia.average,
  });

  const mapGlicemiaPosCafe = (
    glicemiaPosCafe: IPatientDetailsGraphAverageResponse
  ) => ({
    mesAno: `${new Date(glicemiaPosCafe.date).getDate()}
    ${
      dateHelper.monthNames[new Date(glicemiaPosCafe.date).getMonth()]
    } ${new Date(glicemiaPosCafe.date).getFullYear()}`,
    glicemiaPosCafe: glicemiaPosCafe.average,
  });

  const mapGlicemiaPreAlmoco = (
    glicemiaPreAlmoco: IPatientDetailsGraphAverageResponse
  ) => ({
    mesAno: `${new Date(glicemiaPreAlmoco.date).getDate()}
    ${
      dateHelper.monthNames[new Date(glicemiaPreAlmoco.date).getMonth()]
    } ${new Date(glicemiaPreAlmoco.date).getFullYear()}`,
    glicemiaPreAlmoco: glicemiaPreAlmoco.average,
  });

  const mapGlicemiaPreJanta = (
    glicemiaPreJanta: IPatientDetailsGraphAverageResponse
  ) => ({
    mesAno: `${new Date(glicemiaPreJanta.date).getDate()}
    ${
      dateHelper.monthNames[new Date(glicemiaPreJanta.date).getMonth()]
    } ${new Date(glicemiaPreJanta.date).getFullYear()}`,
    glicemiaPreJanta: glicemiaPreJanta.average,
  });

  const mapGlicemiaPosJanta = (
    glicemiaPosJanta: IPatientDetailsGraphAverageResponse
  ) => ({
    mesAno: `${new Date(glicemiaPosJanta.date).getDate()}
    ${
      dateHelper.monthNames[new Date(glicemiaPosJanta.date).getMonth()]
    } ${new Date(glicemiaPosJanta.date).getFullYear()}`,
    glicemiaPosJanta: glicemiaPosJanta.average,
  });

  const mapGlicemia22Horas = (
    glicemia22Horas: IPatientDetailsGraphAverageResponse
  ) => ({
    mesAno: `${new Date(glicemia22Horas.date).getDate()}
    ${
      dateHelper.monthNames[new Date(glicemia22Horas.date).getMonth()]
    } ${new Date(glicemia22Horas.date).getFullYear()}`,
    glicemia22Horas: glicemia22Horas.average,
  });

  const mapMovFetal = (weigth: IPatientDetailsGraphAverageResponse) => ({
    mesAno: `${new Date(weigth.date).getDate()}
    ${dateHelper.monthNames[new Date(weigth.date).getMonth()]} ${new Date(
      weigth.date
    ).getFullYear()}`,
    quantidade: weigth.average,
  });

  const mapBloodPressure = (
    bloodPressure: IPatientDetailsGraphBloodPressureResponse
  ) => ({
    mesAno: `${new Date(bloodPressure.date).getDate()}
    ${
      dateHelper.monthNames[new Date(bloodPressure.date).getMonth()]
    } ${new Date(bloodPressure.date).getFullYear()}`,
    hiastolicMmoll: bloodPressure.hiastolicMmoll,
    systolicMmhg: bloodPressure.systolicMmhg,
  });

  const mapHumor = (humor: IPatientDetailsGraphAverageResponse) => ({
    mesAno: `${new Date(humor.date).getDate()}
    ${dateHelper.monthNames[new Date(humor.date).getMonth()]} ${new Date(
      humor.date
    ).getFullYear()}`,
    humor: humor.average,
  });

  const getDate = (date: any) => (date ? new Date(date) : undefined);

  const getSemanasDias = (semanas: string | number, dias: string | number) => {
    if (semanas && dias) {
      return `${semanas} Semanas - ${dias} Dias`;
    }

    return "Não informado";
  };
  return {
    convenio: patient.mainInfo.healthInsurance,
    carteirinhaId: patient.carteirinhaId,
    email: patient.pacientInfo.email,
    finished: patient.pacientInfo.finished,
    peso: patient.pacientInfo.weigthInfo.weigth,
    glicemiaJejum: patient.pacientInfo.glucose.postPrandialFasting,
    glicemia24horasApos: patient.pacientInfo.glucose.fast,
    pressaoArterialContraida: patient.pacientInfo.bloodPressure?.systolicMmhg,
    pressaoArterialRelaxada: patient.pacientInfo.bloodPressure?.hiastolicMmoll,
    totalConsultas: patient.mainInfo.appointmentQuantity,
    prontuario: patient.mainInfo.medicalRecord,
    risco: patient.mainInfo.risk > 0 ? "Alto" : "Baixo",
    procedencia: patient.mainInfo.provenance,
    internada: patient.mainInfo.hospitalized ? "Sim" : "Não",
    igDum: getSemanasDias(
      patient.gestationalAgeInfo.igdumWeeks,
      patient.gestationalAgeInfo.igdumDays
    ),
    igEco: getSemanasDias(
      patient.gestationalAgeInfo.igecoWeeks,
      patient.gestationalAgeInfo.igecoDays
    ),
    imageUrl: patient.pacientInfo.profileImageUrl,
    nome: patient.pacientInfo.fullName,
    phone: patient.pacientInfo.phone,
    problemas: patient.pregnantProblems.map(({ id, description }) => ({
      id,
      name: description,
    })),
    proximaConsulta: getDate(patient.mainInfo.nextAppointment),
    ultimaConsulta: getDate(patient.mainInfo.lastAppointment),
    dum: getDate(patient.gestationalAgeInfo.lastMenstruateDate),
    dppDum: getDate(patient.gestationalAgeInfo.dppdum),
    primeiraEco: getDate(patient.gestationalAgeInfo.firstECO),
    dppEco: getDate(patient.gestationalAgeInfo.dppeco),
    averageNotes: patient.averageNotes,

    variacoesPeso: {
      allWeigthData: orderAsc(
        patient.graphs.weightDataPeriods.allWeigthData
      ).map(mapWeigth),
      lastMonthWeigthData: orderAsc(
        patient.graphs.weightDataPeriods.lastMonthWeigthData
      ).map(mapWeigth),
      lastWeekWeigthData: orderAsc(
        patient.graphs.weightDataPeriods.lastWeekWeigthData
      ).map(mapWeigth),
    },

    variacoesMovFetal: {
      allMovFetalData: orderAsc(
        patient.graphs.fetalMovimentsDataPeriods.allFetalMovimentsData
      ).map(mapMovFetal),
      lastMonthMovFetalData: orderAsc(
        patient.graphs.fetalMovimentsDataPeriods.lastMonthFetalMovimentsData
      ).map(mapMovFetal),
      lastWeekMovFetalData: orderAsc(
        patient.graphs.fetalMovimentsDataPeriods.lastWeekFetalMovimentsData
      ).map(mapMovFetal),
    },

    variacoesBloodPressure: {
      allBloodPressureData: orderAsc(
        patient.graphs.bloodPressureDataPeriods.allBloodPressureData
      ).map(mapBloodPressure),
      lastMonthBloodPressureData: orderAsc(
        patient.graphs.bloodPressureDataPeriods.lastMonthBloodPressureData
      ).map(mapBloodPressure),
      lastWeekBloodPressureData: orderAsc(
        patient.graphs.bloodPressureDataPeriods.lastWeekBloodPressureData
      ).map(mapBloodPressure),
    },

    variacoesHumor: {
      allHumorData: orderAsc(
        patient.graphs.humorDataPeriods?.allHumorData || []
      ).map(mapHumor),
      lastMonthHumorData: orderAsc(
        patient.graphs.humorDataPeriods?.lastMonthHumorData || []
      ).map(mapHumor),
      lastWeekHumorData: orderAsc(
        patient.graphs.humorDataPeriods?.lastWeekHumorData || []
      ).map(mapHumor),
    },

    variacoesGlicemia: {
      allGlucosePostPrandialData: orderAsc(
        patient.graphs.glucosePostPrandialDataPeriods.allGlucosePostPrandialData
      ).map(mapGlicemia),
      lastMonthGlucosePostPrandialData: orderAsc(
        patient.graphs.glucosePostPrandialDataPeriods
          .lastMonthGlucosePostPrandialData
      ).map(mapGlicemia),
      lastWeekGlucosePostPrandialData: orderAsc(
        patient.graphs.glucosePostPrandialDataPeriods
          .lastWeekGlucosePostPrandialData
      ).map(mapGlicemia),
    },
    variacoesGlicemiaJejum: {
      allGlucoseFastingData: orderAsc(
        patient.graphs.glucoseFastingDataPeriods.allGlucoseFastingData
      ).map(mapGlicemiaJejum),
      lastMonthGlucoseFastingData: orderAsc(
        patient.graphs.glucoseFastingDataPeriods.lastMonthGlucoseFastingData
      ).map(mapGlicemiaJejum),
      lastWeekGlucoseFastingData: orderAsc(
        patient.graphs.glucoseFastingDataPeriods.lastWeekGlucoseFastingData
      ).map(mapGlicemiaJejum),
    },

    variacoesGlicemiaPosCafe: {
      allGlucosePostCoffeData: orderAsc(
        patient.graphs.glucosePostCoffeDataPeriods.allGlucosePostCoffeData
      ).map(mapGlicemiaPosCafe),
      lastMonthGlucosePostCoffeData: orderAsc(
        patient.graphs.glucosePostCoffeDataPeriods.lastMonthGlucosePostCoffeData
      ).map(mapGlicemiaPosCafe),
      lastWeekGlucosePostCoffeData: orderAsc(
        patient.graphs.glucosePostCoffeDataPeriods.lastWeekGlucosePostCoffeData
      ).map(mapGlicemiaPosCafe),
    },

    variacoesGlicemiaPreAlmoco: {
      allGlucosePreLunchData: orderAsc(
        patient.graphs.glucosePreLunchDataPeriods.allGlucosePreLunchData
      ).map(mapGlicemiaPreAlmoco),
      lastMonthGlucosePreLunchData: orderAsc(
        patient.graphs.glucosePreLunchDataPeriods.lastMonthGlucosePreLunchData
      ).map(mapGlicemiaPreAlmoco),
      lastWeekGlucosePreLunchData: orderAsc(
        patient.graphs.glucosePreLunchDataPeriods.lastWeekGlucosePreLunchData
      ).map(mapGlicemiaPreAlmoco),
    },

    variacoesGlicemiaPreJanta: {
      allGlucosePreDinnerData: orderAsc(
        patient.graphs.glucosePreDinnerDataPeriods.allGlucosePreDinnerData
      ).map(mapGlicemiaPreJanta),
      lastMonthGlucosePreDinnerData: orderAsc(
        patient.graphs.glucosePreDinnerDataPeriods.lastMonthGlucosePreDinnerData
      ).map(mapGlicemiaPreJanta),
      lastWeekGlucosePreDinnerData: orderAsc(
        patient.graphs.glucosePreDinnerDataPeriods.lastWeekGlucosePreDinnerData
      ).map(mapGlicemiaPreJanta),
    },

    variacoesGlicemiaPosJanta: {
      allGlucosePostDinnerData: orderAsc(
        patient.graphs.glucosePostDinnerDataPeriods.allGlucosePostDinnerData
      ).map(mapGlicemiaPosJanta),
      lastMonthGlucosePostDinnerData: orderAsc(
        patient.graphs.glucosePostDinnerDataPeriods
          .lastMonthGlucosePostDinnerData
      ).map(mapGlicemiaPosJanta),
      lastWeekGlucosePostDinnerData: orderAsc(
        patient.graphs.glucosePostDinnerDataPeriods
          .lastWeekGlucosePostDinnerData
      ).map(mapGlicemiaPosJanta),
    },

    variacoesGlicemia22Horas: {
      allGlucoseHour22Data: orderAsc(
        patient.graphs.glucoseHour22DataPeriods.allGlucoseHour22Data
      ).map(mapGlicemia22Horas),
      lastMonthGlucoseHour22Data: orderAsc(
        patient.graphs.glucoseHour22DataPeriods.lastMonthGlucoseHour22Data
      ).map(mapGlicemia22Horas),
      lastWeekGlucoseHour22Data: orderAsc(
        patient.graphs.glucoseHour22DataPeriods.lastWeekGlucoseHour22Data
      ).map(mapGlicemia22Horas),
    },
  };
}

function formatPatientData(patient: IPatientForm) {
  const doctorId = localStorage.getItem(LocalStorage.DoctorId);

  const patientToAdd: IPatientRequest = {
    birthDate: patient.birthDate ?? "",
    dateFirstEco: patient.dateFirstEco ?? null,
    days: patient.days ?? 0,
    email: patient.email ?? "",
    finished: patient.finished ?? false,
    healthInsurance: patient.healthInsurance ?? "",
    healthProblemsIds: patient.healthProblemsIds ?? [],
    hospitalized: patient.hospitalized ?? false,
    idDoctor: doctorId ?? "",
    lastMenstruateDate: patient.lastMenstruateDate ?? null,
    linkOrNumberPe: patient.linkOrNumberPe ?? "",
    name: patient.name ?? "",
    password: patient.password ?? "",
    previousChildBirth: +(patient.previousBirths ?? false),
    previousGestation: +(patient.previousPregnancies ?? false),
    provenance: patient.provenance ?? "",
    risk: patient.risk ?? 0,
    phone: patient.phone ?? "",
    weeks: patient.weeks ?? 0,
  };

  return patientToAdd;
}

async function create(patient: IPatientForm) {
  const patientToAdd: IPatientRequest = formatPatientData(patient);

  await getAxios().post(
    `${process.env.REACT_APP_API_URL}/pacients`,
    patientToAdd
  );
}

async function endService(
  gestationId: string,
  patient: Partial<IPatientEndServiceRequest>
) {
  return getAxios().post(
    `${process.env.REACT_APP_API_URL}/Gestation/EndService/${gestationId}`,
    patient
  );
}

async function patientToEdit(id: string, gestationId: string) {
  return getAxios().get<any>(
    `${process.env.REACT_APP_API_URL}/pacients/web/${id}/gestation/${gestationId}`
  );
}

async function edit(id: string, gestationId: string, patient: IPatientForm) {
  return getAxios().post<any>(
    `${process.env.REACT_APP_API_URL}/pacients/web/${id}/gestation/${gestationId}`,
    patient
  );
}

export default {
  getPatients,
  getHeatmap,
  getById,
  create,
  endService,
  patientToEdit,
  edit,
};

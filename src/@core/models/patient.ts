export interface IPatient {
  id: string;
  gestationId: string;
  imageUrl: string;
  nome: string;
  proximaConsulta?: Date;
  dataProvavel: Date;
  risco: number;
  internada: boolean;
  procedencia: string;
}

export interface IPatientList {
  totalPages: number;
  results: IPatient[];
}

export interface IPatientPeso {
  mesAno: string;
  peso: number;
}

export interface IPatientMovFetal {
  mesAno: string;
  quantidade: number;
}

export interface IPatientGlicemia {
  mesAno: string;
  glicemia: number;
}

export interface IPatientBloodPressure {
  mesAno: string;
  hiastolicMmoll: number;
  systolicMmhg: number;
}

export interface IPatientGlicemiaJejum {
  mesAno: string;
  glicemiaJejum: number;
}

export interface IPatientGlicemiaPosCafe {
  mesAno: string;
  glicemiaPosCafe: number;
}

export interface IPatientGlicemiaPreAlmoco {
  mesAno: string;
  glicemiaPreAlmoco: number;
}

export interface IPatientGlicemiaPreJanta {
  mesAno: string;
  glicemiaPreJanta: number;
}

export interface IPatientGlicemiaPosJanta {
  mesAno: string;
  glicemiaPosJanta: number;
}

export interface IPatientGlicemia22Horas {
  mesAno: string;
  glicemia22Horas: number;
}

export interface IPatientHumor {
  mesAno: string;
  humor: number;
}

export interface IPatientVariacoesPeso {
  allWeigthData: IPatientPeso[];
  lastMonthWeigthData: IPatientPeso[];
  lastWeekWeigthData: IPatientPeso[];
}

export interface IPatientVariacoesMovFetal {
  allMovFetalData: IPatientMovFetal[];
  lastMonthMovFetalData: IPatientMovFetal[];
  lastWeekMovFetalData: IPatientMovFetal[];
}

export interface IPatientVariacoesGlicemia {
  allGlucosePostPrandialData: IPatientGlicemia[];
  lastMonthGlucosePostPrandialData: IPatientGlicemia[];
  lastWeekGlucosePostPrandialData: IPatientGlicemia[];
}

export interface IPatientVariacoesBloodPressure {
  allBloodPressureData: IPatientBloodPressure[];
  lastMonthBloodPressureData: IPatientBloodPressure[];
  lastWeekBloodPressureData: IPatientBloodPressure[];
}

export interface IPatientVariacoesGlicemiaJejum {
  allGlucoseFastingData: IPatientGlicemiaJejum[];
  lastMonthGlucoseFastingData: IPatientGlicemiaJejum[];
  lastWeekGlucoseFastingData: IPatientGlicemiaJejum[];
}

export interface IPatientVariacoesGlicemiaPosCafe {
  allGlucosePostCoffeData: IPatientGlicemiaPosCafe[];
  lastMonthGlucosePostCoffeData: IPatientGlicemiaPosCafe[];
  lastWeekGlucosePostCoffeData: IPatientGlicemiaPosCafe[];
}

export interface IPatientVariacoesGlicemiaPreAlmoco {
  allGlucosePreLunchData: IPatientGlicemiaPreAlmoco[];
  lastMonthGlucosePreLunchData: IPatientGlicemiaPreAlmoco[];
  lastWeekGlucosePreLunchData: IPatientGlicemiaPreAlmoco[];
}

export interface IPatientVariacoesGlicemiaPreJanta {
  allGlucosePreDinnerData: IPatientGlicemiaPreJanta[];
  lastMonthGlucosePreDinnerData: IPatientGlicemiaPreJanta[];
  lastWeekGlucosePreDinnerData: IPatientGlicemiaPreJanta[];
}

export interface IPatientVariacoesGlicemiaPosJanta {
  allGlucosePostDinnerData: IPatientGlicemiaPosJanta[];
  lastMonthGlucosePostDinnerData: IPatientGlicemiaPosJanta[];
  lastWeekGlucosePostDinnerData: IPatientGlicemiaPosJanta[];
}

export interface IPatientVariacoesGlicemia22Horas {
  allGlucoseHour22Data: IPatientGlicemia22Horas[];
  lastMonthGlucoseHour22Data: IPatientGlicemia22Horas[];
  lastWeekGlucoseHour22Data: IPatientGlicemia22Horas[];
}

export interface IPatientVariacoesHumor {
  allHumorData: IPatientHumor[];
  lastMonthHumorData: IPatientHumor[];
  lastWeekHumorData: IPatientHumor[];
}

export interface IPatientProblems {
  id: string;
  name: string;
}

export interface IPatientDetails {
  nome: string;
  carteirinhaId: string;
  imageUrl: string;
  phone: string;
  email: string;
  finished: boolean;
  peso: number;
  glicemiaJejum: number;
  glicemia24horasApos: number;
  pressaoArterialContraida: number;
  pressaoArterialRelaxada: number;
  averageNotes: string;
  totalConsultas: number;
  proximaConsulta?: Date;
  ultimaConsulta?: Date;
  convenio: string;
  prontuario: string;
  risco: string;
  procedencia: string;
  internada: string;

  dum?: Date;
  igDum: string;
  dppDum?: Date;
  primeiraEco?: Date;
  igEco: string;
  dppEco?: Date;

  problemas: IPatientProblems[];

  variacoesPeso: IPatientVariacoesPeso;
  variacoesMovFetal: IPatientVariacoesMovFetal;
  variacoesBloodPressure: IPatientVariacoesBloodPressure;
  variacoesHumor: IPatientVariacoesHumor;

  variacoesGlicemia: IPatientVariacoesGlicemia;
  variacoesGlicemiaJejum: IPatientVariacoesGlicemiaJejum;

  variacoesGlicemiaPosCafe: IPatientVariacoesGlicemiaPosCafe;
  variacoesGlicemiaPreAlmoco: IPatientVariacoesGlicemiaPreAlmoco;
  variacoesGlicemiaPreJanta: IPatientVariacoesGlicemiaPreJanta;
  variacoesGlicemiaPosJanta: IPatientVariacoesGlicemiaPosJanta;
  variacoesGlicemia22Horas: IPatientVariacoesGlicemia22Horas;
}

export interface IPatientHeatmap {
  colicaHeatmap: number[];
  dorCabecaHeatmap: number[];
  nauseaHeatmap: number[];
  tonturaHeatmap: number[];
  vomitoHeatmap: number[];
}

export interface IPatientForm {
  name?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  gender?: number;
  phone?: string;
  idDoctor?: string;
  objectKeyPictureProfile?: string;
  healthInsurance?: string;
  linkOrNumberPe?: string;
  provenance?: string;
  risk?: number;
  finished?: boolean;
  hospitalized?: boolean;
  healthProblemsIds?: string[];
  healthProblems?: any[];
  lastMenstruateDate?: string;
  dateFirstEco?: string;
  weeks?: number;
  days?: number;
  previousPregnancies?: number;
  previousBirths?: number;
}

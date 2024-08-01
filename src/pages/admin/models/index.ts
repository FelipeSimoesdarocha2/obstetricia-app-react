export interface UserLogin {
  email: string;
  password: string;
}

export interface DataGraficos {
  labels: string[];
  values: number[];
}

export enum TypeDateGrafico {
  DIARIO = 1,
  SEMANAL = 2,
  MENSAL = 3,
}

export enum TypeTabGrafico {
  OBSTETRAS = 1,
  GESTANTES = 2,
  MONITORAMENTOS = 3,
  LEMBRETES = 4,
  GESTOBST = 5,
  MONITGEST = 6,
  LEMBGEST = 7,
  ALTORISCOTOTAL = 8,
}


export enum TypeTabGraficoRetention {
  APP = 0,
  SITE = 1,
}

export interface DataItemCardsHome {
  quantity: number;
  porcentage: number;
}

export interface DataItemCardsApi {
  gestantes: DataItemCardsHome;
  lembretes: DataItemCardsHome;
  monitoramentos: DataItemCardsHome;
  obstetras: DataItemCardsHome;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  className?: string;
}

export interface IObstcares {
  name: string;
  email: string;
  phones: string;
  crm: string;
}

export interface DataItemObstetras {
  id: string;
  name: string;
  email: string;
  perfilImage: string | null;
  numerosDeGestantes: number;
  telefone: string;
  crm: string;
  dataDaCriacao: string;
  ultimaAtividade: string;
}

export interface ICreateObstetras {
  FullName?: string;
  Password: string;
  Email: string;
  Phones: string;
  Crm: string | undefined;
  Gender: string;
  ProfilePicture: null;
}

export interface IGestantes {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  idDoctor: string;
  healthInsurance: string;
  linkOrNumberPe: string;
  provenance: string;
  risk: string;
  finished: boolean;
  hospitalized: boolean;
  lastMenstruateDate: string;
  dateFirstEco: string;
  weeks: number;
  days: number;
  previousPregnancies: number;
  previousBirths: number;
}

export interface DataItemGestantes {
  id: string;
  gestationId: string;
  name: string;
  email: string;
  perfilImage: string | null;
  ddp: string;
  telefone: string;
  obstetraResponsavel: string;
  created_at?: string;
  monitoramentos: number;
  ultimaAtividade: string;
}

export interface ICreateGestantes {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  idDoctor: string;
  healthInsurance: string;
  linkOrNumberPe: string;
  provenance: string;
  risk: number;
  finished: boolean;
  hospitalized: boolean;
  lastMenstruateDate: string;
  dateFirstEco: string;
  weeks: number;
  days: number;
  previousPregnancies: number;
  previousBirths: number;
}

export type GestationReminder = {
  gestationId: string;
  active: boolean;
  hours: number;
  minutes: number;
  humor: boolean;
  symptoms: boolean;
  weigth: boolean;
  bloodPressure: boolean;
  fetalMoviments: boolean;
  glucoseFasting: boolean;
  glucosePostPrandial: boolean;
};

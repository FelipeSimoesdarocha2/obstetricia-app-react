export interface IPatientRequest {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  idDoctor: string;
  healthInsurance: string;
  linkOrNumberPe: string;
  provenance: string;
  risk: number;
  finished: boolean;
  hospitalized: boolean;
  healthProblemsIds: string[];
  lastMenstruateDate: string | null;
  dateFirstEco: string | null;
  weeks: number;
  days: number;
  phone:string;
  previousGestation: number;
  previousChildBirth: number;
}

export enum EnumOutcome {
  "Parto normal" = 0,
  "Cesárea" = 1,
  "Aborto" = 2,
}

export interface IPatientEndServiceRequest {
  outcome: number;
  gestationalAgeWeeks: number;
  additionalRemarks: string;
  messageSended: string;
  babyWeigth: number;
}

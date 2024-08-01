export interface IPatientItemResponse {
  pacientId: string;
  gestationId: string;
  fullName: string;
  profilePictureUrl: string;
  nextAppointment: string;
  provenance: string;
  risk: number;
  hospitalized: boolean;
  probablyDateDum: string;
  probablyDateFirsEco: string;
}

export interface IPatientListResponse {
  items: IPatientItemResponse[];
  currentPage: number;
  lastPages: number[];
  nextPages: number[];
}

export interface IPatientHeatmapItemResponse {
  day: number;
  count: number;
}

export interface IPatientHeatmapResponse {
  colicaHeatmap: IPatientHeatmapItemResponse[];
  dorCabecaHeatmap: IPatientHeatmapItemResponse[];
  nauseaHeatmap: IPatientHeatmapItemResponse[];
  tonturaHeatmap: IPatientHeatmapItemResponse[];
  vomitoHeatmap: IPatientHeatmapItemResponse[];
}

export interface IPatientDetailsInfoGlucoseResponse {
  fast: number;
  postPrandialFasting: number;
  dateLastMeasureFast: string;
  dateLastMeasurePrandialFasting: string;
}

export interface IPatientDetailsInfoPAResponse {
  systolicMmhg: number;
  hiastolicMmoll: number;
  heartRate: number;
  dateLastMeasure: string;
}

export interface IPatientDetailsInfoWeigthResponse {
  weigth: number;
  dateLastMeasure: string;
}

export interface IPatientDetailsInfoResponse {
  profileImageUrl: string;
  fullName: string;
  phone: string;
  email: string;
  finished: boolean;
  glucose: IPatientDetailsInfoGlucoseResponse;
  bloodPressure: IPatientDetailsInfoPAResponse;
  weigthInfo: IPatientDetailsInfoWeigthResponse;
}

export interface IPatientDetailsMainInfoResponse {
  appointmentQuantity: number;
  nextAppointment: string;
  lastAppointment: string;
  medicalRecord: string;
  risk: number;
  provenance: string;
  healthInsurance: string;
  hospitalized: boolean;
}

export interface IPatientDetailsGestationalAgeInfoResponse {
  lastMenstruateDate: string;
  igdumWeeks: number;
  igdumDays: number;
  dppdum: string;
  firstECO: string;
  igecoWeeks: number;
  igecoDays: number;
  dppeco: string;
}

export interface IPatientDetailsPregnantProblemsResponse {
  id: string;
  description: string;
}

export interface IPatientDetailsGestationResponse {
  outcome: number;
  newbornStatus: number;
  gestationalAgeWeeks: number;
  gestationalAgeDays: number;
  babyWeigth: number;
  additionalRemarks: string;
  messageSended: string;
}

export interface IPatientDetailsGraphAverageResponse {
  average: number;
  date: string;
}

export interface IPatientDetailsGraphBloodPressureResponse {
  systolicMmhg: number;
  hiastolicMmoll: number;
  heartRate: number;
  date: string;
}

export interface IPatientDetailsWeightDataPeriodsResponse {
  lastWeekWeigthData: IPatientDetailsGraphAverageResponse[];
  lastMonthWeigthData: IPatientDetailsGraphAverageResponse[];
  allWeigthData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucoseFastingDataPeriodsResponse {
  lastWeekGlucoseFastingData: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucoseFastingData: IPatientDetailsGraphAverageResponse[];
  allGlucoseFastingData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucosePostPrandialDataPeriodsResponse {
  lastWeekGlucosePostPrandialData: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucosePostPrandialData: IPatientDetailsGraphAverageResponse[];
  allGlucosePostPrandialData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucosePostCoffeDataPeriodsResponse {
  lastWeekGlucosePostCoffeData: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucosePostCoffeData: IPatientDetailsGraphAverageResponse[];
  allGlucosePostCoffeData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucosePreLunchDataPeriodsResponse {
  lastWeekGlucosePreLunchData: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucosePreLunchData: IPatientDetailsGraphAverageResponse[];
  allGlucosePreLunchData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucosePreDinnerDataPeriodsResponse {
  lastWeekGlucosePreDinnerData: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucosePreDinnerData: IPatientDetailsGraphAverageResponse[];
  allGlucosePreDinnerData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucosePostDinnerDataPeriodsResponse {
  lastWeekGlucosePostDinnerData: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucosePostDinnerData: IPatientDetailsGraphAverageResponse[];
  allGlucosePostDinnerData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGlucoseHour22DataPeriodsResponse {
  lastWeekGlucoseHour22Data: IPatientDetailsGraphAverageResponse[];
  lastMonthGlucoseHour22Data: IPatientDetailsGraphAverageResponse[];
  allGlucoseHour22Data: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsFetalMovimentsDataPeriodsResponse {
  lastWeekFetalMovimentsData: IPatientDetailsGraphAverageResponse[];
  lastMonthFetalMovimentsData: IPatientDetailsGraphAverageResponse[];
  allFetalMovimentsData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsHumorDataPeriodsResponse {
  lastWeekHumorData: IPatientDetailsGraphAverageResponse[];
  lastMonthHumorData: IPatientDetailsGraphAverageResponse[];
  allHumorData: IPatientDetailsGraphAverageResponse[];
}

export interface IPatientDetailsGraphPAResponse {
  systolicMmhg: number;
  hiastolicMmoll: number;
  heartRate: number;
  date: string;
}

export interface IPatientDetailsPADataPeriodsResponse {
  lastWeekBloodPressureData: IPatientDetailsGraphPAResponse[];
  lastMonthBloodPressureData: IPatientDetailsGraphPAResponse[];
  allBloodPressureData: IPatientDetailsGraphPAResponse[];
}

export interface IPatientDetailsGraphsResponse {
  weightDataPeriods: IPatientDetailsWeightDataPeriodsResponse;
  bloodPressureDataPeriods: IPatientDetailsPADataPeriodsResponse;
  fetalMovimentsDataPeriods: IPatientDetailsFetalMovimentsDataPeriodsResponse;
  humorDataPeriods: IPatientDetailsHumorDataPeriodsResponse;

  glucoseFastingDataPeriods: IPatientDetailsGlucoseFastingDataPeriodsResponse;
  glucosePostPrandialDataPeriods: IPatientDetailsGlucosePostPrandialDataPeriodsResponse;
  glucosePostCoffeDataPeriods: IPatientDetailsGlucosePostCoffeDataPeriodsResponse;
  glucosePreLunchDataPeriods: IPatientDetailsGlucosePreLunchDataPeriodsResponse;
  glucosePreDinnerDataPeriods: IPatientDetailsGlucosePreDinnerDataPeriodsResponse;
  glucosePostDinnerDataPeriods: IPatientDetailsGlucosePostDinnerDataPeriodsResponse;
  glucoseHour22DataPeriods: IPatientDetailsGlucoseHour22DataPeriodsResponse;
}

export interface IPatientDetailsResponse {
  carteirinhaId: string;
  pacientInfo: IPatientDetailsInfoResponse;
  averageNotes: string;
  mainInfo: IPatientDetailsMainInfoResponse;
  gestationalAgeInfo: IPatientDetailsGestationalAgeInfoResponse;
  pregnantProblems: IPatientDetailsPregnantProblemsResponse[];
  gestationResult: IPatientDetailsGestationResponse;
  graphs: IPatientDetailsGraphsResponse;
}

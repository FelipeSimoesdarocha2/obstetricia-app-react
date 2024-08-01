import styles from "./PrintService.module.scss";
import PatientBloodPressureGraphInfos from "./GraphInfos/PatientBloodPressureGraphInfos";
import { IPatientDetails } from "@core/models/patient";

export interface IPatientWeightGraph {
  mesAno: string;
  peso: number;
}

interface IPatientGraphDetailsProps {
  title: string;
  isLoading: boolean;
  patient: IPatientDetails | null | undefined;
}

function Grafico(props: IPatientGraphDetailsProps) {
  const { title, isLoading, patient } = props;
  console.log({ patient });
  return (
    <>
      <div className={styles.containerPadding}>
        <span className={styles.titleRow}>{title}</span>
      </div>
      <div className={styles.line} />
      <div className={styles.spacer25} />
      <div className={styles.containerGrafico}>
        <PatientBloodPressureGraphInfos
          isLoading={isLoading}
          isPrintService
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
      </div>
    </>
  );
}

export default Grafico;

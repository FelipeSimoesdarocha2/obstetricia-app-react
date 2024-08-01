import React from "react";
import InfoCard from "../../../../../../components/card/@components/Info/Info";
import styles from "./IgDppInfos.module.scss";

export interface IPatientIgDppInfos {
  dum: Date;
  igDum: string;
  dppDum: Date;
  primeiraEco: Date;
  igEco: string;
  dppEco: Date;
}

interface IIgDppInfosProps {
  isLoading: boolean;
  patientIgDppInfos: IPatientIgDppInfos;
}

function IgDppInfos(props: IIgDppInfosProps) {
  const { isLoading, patientIgDppInfos } = props;

  const getDate = (value: Date) => {
    if (value) {
      const result = value.toLocaleDateString("pt-BR");

      if (result && result.toLowerCase() !== "invalid date") {
        return result;
      }
    }
    
    return "Não informado"
  };

  return (
    <div className={styles.container}>
      <div>
        <InfoCard
          isLoading={isLoading}
          title="DUM"
          value={getDate(patientIgDppInfos?.dum)}
        />

        <InfoCard
          isLoading={isLoading}
          title="IG DUM"
          value={patientIgDppInfos?.igDum}
        />

        <InfoCard
          isLoading={isLoading}
          title="DPP DUM"
          value={getDate(patientIgDppInfos?.dppDum)}
        />
      </div>

      <div>
        <InfoCard
          isLoading={isLoading}
          title="1a ECO"
          value={getDate(patientIgDppInfos?.primeiraEco)}
        />

        <InfoCard
          isLoading={isLoading}
          title="IG ECO"
          value={patientIgDppInfos?.igEco}
        />

        <InfoCard
          isLoading={isLoading}
          title="DPP ECO"
          value={getDate(patientIgDppInfos?.dppEco)}
        />
      </div>
    </div>
  );
}

export default IgDppInfos;

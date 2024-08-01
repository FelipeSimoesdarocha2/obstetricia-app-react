import React from "react";
import InfoCard from "../../../../../../components/card/@components/Info/Info";

export interface IPatientMainInfos {
  totalConsultas: number;
  proximaConsulta: Date;
  ultimaConsulta: Date;
  convenio: string;
  prontuario: string;
  risco: string;
  procedencia: string;
  internada: string;
}

interface IMainInfosProps {
  isLoading: boolean;
  patientMainInfos: IPatientMainInfos;
}

function MainInfos(props: IMainInfosProps) {
  const { isLoading, patientMainInfos } = props;

  const getDate = (value: Date) => {
    const result = value?.toLocaleDateString("pt-BR");

    if (!result || result.toLowerCase() === "invalid date") {
      return "";
    }

    return result;
  };

  return (
    <div>
      <InfoCard
        isLoading={isLoading}
        title="Total Consultas"
        value={patientMainInfos?.totalConsultas?.toString()}
      />

      <InfoCard
        isLoading={isLoading}
        title="Próxima Consulta"
        value={getDate(patientMainInfos?.proximaConsulta)}
      />

      <InfoCard
        isLoading={isLoading}
        title="Última Consulta"
        value={getDate(patientMainInfos?.ultimaConsulta)}
      />

      <InfoCard
        isLoading={isLoading}
        title="Convênio"
        value={patientMainInfos?.convenio}
      />

      <InfoCard
        isLoading={isLoading}
        title="Prontuário"
        value={patientMainInfos?.prontuario}
      />

      <InfoCard
        isLoading={isLoading}
        title="Risco"
        value={patientMainInfos?.risco}
      />

      <InfoCard
        isLoading={isLoading}
        title="Local"
        value={patientMainInfos?.procedencia}
      />

      <InfoCard
        isLoading={isLoading}
        title="Internação"
        value={patientMainInfos?.internada}
      />
    </div>
  );
}

export default MainInfos;

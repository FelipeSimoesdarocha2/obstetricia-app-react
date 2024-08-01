import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./PatientFetalMovementGraphInfos.module.scss";
import NoContent from "components/no-content/NoContent";

export interface IPatientFetalMovementGraph {
  mesAno: string;
  quantidade: number;
}

interface IPatientFetalMovementGraphInfosProps {
  isLoading: boolean;
  lastWeekFetalMovementData: IPatientFetalMovementGraph[];
  lastMonthFetalMovementData: IPatientFetalMovementGraph[];
  allFetalMovementData: IPatientFetalMovementGraph[];
}

interface IPatientGraphDetailsProps {
  data: IPatientFetalMovementGraph[];
}

function PatientGraphDetails(props: IPatientGraphDetailsProps) {
  const { data } = props;

  const noItems = !data || !data.length;

  return (
    <div style={{ height: 300 }}>
      {noItems ? (
        <NoContent />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesAno" />
            <YAxis
              domain={[
                Math.min(...data.map((d) => d.quantidade)) - 5,
                Math.max(...data.map((d) => d.quantidade)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="quantidade"
              stroke="#1A535C"
              aria-label="Quantidade"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientFetalMovementGraphInfos(
  props: IPatientFetalMovementGraphInfosProps
) {
  const {
    isLoading,
    lastWeekFetalMovementData,
    lastMonthFetalMovementData,
    allFetalMovementData,
  } = props;

  const [data, setData] = useState(lastWeekFetalMovementData);

  const onChangePeriodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    switch (value) {
      case 1:
        setData(lastMonthFetalMovementData);
        break;
      case 2:
        setData(allFetalMovementData);
        break;
      default:
        setData(lastWeekFetalMovementData);
        break;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <>
          <select
            defaultValue="0"
            onChange={onChangePeriodo}
            className={styles.select}
          >
            <option value="0">Última semana</option>
            <option value="1">Último mês</option>
            <option value="2">Todos os períodos</option>
          </select>

          <PatientGraphDetails data={data} />
        </>
      )}
    </div>
  );
}

export default PatientFetalMovementGraphInfos;

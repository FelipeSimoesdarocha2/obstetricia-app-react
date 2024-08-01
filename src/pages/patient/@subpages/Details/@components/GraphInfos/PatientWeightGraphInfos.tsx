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
import NoContent from "components/no-content/NoContent";
import styles from "./PatientWeightGraphInfos.module.scss";

export interface IPatientWeightGraph {
  mesAno: string;
  peso: number;
}

interface IPatientWeightGraphInfosProps {
  isLoading: boolean;
  lastWeekWeigthData: IPatientWeightGraph[];
  lastMonthWeigthData: IPatientWeightGraph[];
  allWeigthData: IPatientWeightGraph[];
}

interface IPatientGraphDetailsProps {
  data: IPatientWeightGraph[];
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
                Math.min(...data.map((d) => d.peso)) - 5,
                Math.max(...data.map((d) => d.peso)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="peso"
              stroke="#1A535C"
              aria-label="Peso"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientWeightGraphInfos(props: IPatientWeightGraphInfosProps) {
  const { isLoading, lastWeekWeigthData, lastMonthWeigthData, allWeigthData } =
    props;

  const [data, setData] = useState(lastWeekWeigthData);

  const onChangePeriodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    switch (value) {
      case 1:
        setData(lastMonthWeigthData);
        break;
      case 2:
        setData(allWeigthData);
        break;
      default:
        setData(lastWeekWeigthData);
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

export default PatientWeightGraphInfos;

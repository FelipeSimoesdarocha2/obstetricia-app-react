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
  ReferenceLine,
} from "recharts";
import NoContent from "components/no-content/NoContent";
import styles from "./PatientHour22GraphInfos.module.scss";

export interface IPatientHour22Graph {
  mesAno: string;
  glicemia22Horas: number;
}

interface IPatientHour22GraphInfosProps {
  isLoading: boolean;
  lastWeekHour22Data: IPatientHour22Graph[];
  lastMonthHour22Data: IPatientHour22Graph[];
  allHour22Data: IPatientHour22Graph[];
}

interface IPatientGraphDetailsProps {
  data: IPatientHour22Graph[];
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
            <ReferenceLine
              y={120}
              label="Controle"
              stroke="red"
              strokeDasharray="3 3"
            />
            <YAxis
              domain={[
                Math.min(...data.map((d) => d.glicemia22Horas)) - 5,
                Math.max(...data.map((d) => d.glicemia22Horas)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="glicemia22Horas"
              stroke="#1A535C"
              aria-label="glicemia22Horas"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientHour22GraphInfos(props: IPatientHour22GraphInfosProps) {
  const { isLoading, lastWeekHour22Data, lastMonthHour22Data, allHour22Data } =
    props;

  const [data, setData] = useState(lastWeekHour22Data);

  const onChangePeriodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    switch (value) {
      case 1:
        setData(lastMonthHour22Data);
        break;
      case 2:
        setData(allHour22Data);
        break;
      default:
        setData(lastWeekHour22Data);
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

export default PatientHour22GraphInfos;

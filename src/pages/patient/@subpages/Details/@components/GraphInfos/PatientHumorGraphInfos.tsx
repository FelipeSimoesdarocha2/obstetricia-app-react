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
import styles from "./PatientHumorGraphInfos.module.scss";

export interface IPatientHumorGraph {
  mesAno: string;
  humor: number;
}

interface IPatientHumorInfosProps {
  isLoading: boolean;
  lastWeekHumorData: IPatientHumorGraph[];
  lastMonthHumorData: IPatientHumorGraph[];
  allHumorData: IPatientHumorGraph[];
}

interface IPatientGraphDetailsProps {
  data: IPatientHumorGraph[];
}

function PatientGraphDetails(props: IPatientGraphDetailsProps) {
  const { data } = props;

  const noItems = !data || !data.length;

  const formatter = (value: number) => {
    switch (value) {
      case 1:
        return "Muito Triste";
      case 2:
        return "Triste";
      case 3:
        return "Normal";
      case 4:
        return "Feliz";
      case 5:
        return "Muito Feliz";
      default:
        return "";
    }
  };

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
              domain={[1, 5]}
              tickFormatter={formatter}
              tickMargin={20}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip formatter={(value: any) => formatter(value)} />
            <Line
              type="monotone"
              dataKey="humor"
              stroke="#1A535C"
              aria-label="Humor"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientHumorGraphInfos(props: IPatientHumorInfosProps) {
  const { isLoading, lastWeekHumorData, lastMonthHumorData, allHumorData } =
    props;

  const [data, setData] = useState(lastWeekHumorData);

  const onChangePeriodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    switch (value) {
      case 1:
        setData(lastMonthHumorData);
        break;
      case 2:
        setData(allHumorData);
        break;
      default:
        setData(lastWeekHumorData);
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

export default PatientHumorGraphInfos;

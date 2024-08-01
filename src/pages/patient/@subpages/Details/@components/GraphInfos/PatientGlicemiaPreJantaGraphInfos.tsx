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
import styles from "./PatientGlicemiaPreJantaGraphInfos.module.scss";

export interface IPatientGlicemiaPreJanta {
  mesAno: string;
  glicemiaPreJanta: number;
}

interface IPatientGlicemiaPreJantaGraphInfosProps {
  isLoading: boolean;
  lastWeekGlucoseFastingData: IPatientGlicemiaPreJanta[];
  lastMonthGlucoseFastingData: IPatientGlicemiaPreJanta[];
  allGlucoseFastingData: IPatientGlicemiaPreJanta[];
}

interface IPatientGraphDetailsProps {
  data: IPatientGlicemiaPreJanta[];
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
              y={95}
              label="Controle"
              stroke="red"
              strokeDasharray="3 3"
            />
            <YAxis
              domain={[
                Math.min(...data.map((d) => d.glicemiaPreJanta)) - 5,
                Math.max(...data.map((d) => d.glicemiaPreJanta)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="glicemiaPreJanta"
              stroke="#1A535C"
              aria-label="Glicemia Pré Janta"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientGlicemiaPreJantaGraphInfos(
  props: IPatientGlicemiaPreJantaGraphInfosProps
) {
  const {
    isLoading,
    lastWeekGlucoseFastingData,
    lastMonthGlucoseFastingData,
    allGlucoseFastingData,
  } = props;

  const [data, setData] = useState(lastWeekGlucoseFastingData);

  const onChangePeriodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    switch (value) {
      case 1:
        setData(lastMonthGlucoseFastingData);
        break;
      case 2:
        setData(allGlucoseFastingData);
        break;
      default:
        setData(lastWeekGlucoseFastingData);
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

export default PatientGlicemiaPreJantaGraphInfos;

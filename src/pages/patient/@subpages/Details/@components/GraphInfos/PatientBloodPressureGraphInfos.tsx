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

import styles from "./PatientBloodPressureGraphInfos.module.scss";
import NoContent from "components/no-content/NoContent";

export interface IPatientBloodPressureGraph {
  mesAno: string;
  hiastolicMmoll: number;
  systolicMmhg: number;
}

interface IPatientBloodPressureGraphInfosProps {
  isLoading: boolean;
  lastWeekBloodPressureData: IPatientBloodPressureGraph[];
  lastMonthBloodPressureData: IPatientBloodPressureGraph[];
  allBloodPressureData: IPatientBloodPressureGraph[];
  isPrintService?: boolean;
}

interface IPatientGraphDetailsProps {
  data: IPatientBloodPressureGraph[];
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
                Math.min(...data.map((d) => d.hiastolicMmoll)) - 5,
                Math.max(...data.map((d) => d.hiastolicMmoll)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hiastolicMmoll"
              stroke="#1A535C"
              aria-label="Diastólica"
              activeDot={{ r: 8 }}
              name="Diastólica"
            />
            <Line
              type="monotone"
              dataKey="systolicMmhg"
              stroke="#1A535C"
              aria-label="Sistólica"
              activeDot={{ r: 8 }}
              name="Sistólica"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientBloodPressureGraphInfos(
  props: IPatientBloodPressureGraphInfosProps
) {
  const {
    isLoading,
    lastWeekBloodPressureData,
    lastMonthBloodPressureData,
    allBloodPressureData,
    isPrintService,
  } = props;

  const [data, setData] = useState(
    isPrintService ? lastMonthBloodPressureData : lastWeekBloodPressureData
  );

  const onChangePeriodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    switch (value) {
      case 1:
        setData(lastMonthBloodPressureData);
        break;
      case 2:
        setData(allBloodPressureData);
        break;
      default:
        setData(lastWeekBloodPressureData);
        break;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <>
          {isPrintService ? (
            <></>
          ) : (
            <select
              defaultValue="0"
              onChange={onChangePeriodo}
              className={styles.select}
            >
              <option value="0">Última semana</option>
              <option value="1">Último mês</option>
              <option value="2">Todos os períodos</option>
            </select>
          )}

          <PatientGraphDetails data={data} />
        </>
      )}
    </div>
  );
}

export default PatientBloodPressureGraphInfos;

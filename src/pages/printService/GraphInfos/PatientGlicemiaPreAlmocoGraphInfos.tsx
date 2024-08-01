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
import styles from "./PatientGlicemiaPreAlmocoGraphInfos.module.scss";
import NoContent from "components/no-content/NoContent";

export interface IPatientGlicemiaPreAlmoco {
  mesAno: string;
  glicemiaPreAlmoco: number;
}

interface IPatientGlicemiaPreAlmocoGraphInfosProps {
  isLoading: boolean;
  lastWeekGlucoseFastingData: IPatientGlicemiaPreAlmoco[];
  lastMonthGlucoseFastingData: IPatientGlicemiaPreAlmoco[];
  allGlucoseFastingData: IPatientGlicemiaPreAlmoco[];
}

interface IPatientGraphDetailsProps {
  data: IPatientGlicemiaPreAlmoco[];
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
                Math.min(...data.map((d) => d.glicemiaPreAlmoco)) - 5,
                Math.max(...data.map((d) => d.glicemiaPreAlmoco)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="glicemiaPreAlmoco"
              stroke="#1A535C"
              aria-label="Glicemia Pré Almoço"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientGlicemiaPreAlmocoGraphInfos(
  props: IPatientGlicemiaPreAlmocoGraphInfosProps
) {
  const { isLoading, lastMonthGlucoseFastingData } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <PatientGraphDetails data={lastMonthGlucoseFastingData} />
      )}
    </div>
  );
}

export default PatientGlicemiaPreAlmocoGraphInfos;

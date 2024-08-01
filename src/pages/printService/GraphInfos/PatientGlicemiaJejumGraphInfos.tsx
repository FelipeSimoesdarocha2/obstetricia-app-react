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
import styles from "./PatientGlicemiaJejumGraphInfos.module.scss";
import NoContent from "components/no-content/NoContent";

export interface IPatientGlicemiaJejumGraph {
  mesAno: string;
  glicemiaJejum: number;
}

interface IPatientGlicemiaJejumGraphInfosProps {
  isLoading: boolean;
  lastWeekGlucoseFastingData: IPatientGlicemiaJejumGraph[];
  lastMonthGlucoseFastingData: IPatientGlicemiaJejumGraph[];
  allGlucoseFastingData: IPatientGlicemiaJejumGraph[];
}

interface IPatientGraphDetailsProps {
  data: IPatientGlicemiaJejumGraph[];
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
                Math.min(...data.map((d) => d.glicemiaJejum)) - 5,
                Math.max(...data.map((d) => d.glicemiaJejum)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="glicemiaJejum"
              stroke="#1A535C"
              aria-label="Glicemia Jejum"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientGlicemiaJejumGraphInfos(
  props: IPatientGlicemiaJejumGraphInfosProps
) {
  const { isLoading, lastMonthGlucoseFastingData } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <>
          <PatientGraphDetails data={lastMonthGlucoseFastingData} />
        </>
      )}
    </div>
  );
}

export default PatientGlicemiaJejumGraphInfos;

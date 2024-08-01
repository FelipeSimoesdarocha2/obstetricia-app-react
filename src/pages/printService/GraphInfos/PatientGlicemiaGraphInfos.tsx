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

export interface IPatientGlicemiaGraph {
  mesAno: string;
  glicemia: number;
}

interface IPatientGlicemiaGraphInfosProps {
  isLoading: boolean;
  allGlucosePostPrandialData: IPatientGlicemiaGraph[];
  lastMonthGlucosePostPrandialData: IPatientGlicemiaGraph[];
  lastWeekGlucosePostPrandialData: IPatientGlicemiaGraph[];
}

interface IPatientGraphDetailsProps {
  data: IPatientGlicemiaGraph[];
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
                Math.min(...data.map((d) => d.glicemia)) - 5,
                Math.max(...data.map((d) => d.glicemia)) + 5,
              ]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="glicemia"
              stroke="#1A535C"
              aria-label="Glicemia"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function PatientGlicemiaGraphInfos(props: IPatientGlicemiaGraphInfosProps) {
  const { isLoading, lastMonthGlucosePostPrandialData } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <>
          <PatientGraphDetails data={lastMonthGlucosePostPrandialData} />
        </>
      )}
    </div>
  );
}

export default PatientGlicemiaGraphInfos;

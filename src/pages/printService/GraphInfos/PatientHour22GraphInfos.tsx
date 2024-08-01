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
  const { isLoading, lastMonthHour22Data } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <PatientGraphDetails data={lastMonthHour22Data} />
      )}
    </div>
  );
}

export default PatientHour22GraphInfos;

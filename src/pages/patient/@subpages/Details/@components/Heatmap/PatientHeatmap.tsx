import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HeatmapSquare from "./@components/HeatmapSquare";
import date from "../../../../../../@core/helpers/date";
import styles from "./PatientHeatmap.module.scss";

interface IPatientHeatmapProps {
  isLoading: boolean;
  selectedMonth: number;
  selectedYear: number;
  colicaHeatmap: number[];
  nauseaHeatmap: number[];
  vomitoHeatmap: number[];
  dorCabecaHeatmap: number[];
  tonturaHeatmap: number[];
}

function PatientHeatmap(props: IPatientHeatmapProps) {
  const {
    isLoading,
    selectedMonth,
    selectedYear,
    colicaHeatmap = [],
    nauseaHeatmap = [],
    vomitoHeatmap = [],
    dorCabecaHeatmap = [],
    tonturaHeatmap = [],
  } = props;

  const [daysOfMonth, setDaysOfMonth] = useState(
    date.daysOfMonth(selectedMonth, selectedYear)
  );

  useEffect(() => {
    setDaysOfMonth(date.daysOfMonth(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              {daysOfMonth.map((day) => (
                <TableCell align="center" key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Cólica
              </TableCell>
              {daysOfMonth.map((day) => (
                <TableCell size="small" align="right" key={`colica-${day}`}>
                  <HeatmapSquare
                    heatmap={colicaHeatmap.find((h) => h === day)}
                    day={day}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Náusea
              </TableCell>
              {daysOfMonth.map((day) => (
                <TableCell align="right" key={`nausea-${day}`}>
                  <HeatmapSquare
                    heatmap={nauseaHeatmap.find((h) => h === day)}
                    day={day}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Vômito
              </TableCell>
              {daysOfMonth.map((day) => (
                <TableCell align="right" key={`vomito-${day}`}>
                  <HeatmapSquare
                    heatmap={vomitoHeatmap.find((h) => h === day)}
                    day={day}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{whiteSpace: 'nowrap'}}>
                Dor de Cabeça
              </TableCell>
              {daysOfMonth.map((day) => (
                <TableCell align="right" key={`dor-cabeca-${day}`}>
                  <HeatmapSquare
                    heatmap={dorCabecaHeatmap.find((h) => h === day)}
                    day={day}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Tontura
              </TableCell>
              {daysOfMonth.map((day) => (
                <TableCell align="right" key={`tontura-${day}`}>
                  <HeatmapSquare
                    heatmap={tonturaHeatmap.find((h) => h === day)}
                    day={day}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default PatientHeatmap;

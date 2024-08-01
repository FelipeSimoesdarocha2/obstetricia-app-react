import React, { useEffect, useState } from "react";
import styles from "../PatientHeatmap.module.scss";

interface IHeatmapSquareProps {
  heatmap: number | undefined;
  day: number;
}

function HeatmapSquare(props: IHeatmapSquareProps) {
  const { heatmap, day } = props;
  const [heatmapState, setHeatmapState] = useState<number | undefined>(0);

  useEffect(() => {
    setHeatmapState(heatmap);
  }, [heatmap]);

  return (
    <div
      className={`${styles.rowValue} ${
        heatmapState === day ? styles.active : null
      }`}
    >
      &nbsp;
    </div>
  );
}

export default HeatmapSquare;

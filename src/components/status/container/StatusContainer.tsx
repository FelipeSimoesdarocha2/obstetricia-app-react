import { Skeleton } from "@mui/material";
import React, { ReactElement } from "react";
import Status from "../Status";
import styles from "./StatusContainer.module.scss";

type StatusType = typeof Status;

type IStatusContainerProps = {
  isLoading: boolean;
  headerTitle: string;
  type: "danger" | "normal" | "success";
  status: ReactElement<StatusType>[];
  headerSubTitle: string;
};

function StatusContainer(props: IStatusContainerProps) {
  const { isLoading, headerTitle, type, status, headerSubTitle } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton height={150} />
      ) : (
        <div className={`${styles.container} ${styles[type]}`}>
          <div className={styles.header}>
            <p>{headerTitle}</p>
            {headerSubTitle && (
              <span className={styles.span}>{headerSubTitle}</span>
            )}
          </div>

          <div className={styles.status}>{status.map((s) => s)}</div>
        </div>
      )}
    </div>
  );
}

export default StatusContainer;

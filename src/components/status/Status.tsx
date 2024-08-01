import React from "react";
import styles from "./Status.module.scss";

interface IStatusProps {
  value: number | string;
  text: string;
  type: "danger" | "normal" | "success";
  statusTitle: string;
}

function Status(props: IStatusProps) {
  const { value, text, type, statusTitle } = props;

  return (
    <div className={styles.container}>
      <div className={`${styles.status} ${styles[type]}`}>
        <div className={styles.content}>
          {!value || value.toString().includes("undefined") ? (
            <span>N/A</span>
          ) : (
            <>
              <span className={styles.value}>{value}</span>
              <span className={styles.text}>{text}</span>
            </>
          )}
        </div>
        <span className={styles.line} />
      </div>

      <div className={`${styles.statusTitle} ${styles[type]}`}>
        {statusTitle}
      </div>
    </div>
  );
}

export default Status;

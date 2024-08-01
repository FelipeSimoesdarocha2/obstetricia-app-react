import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PrintService.module.scss";

function Title({ title, description }: { title: string; description: string }) {
  const { id } = useParams();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.column}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
      <div className={styles.line} />
    </>
  );
}

export default Title;

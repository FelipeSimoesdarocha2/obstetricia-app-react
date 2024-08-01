import React from "react";
import styles from "./NoContent.module.scss";

function NoContent() {
  return (
    <div className={styles.container}>
      <span>Nenhuma informação cadastrada</span>
    </div>
  );
}

export default NoContent;

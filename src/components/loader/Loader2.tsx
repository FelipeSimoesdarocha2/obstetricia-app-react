import React from "react";
import styles from "./Loader.module.scss";


function Loader2(props: any) {
  const { title } = props;
  return (
    <div className={styles.secondaryLoaderContainer}>
      <div className={styles.ldsRing2}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <div>{title}</div>
    </div>
  );
}

export default Loader2;

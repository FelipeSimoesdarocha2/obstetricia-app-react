import React from "react";
import styles from "./Switch.module.scss";

interface ISwitchProps {
  onChange: () => void;
}

function Switch(props: ISwitchProps) {
  const { onChange } = props;

  return (
    <label className={styles.switch} htmlFor="switch">
      <input type="checkbox" id="switch" onChange={onChange} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
}

export default Switch;

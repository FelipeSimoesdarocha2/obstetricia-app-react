import React from "react";
import styles from "./Checkbox.module.scss";

interface ICheckboxProps {
  title: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

function Checkbox(props: ICheckboxProps) {
  const { title, disabled, checked, onChange } = props;

  const handleOnChange = () => {
    onChange(!checked);
  };

  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        onChange={handleOnChange}
        disabled={disabled}
        checked={checked}
      />
      <span>{title}</span>
    </div>
  );
}

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
};

export default Checkbox;

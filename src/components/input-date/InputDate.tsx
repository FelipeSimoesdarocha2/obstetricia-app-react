import React, { ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import Input from "../input/Input";
import styles from "./InputDate.module.scss";

interface IInputPhoneProps {
  id: string;
  label: string;
  info?: string;
  icon?: ReactElement<SvgIconComponent>;
  value?: string;
  width?: string;
  required?: boolean;
  max?: string;
  min?: string;

  disabled?: boolean;
  onChange: (value: string) => void;
}

function InputDate(props: IInputPhoneProps) {
  const {
    id,
    label,
    info,
    icon,
    value,
    width,
    required,
    max,
    min,
    disabled,
    onChange,
  } = props;

  return (
    <Input
      width={width}
      id={id}
      label={label}
      info={info}
      onChange={onChange}
      type="date"
      required={required}
      icon={icon}
      className={styles.inputDate}
      value={value}
      max={max}
      min={min}
      disabled={disabled}
    />
  );
}

InputDate.defaultProps = {
  info: "",
  icon: null,
  value: "",
  width: "",
  required: false,
  max: undefined,
  min: undefined,
};

export default InputDate;

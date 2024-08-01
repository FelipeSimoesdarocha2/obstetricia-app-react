import React, { useEffect, useState } from "react";
import Input, { IInputValueProps } from "../input/Input";
import styles from "./RadioButton.module.scss";

interface IRadioInputValueProps {
  id: string;
  checked?: boolean;
  label?: string;
  onChange: (value: string) => void;
  required?: boolean; 
}

interface IRadioButtonProps {
  id: string;
  label: string;
  values: IRadioInputValueProps[];
  info?: string;
  width?: string;
}

function RadioButton(props: IRadioButtonProps) {
  const { id, label, info, values, width } = props;
  const [valuesState, setValues] = useState<IInputValueProps[]>([]);

  useEffect(() => {
    setValues(
      values.map((value) => ({
        id: value.id,
        type: "radio",
        name: id,
        classContainer: styles.container,
        checked: value.checked,
        label: value.label,
        onChange: value.onChange,
        required: value.required,
      }))
    );
  }, [values]);

  return (
    <Input
      type="radio"
      id={id}
      key={id}
      label={label}
      info={info}
      values={valuesState}
      width={width}
    />
  );
}

RadioButton.defaultProps = {
  info: "",
  width: "",
};

export default RadioButton;

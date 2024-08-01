import React, { ReactElement } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import Input from "../input/Input";

interface IInputPhoneProps {
  id: string;
  label: string;
  icon?: ReactElement<SvgIconComponent>;
  className?: string;
  value?: string;
  width?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function InputPhone(props: IInputPhoneProps) {
  const { id, label, icon, className, value, width, required, onChange } =
    props;

  return (
    <Input
      width={width}
      id={id}
      label={label}
      onChange={onChange}
      type="text"
      icon={icon}
      className={className}
      value={value}
      mask="(99) 9 9999 9999"
      required={required}
      placeholder="(__) _ ____ ____"
    />
  );
}

InputPhone.defaultProps = {
  icon: null,
  className: "",
  value: "",
  width: "",
  required: false,
};

export default InputPhone;

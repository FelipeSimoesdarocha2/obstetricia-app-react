import React, { ReactElement, useState } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./Select.module.scss";

export interface ISelectValueProps {
  id: string;
  value?: string | number;
  options?: any[];
  icon?: ReactElement<SvgIconComponent>;
  className?: string;
  classContainer?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface ISelectProps {
  id: string;
  label: string;
  info?: string;
  icon?: ReactElement<SvgIconComponent>;
  className?: string;
  value?: string | number;
  options?: any[];
  placeholder?: string;
  width?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function SelectValue(props: ISelectValueProps) {
  const {
    id,
    icon,
    className,
    classContainer,
    value,
    options,
    placeholder,
    label,
    required,
    onChange,
    disabled,
  } = props;

  const [invalidRequired, setInvalidRequired] = useState(false);

  const onChangeValue = (event: any) => {
    const value = event.target?.value ?? "";

    // eslint-disable-next-line eqeqeq
    if ((!value || value == -1) && required) {
      setInvalidRequired(true);
    } else {
      setInvalidRequired(false);
    }

    onChange(value);
  };

  return (
    <div
      className={`${styles.select} ${classContainer} ${
        invalidRequired ? styles.required : null
      }`}
    >
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <select
        id={id}
        className={className}
        value={value}
        required={required}
        onChange={onChangeValue}
        disabled={disabled}
      >
        {placeholder && <option value={-1}>{placeholder}</option>}
        {options?.map((option) => (
          <option value={option.value}>{option.description}</option>
        ))}
      </select>
      <span dangerouslySetInnerHTML={{ __html: label as string }} />
    </div>
  );
}

function Select(props: ISelectProps) {
  const {
    id,
    label,
    info,
    icon,
    className,
    value,
    options,
    placeholder,
    width,
    required,
    onChange,
    disabled,
  } = props;

  return (
    <div className={`${styles.selectContainer}`} style={{ width }}>
      <div className={styles.label}>
        <label
          htmlFor={id}
          data-testid={`${id}-label`}
          dangerouslySetInnerHTML={{ __html: label as string }}
        />
        {info ? (
          <Tooltip title={info} arrow placement="top">
            <InfoIcon />
          </Tooltip>
        ) : null}
      </div>
      <SelectValue
        id={id}
        icon={icon}
        value={value}
        options={options}
        className={className}
        placeholder={placeholder}
        required={required}
        onChange={onChange as (value: string) => void}
        disabled={disabled}
      />
    </div>
  );
}

SelectValue.defaultProps = {
  icon: null,
  value: "",
  options: [],
  className: "",
  classContainer: "",
  label: "",
  placeholder: "",
  required: false,
  disabled: false,
};

Select.defaultProps = {
  info: "",
  icon: null,
  className: "",
  value: "",
  options: [],
  placeholder: "",
  width: "",
  required: false,
  onChange: () => ({}),
  disabled: false,
};

export default Select;

import React, { ReactElement, useState } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import InputMask from "react-input-mask";
import { parse, isAfter, isBefore, format } from "date-fns";
import styles from "./Input.module.scss";

export interface IInputValueProps {
  id: string;
  type: string;
  value?: string | number;
  icon?: ReactElement<SvgIconComponent>;
  mask?: string | (string | RegExp)[];
  className?: string;
  classContainer?: string;
  checked?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  max?: string;
  min?: string;
  height?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  onEnterPress?: (value: string) => void;
  onError?: (error?: any) => void;
}

interface IInputProps {
  id: string;
  type: string;
  label?: string;
  info?: string;
  mask?: string | (string | RegExp)[];
  icon?: ReactElement<SvgIconComponent>;
  className?: string;
  value?: string | number;
  values?: IInputValueProps[];
  placeholder?: string;
  width?: string;
  checked?: boolean;
  modal?: boolean;
  required?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  max?: string;
  min?: string;
  height?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onEnterPress?: (value: string) => void;
}

function InputValue(props: IInputValueProps) {
  const {
    id,
    type,
    mask,
    icon,
    className,
    classContainer,
    value,
    placeholder,
    checked,
    label,
    required,
    disabled,
    textarea,
    max,
    min,
    height,
    onChange,
    onBlur,
    onEnterPress,
    onError,
  } = props;
  const [invalidRequired, setInvalidRequired] = useState(false);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (onEnterPress && event.key === "Enter") {
      onEnterPress((event.target as HTMLInputElement).value);
    }
  };

  const formatDate = (date?: Date) => date && format(date, "dd/MM/yyyy");

  const parseDate = (value?: string) =>
    value && parse(value, "yyyy-MM-dd", new Date());

  const validateDate = (value: any) => {
    const dateValue = parseDate(value);

    if (!dateValue && required) {
      throw Error("Data é invalida");
    }

    if (dateValue && max) {
      const maxDate = parseDate(max) as Date;

      const errorMaxDate = isAfter(dateValue, maxDate);

      if (errorMaxDate) {
        throw Error(`Data não pode ser superior a ${formatDate(maxDate)}`);
      }
    }

    if (dateValue && min) {
      const minDate = parseDate(min) as Date;

      const errorMinDate = isBefore(dateValue, minDate);

      if (errorMinDate) {
        throw Error(`Data não pode ser inferior a ${formatDate(minDate)}`);
      }
    }
  };

  const validateNumber = (value: any) => {
    const numberValue = parseInt(value);

    if (max) {
      const maxNumber = parseInt(max);

      if (numberValue > maxNumber) {
        throw Error(`Valor não pode ser superior a ${max}`);
      }
    }

    if (min) {
      const minNumber = parseInt(min);

      if (numberValue < minNumber) {
        throw Error(`Valor não pode ser inferior a ${min}`);
      }
    }
  };

  const validateValueOnBlur = (value: any) => {
    switch (type) {
      case "date":
        return validateDate(value);
      case "number":
        return validateNumber(value);
      default:
        return true;
    }
  };

  const onChangeValue = (event: any) => {
    const value = event?.target?.value ?? "";

    const requiredError = !value && required;

    setInvalidRequired(!!requiredError);

    onChange(value);
  };

  const toastError = (error: any) => {
    if (onError) {
      onError(error);

      setTimeout(() => onError(undefined), 3000);
    }
  };

  const handleOnError = (error: any) => {
    onChangeValue(undefined);

    toastError(error);
  };

  const handleOnBlur = (e: any) => {
    try {
      validateValueOnBlur(e.target.value);

      if (onBlur) {
        onBlur(e.target.value);
      }
    } catch (error: any) {
      handleOnError(error);
    }
  };

  return (
    <div
      className={`${styles.input} ${classContainer} ${
        invalidRequired ? styles.required : null
      }`}
    >
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      {mask ? (
        <InputMask
          mask={mask}
          className={className}
          type={type}
          key={id}
          required={required}
          disabled={disabled}
          value={value?.toString()}
          placeholder={placeholder}
          onChange={onChangeValue}
          onBlur={handleOnBlur}
        />
      ) : (
        <>
          {textarea ? (
            <textarea
              className={className}
              value={value}
              placeholder={placeholder}
              id={id}
              key={id}
              name={id}
              required={required}
              disabled={disabled}
              data-testid={id}
              onChange={onChangeValue}
              onBlur={handleOnBlur}
              rows={10}
            />
          ) : (
            <input
              className={className}
              type={type}
              value={value}
              placeholder={placeholder}
              id={id}
              key={id}
              name={id}
              required={required}
              disabled={disabled}
              checked={checked}
              data-testid={id}
              onChange={onChangeValue}
              onBlur={handleOnBlur}
              onKeyUp={(event) => onKeyUp(event)}
              max={max}
              min={min}
            />
          )}
          <span dangerouslySetInnerHTML={{ __html: label as string }} />
        </>
      )}
    </div>
  );
}

function Input(props: IInputProps) {
  const {
    id,
    type,
    label,
    info,
    mask,
    icon,
    className,
    value,
    values,
    placeholder,
    width,
    height,
    checked,
    required,
    disabled,
    textarea,
    max,
    min,
    modal,
    onChange,
    onBlur,
    onEnterPress,
  } = props;

  const [error, setError] = useState<any>(undefined);

  const handleOnError = (error: any) => setError(error);

  return (
    <div
      className={`${modal ? styles.modal : styles.inputContainer}`}
      style={{ width }}
    >
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
      {values?.length ? (
        values.map((input) => (
          <InputValue
            key={input.id}
            id={input.id}
            icon={input.icon}
            type={input.type}
            value={input.value}
            label={input.label}
            className={input.className}
            classContainer={input.classContainer}
            mask={input.mask}
            checked={input.checked}
            placeholder={input.placeholder}
            required={input.required}
            disabled={input.disabled}
            textarea={input.textarea}
            max={input.max}
            min={input.min}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onEnterPress={input.onEnterPress}
            onError={handleOnError}
            height={height}
          />
        ))
      ) : modal ? (
        <>
          <InputValue
            id={id}
            icon={icon}
            type={type}
            value={value}
            checked={checked}
            className={className}
            mask={mask}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            textarea={textarea}
            max={max}
            min={min}
            onChange={onChange as (value: string) => void}
            onBlur={onBlur as (value: string) => void}
            onEnterPress={onEnterPress}
            onError={handleOnError}
            height={height}
          />
        </>
      ) : (
        <InputValue
          id={id}
          icon={icon}
          type={type}
          value={value}
          checked={checked}
          className={className}
          mask={mask}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          textarea={textarea}
          max={max}
          min={min}
          onChange={onChange as (value: string) => void}
          onBlur={onBlur as (value: string) => void}
          onEnterPress={onEnterPress}
          onError={handleOnError}
          height={height}
        />
      )}
      {error && <p className={styles.inputError}>{error.message}</p>}
    </div>
  );
}

InputValue.defaultProps = {
  mask: "",
  icon: null,
  value: "",
  className: "",
  classContainer: "",
  checked: undefined,
  label: "",
  placeholder: "",
  required: false,
  disabled: false,
  textarea: false,
  max: undefined,
  min: undefined,
  onBlur: () => ({}),
  onEnterPress: () => ({}),
  onError: () => ({}),
};

Input.defaultProps = {
  info: "",
  mask: "",
  icon: null,
  className: "",
  value: "",
  values: [],
  placeholder: "",
  width: "",
  checked: undefined,
  required: false,
  disabled: false,
  textarea: false,
  max: undefined,
  min: undefined,
  onChange: () => ({}),
  onBlur: () => ({}),
  onEnterPress: () => ({}),
};

export default Input;

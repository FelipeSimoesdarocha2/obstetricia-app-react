import { SvgIconComponent } from "@mui/icons-material";
import React, { ReactElement } from "react";
import Loader from "../loader/Loader";
import styles from "./Button.module.scss";

export interface IButtonProps {
  name: string;
  active?: boolean;
  iconLeft?: ReactElement<SvgIconComponent>;
  iconRight?: ReactElement<SvgIconComponent>;
  className?: string;
  title?: string;
  loading?: boolean;
  isSubmit?: boolean;
  disabled?: boolean;
  type?: "primary" | "secondary";
  style?: any;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button(props: IButtonProps) {
  const {
    name,
    active,
    iconLeft,
    iconRight,
    className,
    title,
    loading,
    isSubmit,
    disabled,
    type = "primary",
    style,
    onClick,
  } = props;

  const buttonName = () => {
    return name ? <p className={styles.buttonName}>{name}</p> : null;
  };

  return (
    <button
      data-testid="button"
      title={title}
      className={`${styles.btn} ${styles[type]} ${className} ${
        active ? styles.active : ""
      }`}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      <span>{iconLeft}</span>
      <span>{loading ? <Loader /> : buttonName()}</span>
      <span>{iconRight}</span>
    </button>
  );
}

Button.defaultProps = {
  active: false,
  iconLeft: "",
  iconRight: "",
  className: "",
  title: "",
  loading: false,
  isSubmit: false,
  disabled: false,
  type: "primary",
  style: undefined,
  onClick: () => ({}),
};

export default Button;

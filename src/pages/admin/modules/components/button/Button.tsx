// React
import * as React from "react";

// Styles
import * as S from "./Button.styles";

// Models
import { IButtonProps } from "./models";

const Button = ({
  label,
  isSubmit,
  loading,
  disabled,
  active,
  className,
  type = "primary",
  onClick,
}: IButtonProps) => {
  return (
    <S.Component
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
      disabled={disabled || loading}
      className={`${[type]} ${className} ${active ? "active" : ""}`}
    >
      {loading ? <p>Carregando...</p> : <p>{label}</p>}
    </S.Component>
  );
};

export default Button;

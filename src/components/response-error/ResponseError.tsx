import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import styles from "./ResponseError.module.scss";

interface IResponseErrorProps {
  message: string;
}

function ResponseError(props: IResponseErrorProps) {
  const { message } = props;

  return <span className={styles.responseError}>{message}<ErrorIcon /></span>;
}

export default ResponseError;

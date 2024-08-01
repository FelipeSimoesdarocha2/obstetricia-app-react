/* eslint-disable*/
/* eslint-disable eqeqeq */
/* eslint-disable radix */

import React from "react";
import { useDropzone, Accept } from "react-dropzone";

import Button from "../../../../../../../../components/button/Button";

import styles from "./DropZone.module.scss";
import outcomeImg from "./cloud-upload.svg";

import LinearProgress from "@mui/material/LinearProgress";

interface iProps {
  disabled?: boolean;
  loading?: boolean;
  accept?: Accept;
  multiple?: boolean;
  onChange: (files: any[]) => void;
}

const DropZone: React.FC<iProps> = ({
  disabled,
  loading,
  accept,
  multiple,
  onChange,
}) => {
  const handleOnDrop = (files: any) => {
    onChange(files);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    disabled,
    accept,
    multiple,
    noClick: true,
    onDrop: handleOnDrop,
  });

  return (
    <>
      <div className={`${styles.container}`}>
        <div {...getRootProps()} className={`${styles.content}`}>
          <input {...getInputProps()} />
          <img src={outcomeImg} alt="Saida" />
          <p>Arraste arquivos aqui</p>
        </div>
      </div>
      {loading && <LinearProgress sx={{ color: "#3E6C75" }} />}
      {!loading && (
        <Button
          disabled={disabled}
          name="SELECIONAR ARQUIVOS DO COMPUTADOR"
          className={styles.buttonSelector}
          onClick={open}
        />
      )}
    </>
  );
};

export default DropZone;

import React from "react";
import { Skeleton } from "@mui/material";
import styles from "./Info.module.scss";

interface IInfoCardProps {
  isLoading: boolean;
  title: string;
  value: string;
}

function InfoCard(props: IInfoCardProps) {
  const { isLoading, title, value } = props;

  return (
    <div>
      {isLoading ? (
        <Skeleton height={50} />
      ) : (
        <div className={styles.infoCard}>
          <span>{title}</span>
          <strong>{value || "Não informado"}</strong>
        </div>
      )}
    </div>
  );
}

export default InfoCard;

import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PrintService.module.scss";
import { ExameLaboratorial } from "@core/@http/carteirinha/carteirinhaType";
import moment from "moment";

function Tabela({
  title,
  data,
}: {
  title: string;
  data?: {
    nome: string;
    date: string;
    resultado: string;
  }[];
}) {
  const { id } = useParams();
  return (
    <>
      <div className={styles.containerPadding}>
        <span className={styles.titleRow}>{title}</span>
      </div>
      <div className={styles.line} />
      <div className={styles.spacer25} />
      <div className={styles.container}>
        <div className={`${styles.row} ${styles.between}`}>
          <div className={styles.container33}>
            <span className={styles.textBold}>Nome</span>
          </div>
          <div className={styles.container33}>
            <span className={styles.textBold}>Data</span>
          </div>
          <div className={styles.container33}>
            <span className={styles.textBold}>Resultado</span>
          </div>
        </div>
      </div>
      {data?.map((exame) => (
        <>
          <div className={styles.line} />
          <div className={styles.container}>
            <div className={`${styles.row} ${styles.between}`}>
              <div className={styles.container33Padding}>
                <span className={styles.text}>{exame.nome}</span>
              </div>
              <div className={styles.container33Padding}>
                <span className={styles.text}>
                  {moment(exame.date).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className={styles.container33Padding}>
                <span className={styles.text}>{exame.resultado}</span>
              </div>
            </div>
          </div>
        </>
      ))}
      <div className={styles.line} />
    </>
  );
}

export default Tabela;

import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PrintService.module.scss";
import { Consulta } from "@core/@http/carteirinha/carteirinhaType";
import moment from "moment";

function ConsultaC({ data }: { data: Consulta[] }) {
  const { id } = useParams();
  return (
    <>
      <div className={styles.containerPadding}>
        <span className={styles.titleRow}>Consultas</span>
      </div>
      <div className={styles.line} />
      <div className={styles.spacer25} />
      {data.map((consulta) => (
        <>
          <div className={styles.container}>
            <div className={`${styles.row} ${styles.between}`}>
              <div className={styles.column}>
                <span className={styles.textBold}>Data</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>
                  {moment(consulta.date).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>IG</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>
                  {consulta.idadeGestacional ?? "-"}
                </span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>Peso</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>{consulta.peso ?? "-"}</span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>Edema</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>{consulta.edema ?? "-"}</span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>PA</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>
                  {consulta.pressaoArterial ?? "-"}
                </span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>Altura Uterina</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>
                  {consulta.alturaUterina ?? "-"}
                </span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>BCF</span>
                <div className={styles.spacer8} />
                <span className={styles.text}>{consulta.bcf ?? "-"}</span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>Ap. fetal</span>
                {console.log("Ap. fetal", consulta.movimentacaoFetal)}
                <div className={styles.spacer8} />
                <span className={styles.text}>
                  {consulta.movimentacaoFetal ? "Sim" : "Não"}
                </span>
              </div>
              <div className={styles.column}>
                <span className={styles.textBold}>Toque</span>
                <div className={styles.spacer8} />
                {/* <span className={styles.text}>{consulta.peso ?? "-"}</span> */}
                <span className={styles.text}>-</span>
              </div>
            </div>
          </div>
          <div className={styles.spacer25} />
          {consulta.conduta && (
            <div className={`${styles.containerPadding}`}>
              <div className={`${styles.row}`}>
                <span className={styles.textBold}>Conduta</span>
                <div className={styles.spacer25} />
                <span className={styles.text}>{consulta.conduta ?? "-"}</span>
              </div>
            </div>
          )}
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.spacer25} />
        </>
      ))}
    </>
  );
}

export default ConsultaC;

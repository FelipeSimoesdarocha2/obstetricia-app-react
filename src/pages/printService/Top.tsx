import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PrintService.module.scss";
import LogoCenter from "./imagens/logoCenter.png";
import { CarteirinhaImprimir } from "@core/@http/carteirinha/carteirinhaType";
import { IPatientDetails } from "@core/models/patient";

function Top({
  patient,
  data,
}: {
  patient: IPatientDetails | null | undefined;
  data: CarteirinhaImprimir;
}) {
  const { id } = useParams();
  console.log(2222, patient);
  return (
    <>
      <div className={styles.container}>
        <img
          src={data.imagemPaciente ?? LogoCenter}
          className={styles.imageCenter}
          alt="logo-center"
        />
      </div>
      <div className={styles.spacer25} />
      <div className={styles.container}>
        <span className={styles.textBold}>{patient?.nome}</span>
      </div>
      <div className={styles.spacer8} />
      <div className={styles.container}>
        <span className={styles.text}>{patient?.phone}</span>
      </div>
      <div className={styles.spacer8} />
      <div className={styles.container}>
        <span className={styles.text}>{patient?.email}</span>
      </div>
      <div className={styles.spacer25} />
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <span className={styles.text}>Obstetra</span>
            <div className={styles.spacer8} />
            <span className={styles.text}>Convênio</span>
            <div className={styles.spacer8} />
            <span className={styles.text}>Risco</span>
          </div>
          <div className={styles.column}>
            <span className={styles.textBold}>
              {data?.obstetraPaciente ?? "-"}
            </span>
            <div className={styles.spacer8} />
            <span className={styles.textBold}>
              {data?.convenioPaciente ?? "-"}
            </span>
            <div className={styles.spacer8} />
            <span className={styles.textBold}>
              {data?.riscoPaciente ?? "-"}
            </span>
          </div>
          <div className={styles.column}>
            <span className={styles.text}>1ª ECO</span>
            <div className={styles.spacer8} />
            <span className={styles.text}>IG ECO</span>
            <div className={styles.spacer8} />
            <span className={styles.text}>DPP ECO</span>
          </div>
          <div className={styles.column}>
            <span className={styles.textBold}>
              {data?.firstEcoPaciente ?? "-"}
            </span>
            <div className={styles.spacer8} />
            <span className={styles.textBold}>
              {data?.igEcoPaciente ?? "-"}
            </span>
            <div className={styles.spacer8} />
            <span className={styles.textBold}>
              {data?.dppEcoPaciente ?? "-"}
            </span>
          </div>
          <div className={styles.column}>
            <span className={styles.text}>DUM</span>
            <div className={styles.spacer8} />
            <span className={styles.text}>IG DUM</span>
            <div className={styles.spacer8} />
            <span className={styles.text}>DPP DUM</span>
          </div>
          <div className={styles.column}>
            <span className={styles.textBold}>{data?.dumPaciente ?? "-"}</span>
            <div className={styles.spacer8} />
            <span className={styles.textBold}>
              {data?.igDumPaciente ?? "-"}
            </span>
            <div className={styles.spacer8} />
            <span className={styles.textBold}>
              {data?.dppDumPaciente ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Top;

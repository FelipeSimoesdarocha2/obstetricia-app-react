import styles from "./PrintService.module.scss";

function Historico({ title, data }: { title: string; data: string[] }) {
  return (
    <>
      <div className={styles.containerPadding}>
        <span className={styles.titleRow}>{title}</span>
      </div>
      <div className={styles.line} />
      <div className={styles.spacer25} />
      <div className={styles.containerPadding}>
        {data.map((item) => (
          <div className={styles.containerHistorico}>
            <span className={styles.textHistorico}>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Historico;

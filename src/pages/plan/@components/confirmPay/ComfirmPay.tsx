import styles from "./ComfirmPay.module.scss";
import Illustration from "../../../../@core/images/bannerPay.svg";

function ComfirmPay() {
  return (
    <div className={styles.container}>
      <h1>
        Estamos aguardando a confirmação do seu <br />
        pagamento, [user]!
      </h1>

      <img src={Illustration} alt="Ilustração" />

      <div className={styles.highlight}>
        <p>
          Pode levar alguns minutos após o pagamento do boleto para <br />
          ocorrer a liberação de sua conta.
        </p>

        <p>
          Em caso de dúvidas, <b>entre em contato.</b>
        </p>
      </div>
    </div>
  );
}

export default ComfirmPay;

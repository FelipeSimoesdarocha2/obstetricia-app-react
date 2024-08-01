import React, { useState } from "react";
import { LocalStorage } from "@core/helpers/localStorage";
import { googleLogout } from '@react-oauth/google';
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import styles from "./Upgrade.module.scss";
import Illustration from "../../@core/images/banner.svg";
import UpgradeModal from "./@components/upgradeModal";
import Button from "../../components/button/Button";

function Upgrade() {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const doctorName = localStorage.getItem(LocalStorage.DoctorName) || '';

  const logout = () => {
    const cookie = new Cookie();
    cookie.remove("token_api");
    googleLogout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1>Esperamos que siga seu caminho conosco, {doctorName}!</h1>
      <img src={Illustration} alt="Ilustração" />

      <p className={styles.highlight}>Seu período de teste grátis chegou ao fim.</p>
      <p className={styles.highlight}>Seus dados e de suas pacientes serão deletados em [x] dias.</p>
      <p className={styles.highlight && styles.highlights}>
        Assine a<b> ObstCare e mantenha o cuidado das suas pacientes!</b>
      </p>

      <div className={styles.containerButton}>
        <Button
          name="NÃO ESTOU INTERESSADO"
          onClick={logout}
          type="secondary"
        />

        <Button
          name="ESCOLHER PLANO"
          onClick={() => setOpenModal(true)}
          type="primary"
        />

        <UpgradeModal open={openModal} onClose={() => setOpenModal(false)} />
      </div>
      <div className={styles.containerLogin}>
        <button
          type="button"
          className={styles.btnLogin}
          onClick={logout}
        >
          Ir para a tela de login
          <DoubleArrowIcon className={styles.iconShowLogin} />
        </button>
      </div>
      <p className={styles.highlight}>Quer ajuda para decidir seus próximos passos? <b>Entre em contato</b></p>
    </div>
  );
}

export default Upgrade;

import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PrintService.module.scss";
import Logo from "./imagens/logo.png";
import QrCode from "./imagens/qrcode.png";
import PublicIcon from "@mui/icons-material/Public";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

function Header() {
  const { id } = useParams();
  return (
    <div className={styles.containerHeader}>
      <img src={Logo} className={styles.logo} />
      <img src={QrCode} className={styles.qrcode} />
      <div className={styles.containerText}>
        <div className={styles.containerLine}>
          <PublicIcon className={styles.icon} />
          <span className={styles.siteBold}>www.obstcare.com</span>
        </div>
        <div className={styles.containerLine}>
          <InstagramIcon className={styles.icon} />
          <span className={styles.site}>@obstcare</span>
        </div>
        <div className={styles.containerLine}>
          <WhatsAppIcon className={styles.icon} />
          <span className={styles.site}>51 99917-3011</span>
        </div>
        <div className={styles.containerLine}>
          <EmailIcon className={styles.icon} />
          <span className={styles.site}>contato@obstcare.com</span>
        </div>
      </div>
    </div>
  );
}

export default Header;

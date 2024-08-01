import React from "react";
import styles from "./RecoveryPassword.module.scss";
import logo from "../../@core/images/Logo.png";
import logoShort from "../../@core/images/Logo_Short.png";
import RecoverPasswordCreateContentContainer from "./contentContainer/RecoverPasswordCreateContentContainer";
import { useQuery } from "@core/hooks/query";

function ResetPass() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginImage}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <img className={styles.logoShort} src={logoShort} alt="Logo Short" />
      </div>
      <RecoverPasswordCreateContentContainer key="loginContentContainerOuter" />
    </div>
  );
}

export default ResetPass;

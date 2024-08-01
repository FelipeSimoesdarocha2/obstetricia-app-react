import React from "react";
import logo from "@core/images/Logo.png";
import logoShort from "@core/images/Logo_Short.png";
import styles from "./EmailConfirmation.module.scss";
import EmailConfirmationContentContainer from "./contentContainer/EmailConfirmationContentContainer";

function LoginCreate() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <img className={styles.logoShort} src={logoShort} alt="Logo Short" />
      </div>
      <EmailConfirmationContentContainer />
    </div>
  );
}

export default LoginCreate;

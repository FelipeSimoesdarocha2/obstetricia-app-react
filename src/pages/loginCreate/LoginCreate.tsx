import React from "react";
import styles from "./Login.module.scss";
import logo from "../../@core/images/Logo.png";
import logoShort from "../../@core/images/Logo_Short.png";
import LoginCreateContentContainer from "./contentContainer/LoginCreateContentContainer";

function LoginCreate() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginImage}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <img className={styles.logoShort} src={logoShort} alt="Logo Short" />
      </div>
      <LoginCreateContentContainer key="loginContentContainerOuter" />
    </div>
  );
}

export default LoginCreate;

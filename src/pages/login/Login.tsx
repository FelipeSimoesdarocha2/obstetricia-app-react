import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import styles from "./Login.module.scss";
import logo from "../../@core/images/Logo.png";
import logoShort from "../../@core/images/Logo_Short.png";
import LoginContentContainer from "./contentContainer/LoginContentContainer";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = new Cookie();
    const tokenApi = cookie.get("token_api");

    if (tokenApi) {
      navigate("/");
    }
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginImage}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <img className={styles.logoShort} src={logoShort} alt="Logo Short" />
      </div>
      <LoginContentContainer key="loginContentContainerOuter" />
    </div>
  );
}

export default Login;

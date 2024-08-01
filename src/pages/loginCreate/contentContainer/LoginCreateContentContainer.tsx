import React from "react";
import CreateForm from "../form/CreateForm";
import styles from "../Login.module.scss";

function LoginCreateContentContainer() {
  const defaultClassAnimateLoginForm = "animate__animated animate__bounceIn";

  return (
    <div
      data-testid="loginFormContainer"
      className={`${styles.loginFormContainer} ${defaultClassAnimateLoginForm}`}
    >
      <CreateForm className={styles.loginFormOuter}
      />
    </div>
  )
}

export default LoginCreateContentContainer;

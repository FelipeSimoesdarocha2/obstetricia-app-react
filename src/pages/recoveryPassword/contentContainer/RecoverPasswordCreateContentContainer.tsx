import React from "react";
import CreateForm from "../form/CreateForm";
import styles from "../RecoveryPassword.module.scss";

function RecoverPasswordCreateContentContainer() {
  const defaultClassAnimateLoginForm = "animate__animated animate__bounceIn";

  return (
    <div
      data-testid="recoverPasswordCreateContentContainerFormContainer"
      className={`${styles.loginFormContainer} ${defaultClassAnimateLoginForm}`}
    >
      <CreateForm className={styles.loginFormOuter} />
    </div>
  );
}

export default RecoverPasswordCreateContentContainer;

import React, { useState } from "react";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import LoginForm from "../form/LoginForm";
import styles from "../Login.module.scss";

function LoginContentContainer() {
  const defaultClassAnimateForgotPassword =
    "animate__animated animate__backInRight";

  const defaultClassAnimateLoginForm = "animate__animated animate__bounceIn";

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [
    classAnimateForgotPasswordContainer,
    setClassAnimateForgotPasswordContainer,
  ] = useState(defaultClassAnimateForgotPassword);

  const [classAnimateLoginFormContainer, setClassAnimateLoginFormContainer] =
    useState(defaultClassAnimateLoginForm);

  const getClassAnimateForgotPasswordContainer = (
    forgotPassword: boolean
  ): string => {
    if (forgotPassword) {
      return defaultClassAnimateForgotPassword;
    }

    return "animate__animated animate__backOutRight";
  };

  const getClassAnimateLoginFormContainer = (
    forgotPassword: boolean
  ): string => {
    if (!forgotPassword) {
      return defaultClassAnimateLoginForm;
    }

    return "animate__animated animate__bounceOut";
  };

  const handleClickForgotPassword = (forgotPassword: boolean): void => {
    setClassAnimateForgotPasswordContainer(
      getClassAnimateForgotPasswordContainer(forgotPassword)
    );

    setClassAnimateLoginFormContainer(
      getClassAnimateLoginFormContainer(forgotPassword)
    );

    setTimeout(() => {
      setShowForgotPassword(forgotPassword);
    }, 500);
  };

  return !showForgotPassword ? (
    <div
      data-testid="loginFormContainer"
      className={`${styles.loginFormContainer} ${classAnimateLoginFormContainer}`}
    >
      <LoginForm
        className={styles.loginFormOuter}
        onClickForgotPassword={() => handleClickForgotPassword(true)}
      />
    </div>
  ) : (
    <div
      data-testid="forgotPasswordContainer"
      className={`${styles.forgotPasswordContainer} ${classAnimateForgotPasswordContainer}`}
    >
      <ForgotPassword onClickGoBack={() => handleClickForgotPassword(false)} />
    </div>
  );
}

export default LoginContentContainer;

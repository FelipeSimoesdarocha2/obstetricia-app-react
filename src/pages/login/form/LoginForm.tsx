import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Cookie from "universal-cookie";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import styles from "./LoginForm.module.scss";
import auth from "../../../@core/@http/auth/auth";
import ResponseError from "../../../components/response-error/ResponseError";
import Checkbox from "../../../components/checkbox/Checkbox";
import { IUserLogin } from "../../../@core/models/userLogin";

interface ILoginFormProps {
  className?: string;
  onClickForgotPassword: () => void;
}

function LoginForm(props: ILoginFormProps) {
  const { className, onClickForgotPassword } = props;
  const [user, setUser] = useState<IUserLogin>({
    email: "otoniel.candido47@gmail.com",
    password: "123",
    // email: "",
    // password: "",
  });
  const [responseErrorMessage, setResponseErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogleLoging, setLoadingGoogleLoging] = useState(false);
  const [checkedRememberMe, setCheckedRememberMe] = useState(false);
  const navigate = useNavigate();

  const clickForgotPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClickForgotPassword();
  };

  const onChangeRememberMe = (checked: boolean) => {
    setCheckedRememberMe(checked);

    const cookie = new Cookie();
    if (!checked) {
      cookie.remove("remember_me_username");
      cookie.remove("remember_me_password");
      return;
    }

    cookie.set("remember_me_username", user.email);
    cookie.set("remember_me_password", user.password, {
      sameSite: true,
      secure: true,
    });
  };

  const onChangeUsername = (email: string) => {
    setUser({ ...user, email });
    onChangeRememberMe(false);
  };

  const onChangePassword = (password: string) => {
    setUser({ ...user, password });
    onChangeRememberMe(false);
  };

  const onClickLogin = async (credentials?: string) => {
    try {
      setResponseErrorMessage("");

      let response;

      if (credentials !== undefined) {
        setLoadingGoogleLoging(true);

        response = await auth.googleLogin(credentials);
      } else {
        setLoading(true);
        response = await auth.login(user);
      }

      if (!response.success) {
        throw Error(response.message);
      }

      navigate("/");
    } catch (error: any) {
      setResponseErrorMessage(error.message);
    } finally {
      setLoading(false);
      setLoadingGoogleLoging(false);
    }
  };

  const setDefaultState = (): void => {
    setUser({ password: "", email: "" });
    setCheckedRememberMe(false);
  };

  useEffect(() => {
    const cookie = new Cookie();
    const usernameCookie = cookie.get("remember_me_username");
    const passwordCookie = cookie.get("remember_me_password");
    if (!usernameCookie || !passwordCookie) {
      return setDefaultState;
    }
    setUser({ email: usernameCookie, password: passwordCookie });
    setCheckedRememberMe(true);

    return setDefaultState;
  }, []);

  return (
    <div className={`${styles.loginContainer} ${className}`}>
      <h1>Acesso do ObstCare</h1>

      {/* <div>
        <span>
          {loadingGoogleLoging ? (
            <div>
              <Loader2 title="Autenticando ..." />
            </div>
          ) : (
            <GoogleLogin
              theme="outline"
              width="250px"
              size="large"
              shape="pill"
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential !== undefined) {
                  await onClickLogin(credentialResponse.credential);
                }
              }}
              onError={() => {
                setResponseErrorMessage('Erro ao logar com a conta google.');
              }}
            />
          )}
        </span>
      </div>

      <div className={styles.divide}>
        <span>Ou</span>
      </div> */}

      <div className={styles.containerInput}>
        <Input
          key="input-user"
          type="email"
          value={user.email}
          placeholder="Digite seu email"
          label="Email"
          id="user"
          onChange={onChangeUsername}
        />

        <Input
          key="input-password"
          type="password"
          value={user.password}
          placeholder="Digite sua senha"
          label="Senha"
          id="password"
          onChange={onChangePassword}
        />

        {responseErrorMessage ? (
          <ResponseError message={responseErrorMessage} />
        ) : (
          ""
        )}
      </div>

      <div className={styles.RememberAndPassword}>
        <div className={styles.containerRememberMe}>
          <Checkbox
            onChange={onChangeRememberMe}
            title="Lembrar login"
            checked={checkedRememberMe}
          />
        </div>

        <div className={styles.containerForgotPassword}>
          <button
            type="button"
            className={styles.btnFogotPassword}
            onClick={(event) => clickForgotPassword(event)}
          >
            Esqueci a senha
            <DoubleArrowIcon className={styles.iconShowForgotPassword} />
          </button>
        </div>
      </div>

      <div className={styles.containerButton}>
        <Button
          name="Entrar"
          isSubmit
          onClick={() => onClickLogin()}
          loading={loading}
        />
      </div>

      <div className={styles.containerButton}>
        <Button
          name="Criar uma conta"
          onClick={() => navigate("/login/create")}
          loading={loading}
          type="secondary"
        />
      </div>
    </div>
  );
}

LoginForm.defaultProps = {
  className: "",
};

export default LoginForm;

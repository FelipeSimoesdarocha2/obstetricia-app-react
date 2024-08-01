// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./LoginForm.module.scss";

// Universal-cookie
import Cookie from "universal-cookie";

// Components
import Button from "../../../../../components/button/Button";
import Input from "../../../../../components/input/Input";
import ResponseError from "../../../../../components/response-error/ResponseError";
import Checkbox from "../../../../../components/checkbox/Checkbox";

// Models
import { UserLogin } from "pages/admin/models";

// Api
import auth from "../../../../../@core/@http/auth/auth";

function LoginScreen() {
  const [user, setUser] = useState<UserLogin>({ email: "obstcareadmin@gmail.com", password: "123" });
  const [loading, setLoading] = useState(false);
  const [responseErrorMessage, setResponseErrorMessage] = useState("");
  const [checkedRememberMe, setCheckedRememberMe] = useState(false);
  const navigate = useNavigate();

  const onChangeRememberMe = (checked: boolean) => {
    setCheckedRememberMe(checked);

    const cookie = new Cookie();
    if (!checked) {
      cookie.remove("remember_me_username_admin");
      cookie.remove("remember_me_password");
      return;
    }

    cookie.set("remember_me_username_admin", user.email);
    cookie.set("remember_me_password_admin", user.password, {
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

  const onClickLogin = async () => {
    try {
      setLoading(true);
      setResponseErrorMessage("");

      const response = await auth.loginAdmin(user);

      if (!response.success) {
        throw Error(response.message);
      }

      navigate("/admin/home");
    } catch (error: any) {
      setResponseErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultState = (): void => {
    setUser({ password: "", email: "" });
    setCheckedRememberMe(false);
  };

  useEffect(() => {
    const cookie = new Cookie();
    const usernameCookie = cookie.get("remember_me_username_admin");
    const passwordCookie = cookie.get("remember_me_password_admin");
    if (!usernameCookie || !passwordCookie) {
      return setDefaultState;
    }
    setUser({ email: usernameCookie, password: passwordCookie });
    setCheckedRememberMe(true);

    return setDefaultState;
  }, []);

  return (
    <div className={`${styles.loginContainer} `}>
      <h1>Acesso do ObstCare Admin</h1>

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

        {responseErrorMessage && (
          <ResponseError message={responseErrorMessage} />
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
      </div>

      <div className={styles.containerButton}>
        <Button
          name="Entrar"
          isSubmit
          onClick={onClickLogin}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default LoginScreen;

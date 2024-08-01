import { useState, useEffect } from "react";
import RadioButton from "components/radio/RadioButton";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useToast } from "providers/ToastProvider/ToastProvider";
import Select from "components/select/Select";
import auth from "../../../@core/@http/auth/auth";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import styles from "./CreateForm.module.scss";
import ResponseError from "../../../components/response-error/ResponseError";
import { IUserCreate } from "../../../@core/models/userLogin";

function LoginForm() {
  const [user, setUser] = useState<IUserCreate>({
    name: "",
    password: "",
    email: "",
    crm: "",
    uf: "",
    phone: "",
    Cargo: 0
  });
  const [password, setPassWord] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [responseErrorMessage, setResponseErrorMessage] = useState("");
  const [actionsDisabled, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingGoogleLoging, setLoadingGoogleLoging] = useState(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const setDefaultState = (): void => {
    setUser({
      name: "",
      password: "",
      email: "",
      crm: "",
      uf: "",
      phone: "",
      Cargo: 0
    });
    setDisabledButton(true);
  };  

  const onChangeCargo = (type: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      Cargo: type
    }));
  };  

  useEffect(() => {
    setDisabledButton(false);
    return setDefaultState;
  }, []);
  /* eslint-disable */
  const onClickLogin = async (credentials?: string) => {
    /* eslint-disable */
    try {
      setResponseErrorMessage("");

      if (!Object.values(user).every(value => value !== null && value !== undefined)) {
        return setResponseErrorMessage("Todos os campos devem ser preenchidos");
    }
      if (!email) return setResponseErrorMessage("Os emails não coincidem ");

      if (!password) return setResponseErrorMessage("As senhas não coincidem ");

      if (password && password !== user.password) {
        setResponseErrorMessage("As senhas não coincidem");
        return;
      }

      if (email && email !== user.email) {
        setResponseErrorMessage("Os emails não coincidem");
        return;
      }

      let response;

      if (credentials !== undefined) {
        setLoadingGoogleLoging(true);
        response = await auth.googleLogin(credentials);
      } else {
        setLoading(true);
        response = await auth.register(user);
        if (response.success) {
          toast.success({
            title: "Obstcare",
            message: "Enviamos um e-mail para você ativar sua conta.",
          });
        }
      }

      if (!response.success) {
        throw Error(response.message);
      }

      navigate("/");
    } catch (error: any) {
      setResponseErrorMessage(error.response?.data || error.message);
    } finally {
      setLoading(false);
      setLoadingGoogleLoging(false);
    }
  };

  return (
    <div className={`${styles.loginContainer}`}>
      <div className={styles.info}>
        <h2>CRIAR UMA CONTA </h2>
        <h1>OBSTCARE</h1>

        <p>
          Saiba todos os detalhes de suas
          <br />
          gestantes em tempo real.
        </p>
      </div>

      {/* <div className={styles.googleButton}>
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
      </div> */}

      {/* <div className={styles.divide}>
        <Divider className={styles.one} />
        <span>Ou</span>
        <Divider className={styles.two} />
      </div> */}

      <div className={styles.containerInput}>
        <Input
          key="input-name"
          type="name"
          value={user.name}
          placeholder="Digite o nome completo"
          label="Nome Completo"
          id="name"
          onChange={(e) => {
            setUser({ ...user, name: e });
          }}
        />

        <div className={styles.typeCargo}>
          <RadioButton
            id="typeCargo"
            label="Cadastrar-se como médico(a) ou enfermeiro(a)?"
            values={[
              {
                id: "enfermeiro",
                label: "Enfermeiro(a)",
                checked:user.Cargo === 0,
                onChange: (_) => onChangeCargo(0),
              },
              {
                id: "medico",
                label: "Médico(a)",
                checked: user.Cargo === 1,
                onChange: (_) => onChangeCargo(1),
              },
            ]}
          />
        </div>

        <div className={styles.uf_crm}>
          <p>CRM/COREN</p>
          <div>
            <Select
              id="uf"
              value={user.uf}
              label=""
              placeholder="UF"
              required
              options={[
                { value: 0, description: "AC" },
                { value: 1, description: "AL" },
                { value: 2, description: "AP" },
                { value: 3, description: "AM" },
                { value: 4, description: "BA" },
                { value: 5, description: "CE" },
                { value: 6, description: "DF" },
                { value: 7, description: "ES" },
                { value: 8, description: "GO" },
                { value: 9, description: "MA" },
                { value: 10, description: "MT" },
                { value: 11, description: "MS" },
                { value: 12, description: "MG" },
                { value: 13, description: "PA" },
                { value: 14, description: "PB" },
                { value: 15, description: "PR" },
                { value: 16, description: "PE" },
                { value: 17, description: "PI" },
                { value: 18, description: "RJ" },
                { value: 19, description: "RN" },
                { value: 20, description: "RS" },
                { value: 21, description: "RO" },
                { value: 22, description: "RR" },
                { value: 23, description: "SC" },
                { value: 24, description: "SP" },
                { value: 25, description: "SE" },
                { value: 26, description: "TO" },
              ]}
              onChange={(e) => {
                setUser({ ...user, uf: e });
              }}
            />
            <Input
              className="inputCrm"
              key="input-crm"
              type="crm"
              value={user.crm}
              placeholder="######"
              label=""
              id="crm"
              onChange={(e) => {
                setUser({ ...user, crm: e });
              }}
            />
          </div>
        </div>       

        <Input
          key="input-phone"
          type="phone"
          value={user.phone}
          placeholder="(##) #####-####"
          label="Celular"
          id="phone"
          onChange={(e) => {
            setUser({ ...user, phone: e });
          }}
        />

        <Input
          key="input-email"
          type="email"
          value={user.email}
          placeholder="Digite seu email"
          label="Email"
          id="user"
          onChange={(e) => {
            setUser({ ...user, email: e });
          }}
        />

        <Input
          key="input-confirm_email"
          type="email"
          value={email}
          placeholder="Confirme o email"
          label="Confirme o E-mail"
          id="confirm_email"
          onChange={(e) => {
            setEmail(e);
          }}
        />

        <Input
          key="input-password"
          type="password"
          value={user.password}
          placeholder="*****"
          label="Senha"
          id="password"
          onChange={(e) => {
            setUser({ ...user, password: e });
          }}
        />

        <Input
          key="input-confirm_password"
          type="password"
          value={password}
          placeholder="*****"
          label="Repita a senha"
          id="password"
          onChange={(e) => {
            setPassWord(e);
          }}
        />
        {responseErrorMessage && (
          <ResponseError message={responseErrorMessage} />
        )}
      </div>
      <div className={styles.containerButton}>
        <Button
          name="TESTE GRÁTIS"
          disabled={actionsDisabled}
          // title={
          //   actionsDisabled
          //     ? "Campos usuário e senha são obrigatórios"
          //     : "Entrar"
          // }
          isSubmit
          onClick={() => onClickLogin()}
          loading={loading}
        />
        <Divider />
        <Button
          name="JÁ POSSUO UMA CONTA"
          disabled={actionsDisabled}
          onClick={() => navigate("/login")}
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

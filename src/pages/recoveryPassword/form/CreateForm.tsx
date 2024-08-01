import { useState, useEffect } from "react";
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
import { useQuery } from "@core/hooks/query";

function ResetPasword() {
  const [password, setPassWord] = useState<string>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
  const [responseErrorMessage, setResponseErrorMessage] = useState("");
  const query = useQuery();
  const token = query.get("token");
  const [actionsDisabled, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingGoogleLoging, setLoadingGoogleLoging] = useState(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const setDefaultState = (): void => {
    setDisabledButton(true);
  };

  useEffect(() => {
    setDisabledButton(false);
    return setDefaultState;
  }, []);

  const onClickReset = async () => {
    try {
      setResponseErrorMessage("");

      if (!password || !passwordConfirmation)
        return setResponseErrorMessage(
          "Todos os campos devem ser preenchidos "
        );

      if (!(password === passwordConfirmation))
        return setResponseErrorMessage("As senhas não coincidem ");

      let response;

      setLoading(true);
      response = await auth.newPassword({
        resetToken: token ?? "",
        newPassword: passwordConfirmation,
      });
      if (response) {
        toast.success({
          title: "Obstcare",
          message: "Senha alterada com sucesso!",
        });
        navigate("/login");
      }
      if (!response.success) {
        throw Error(response.message);
      }

      navigate("/");
    } catch (error: any) {
      setResponseErrorMessage(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.loginContainer}`}>
      <div className={styles.info}>
        <h1>ALTERAR SENHA DE ACESSO</h1>
      </div>
      <div className={styles.containerInput}>
        <Input
          key="input-confirm_password"
          type="password"
          value={password}
          placeholder="*****"
          label="Nova Senha"
          id="password"
          onChange={(e) => {
            setPassWord(e);
          }}
        />

        <Input
          key="input-confirm_password"
          type="password"
          value={passwordConfirmation}
          placeholder="*****"
          label="Confirmar Nova Senha"
          id="password"
          onChange={(e) => {
            setPasswordConfirmation(e);
          }}
        />

        {responseErrorMessage && (
          <ResponseError message={responseErrorMessage} />
        )}
      </div>
      <div className={styles.containerButtons}>
        <Button
          disabled={loading}
          name="Cancelar"
          onClick={() => navigate("/login")}
          type="secondary"
        />
        <Button loading={loading} name="Confirmar" onClick={onClickReset} />
      </div>
    </div>
  );
}

ResetPasword.defaultProps = {
  className: "",
};

export default ResetPasword;

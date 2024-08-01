import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";

import styles from "./ForgotPassword.module.scss";
import auth from "../../../@core/@http/auth/auth";

import { useToast } from '../../../providers/ToastProvider/ToastProvider'

interface IForgotPasswordProps {
  onClickGoBack: () => void;
}

function ForgotPassword(props: IForgotPasswordProps) {
  const { onClickGoBack } = props;
  const [email, setEmail] = useState<string>("");
  
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const clickGoBack = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClickGoBack();
  };

  const onClickSendForgot = async () => {
    try {
      setLoading(true);

      await auth.forgotPassword(email);

      toast.success({
        title: 'Obstcare',
        message: 'Um email de recuperação de senha foi enviado para o email informado!'
      })

      navigate("/");
    } catch (error: any) {
      toast.error({
        title: 'Erro!',
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.forgetPasswordContainer}`}>
      <h1>Alterar senha de acesso</h1>

      <div className={styles.containerEmail}>
        <Input
          type="email"
          id="email"
          value={email}
          label="Email"
          placeholder="Informe o email para recuperar a senha"
          onChange={setEmail}
        />
      </div>

      <div className={styles.containerButtons}>
        <Button loading={loading} name="Confirmar" onClick={onClickSendForgot} />
        <Button disabled={loading} name="Voltar" onClick={clickGoBack} type="secondary" />
      </div>
    </div>
  );
}

export default ForgotPassword;

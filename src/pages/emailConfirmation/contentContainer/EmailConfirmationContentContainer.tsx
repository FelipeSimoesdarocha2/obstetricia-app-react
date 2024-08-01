import React, { useState, useEffect } from "react";
import Button from "components/button/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from "react-router-dom";
import auth from "@core/@http/auth/auth";
import styles from "../EmailConfirmation.module.scss";


function EmailConfirmationContentContainer() {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<any>();

  const location = useLocation();

  const navigate = useNavigate();

  const defaultClassAnimateForm = "animate__animated animate__bounceIn";

  const handleOnConfirmEmail = async () => {
    try {
      setLoading(true);

      await auth.confirmEmail(location.search);
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false);
    }
  };


  const renderContent = () => {
    if (loading) {
      return <CircularProgress sx={{color: '#3E6C75'}} />
    }

    if (error) {
      return (
        <div className={`${styles.infoContainer}`}>
          <div className={styles.info}>
            <h1>Erro ao confirmar email</h1>
            {error.message}
          </div>
        </div>
      )
    }

    return (
      <>
        <div className={`${styles.infoContainer}`}>
          <div className={styles.info}>
            <h1>Email confirmado com sucesso</h1>
          </div>
        </div>
        <div className={styles.containerButtons}>
          <Button name="Acessar" onClick={() => navigate("/")} />
        </div>
      </>
    )
  }

  useEffect(() => {
    handleOnConfirmEmail();
  }, [])

  return (
    <div
      className={`${styles.formContainer} ${defaultClassAnimateForm}`}
    >
      {renderContent()}
    </div>
  )
}

export default EmailConfirmationContentContainer;

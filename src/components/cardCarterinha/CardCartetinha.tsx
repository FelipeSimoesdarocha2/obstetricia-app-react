import { useEffect, useState } from "react";
import styles from "./CardCartetinha.module.scss";
import HomeScreen from "./HomeScreen";
import ConsultaScreen from "./consultaScreen/ConsultaScreen";
import HistoricoScreen from "./historicoScreen/HistoricoScreen";
import ExamesImagemScreen from "./imagemScreen/ExamesImagemScreen";
import { IPatientDetails } from "@core/models/patient";
import ExamesLabotoriaisScreen from "./examesLaboratoriais/ExamesLabotoriaisScreen";
import VacinaScreen from "./vacinaScreen/VacinaScreen";
import carteirinhaProblems, {
  ResponseCarteirinha,
} from "@core/@http/carteirinha/carteirinhaProblems";
import { useToast } from "providers/ToastProvider/ToastProvider";

type CardCarterinhaProps = {
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  carteirinha: ResponseCarteirinha | undefined;
  consulta: boolean;
  setConsulta: Function;
  exames: boolean;
  setExames: Function;
  historico: boolean;
  isLoading: boolean;
  setHistorico: Function;
  vacinas: boolean;
  setVacinas: Function;
  examesImagem: boolean;
  setExamesImagem: Function;
};

function CardCarterinha(props: CardCarterinhaProps) {
  const {
    patient,
    isLoading,
    gestationId,
    carteirinha: carteirinhaDetails,
    consulta,
    setConsulta,
    exames,
    setExames,
    historico,
    setHistorico,
    vacinas,
    setVacinas,
    examesImagem,
    setExamesImagem,
  } = props;

  const [carteirinha, setCarteirinha] = useState<ResponseCarteirinha>();
  const [home, setHome] = useState(true);
  const { toast } = useToast();

  const goBack = () => {
    setConsulta(false);
    setHistorico(false);
    setExames(false);
    setVacinas(false);
    setExamesImagem(false);
    setHome(true);
  };

  const fetchHistory = async () => {
    try {
      const response = await carteirinhaProblems.getAllCarteirinha(gestationId);
      setCarteirinha(response);
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [patient]);

  return (
    <div className={`${styles.card}`}>
      {!consulta && !historico && !exames && !vacinas && !examesImagem && (
        <HomeScreen
          isLoading={isLoading}
          setConsulta={setConsulta}
          setHistorico={setHistorico}
          setExames={setExames}
          setVacinas={setVacinas}
          setExamesImagem={setExamesImagem}
          patient={patient}
          carteirinha={carteirinha}
          gestationId={gestationId}
          fetchHistory={fetchHistory}
        />
      )}
      {consulta && (
        <ConsultaScreen
          isLoading={isLoading}
          patient={patient}
          gestationId={gestationId}
          historicoId={carteirinha?.historicoCarteirinhaId ?? ""}
          carteirinhaId={carteirinha?.id ?? ""}
          goBack={goBack}
          carteirinha={carteirinha}
        />
      )}
      {historico && (
        <HistoricoScreen
          isLoading={isLoading}
          patient={patient}
          gestationId={gestationId}
          historicoId={carteirinha?.historicoCarteirinhaId ?? ""}
          carteirinhaId={carteirinha?.id ?? ""}
          goBack={goBack}
          carteirinha={carteirinha}
        />
      )}
      {exames && (
        <ExamesLabotoriaisScreen
          isLoading={isLoading}
          patient={patient}
          gestationId={gestationId}
          historicoId={carteirinha?.historicoCarteirinhaId ?? ""}
          carteirinhaId={carteirinha?.id ?? ""}
          goBack={goBack}
          carteirinha={carteirinha}
        />
      )}
      {examesImagem && (
        <ExamesImagemScreen
          isLoading={isLoading}
          patient={patient}
          gestationId={gestationId}
          historicoId={carteirinha?.historicoCarteirinhaId ?? ""}
          carteirinhaId={carteirinha?.id ?? ""}
          goBack={goBack}
          carteirinha={carteirinha}
        />
      )}
      {vacinas && (
        <VacinaScreen
          isLoading={isLoading}
          patient={patient}
          gestationId={gestationId}
          historicoId={carteirinha?.historicoCarteirinhaId ?? ""}
          carteirinhaId={carteirinha?.id ?? ""}
          goBack={goBack}
          carteirinha={carteirinha}
        />
      )}
    </div>
  );
}

export default CardCarterinha;

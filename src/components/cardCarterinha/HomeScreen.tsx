import styles from "./CardCartetinha.module.scss";
import Header1 from "./imagens/header1.png";
import Header2 from "./imagens/header2.png";
import Header3 from "./imagens/header3.png";
import Header4 from "./imagens/header4.png";
import Baby from "./imagens/baby.png";
import Baby2 from "./imagens/baby2.png";
import Calendar from "./imagens/calendar.png";
import More from "./imagens/more.png";
import Seringa from "./imagens/seringa.png";
import Prancheta from "./imagens/prancheta.png";
import { useEffect, useState } from "react";
import HomeCarteirinhaModal from "pages/patient/@subpages/Details/@components/homeCarteirinhaModal";
import { IPatientDetails } from "@core/models/patient";
import HomeCarteirinhaModalCompartilhamento from "pages/patient/@subpages/Details/@components/homeCarteirinhaModalCompartilhamento";
import carteirinhaProblems, {
  ResponseCarteirinha,
} from "@core/@http/carteirinha/carteirinhaProblems";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

type homeProps = {
  setConsulta: Function;
  setHistorico: Function;
  setExames: Function;
  setVacinas: Function;
  setExamesImagem: Function;
  patient: IPatientDetails | null | undefined;
  carteirinha: ResponseCarteirinha | undefined;
  gestationId: string;
  fetchHistory: () => void;
  isLoading: boolean;
};

function HomeScreen(props: homeProps) {
  const {
    setConsulta,
    setHistorico,
    setExames,
    setVacinas,
    setExamesImagem,
    patient,
    carteirinha,
    gestationId,
    fetchHistory,
    isLoading,
  } = props;
  const [openModal, setOpenModal] = useState<{
    title: string;
    desc: string;
    open: boolean;
    button: string;
    buttonExit: string;
    onAdd?: any;
  }>({
    title: "",
    desc: "",
    open: false,
    button: "",
    buttonExit: "",
  });

  const [modalCompartilhar, setModalCompartilhar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, [modalCompartilhar, openModal]);

  return (
    <div className={`${styles.card}`}>
      {isLoading ? (
        <>
          <Skeleton height={80} />
          <Skeleton height={130} />
          <Skeleton height={130} />
          <Skeleton height={130} />
          <Skeleton height={130} />
          <Skeleton height={130} />
        </>
      ) : (
        <>
          <div className={styles.header}>
            <div
              className={styles.containerIcon}
              onClick={() => {
                setOpenModal({
                  title: "IMPRIMIR",
                  desc: carteirinha?.linkCarteirinha
                    ? "Essa paciente já possui uma carterinha. Para realizar a impressão, acesse o link de compartilhamento e na sequência use o comando CTRL + P (Windows) ou CMD + P (Mac) para imprimir direto de seu navegador. "
                    : "Para realizar a impressão de uma carterinha, sugerimos que você gere um link de compartilhamento, acesse-o e na sequência use o comando CTRL + P (Windows) ou CMD + P (Mac) para imprimir direto de seu navegador.",
                  open: true,
                  button: carteirinha?.linkCarteirinha
                    ? "ACESSAR"
                    : "GERAR LINK",
                  buttonExit: "AGORA NÃO",
                  onAdd: () => {
                    setOpenModal({
                      title: "",
                      desc: "",
                      open: false,
                      button: "",
                      buttonExit: "",
                    }),
                      setModalCompartilhar(true);
                  },
                });
              }}
            >
              <img src={Header4} className={styles.icon} />
              <span className={styles.text}>imprimir</span>
            </div>
            <div
              className={styles.containerIcon}
              onClick={() => setModalCompartilhar(true)}
            >
              <img src={Header1} className={styles.icon} />
              <span className={styles.text}>Gerar link</span>
            </div>
            <div
              className={styles.containerIcon}
              onClick={() => {
                carteirinha?.linkCarteirinha
                  ? navigate(
                      "/" +
                        carteirinha?.linkCarteirinha.split("/")[1] +
                        "/" +
                        carteirinha?.linkCarteirinha.split("/")[2]
                    )
                  : setOpenModal({
                      title: "VISUALIZAR",
                      desc: carteirinha?.linkCarteirinha
                        ? "Essa paciente já possui um link de compartilhamento de carteirinha. Para visualizar, Click em Acessar."
                        : "Você ainda não criou um link de compartilhamento de carteirinha. Antes de visualizar, gere um link.",
                      open: true,
                      button: carteirinha?.linkCarteirinha
                        ? "ACESSAR"
                        : "GERAR LINK",
                      buttonExit: "AGORA NÃO",
                      onAdd: () => {
                        setOpenModal({
                          title: "",
                          desc: "",
                          open: false,
                          button: "",
                          buttonExit: "",
                        }),
                          setModalCompartilhar(true);
                      },
                    });
              }}
            >
              <img src={Header2} className={styles.icon} />
              <span className={styles.text}>Visualizar</span>
            </div>
            {console.log(11111, carteirinha?.linkCarteirinha)}
            <div
              className={styles.containerIcon}
              onClick={() => {
                setOpenModal({
                  title: "PERSONALIZAÇÃO",
                  desc: "A funcionalidade de personalização está disponível apenas sob consulta.",
                  open: true,
                  button: "TENHO INTERESSE",
                  buttonExit: "AGORA NÃO",
                  onAdd: () => {},
                });
              }}
            >
              <img src={Header3} className={styles.icon} />
              <span className={styles.text}>Personalizar</span>
            </div>
          </div>
          <div className={styles.spacer} />
          <div className={styles.container}>
            <img
              src={Baby2}
              className={styles.imageContainer}
              onClick={() => setConsulta(true)}
            />
            <div className={styles.containerText}>
              <span className={styles.title}>Consulta</span>
              <span className={styles.subTitle}>Preenchido</span>
              {carteirinha?.dataUltimaAtividadeConsulta && (
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeConsulta}
                </span>
              )}
            </div>
            <img
              src={More}
              className={styles.icon}
              onClick={() => setConsulta(true)}
            />
          </div>
          <div className={styles.spacer} />
          <div className={styles.container}>
            <img
              src={Calendar}
              className={styles.imageContainer}
              onClick={() => setHistorico(true)}
            />
            <div className={styles.containerText}>
              <span className={styles.title}>Históricos</span>
              <span className={styles.subTitle}>Preenchido</span>
              {carteirinha?.historicoCarteirinhaId && (
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeHistoricos}
                </span>
              )}
            </div>
            <img
              src={More}
              className={styles.icon}
              onClick={() => setHistorico(true)}
            />
          </div>
          {console.log("carteirnhaid", carteirinha)}
          <div className={styles.spacer} />
          <div className={styles.container}>
            <img
              src={Prancheta}
              className={styles.imageContainer}
              onClick={() => setExames(true)}
            />
            <div className={styles.containerText}>
              <span className={styles.title}>Exames Laboratoriais</span>
              <span className={styles.subTitle}>Preenchido</span>
              {carteirinha?.dataUltimaAtividadeExamesLaboratoriais && (
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeExamesLaboratoriais}
                </span>
              )}
            </div>
            <img
              src={More}
              className={styles.icon}
              onClick={() => setExames(true)}
            />
          </div>
          <div className={styles.spacer} />
          <div className={styles.container}>
            <img
              src={Baby}
              className={styles.imageContainer}
              onClick={() => setExamesImagem(true)}
            />
            <div className={styles.containerText}>
              <span className={styles.title}>Exames de Imagem</span>
              <span className={styles.subTitle}>Preenchido</span>
              {carteirinha?.dataUltimaAtividadeExamesDeImagem && (
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeExamesDeImagem}
                </span>
              )}
            </div>
            <img
              src={More}
              className={styles.icon}
              onClick={() => setExamesImagem(true)}
            />
          </div>
          <div className={styles.spacer} />
          <div className={styles.container}>
            <img
              src={Seringa}
              className={styles.imageContainer}
              onClick={() => setVacinas(true)}
            />
            <div className={styles.containerText}>
              <span className={styles.title}>Vacinas</span>
              <span className={styles.subTitle}>Preenchido</span>
              {carteirinha?.dataUltimaAtividadeVacina && (
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeVacina}
                </span>
              )}
            </div>
            <img
              src={More}
              className={styles.icon}
              onClick={() => setVacinas(true)}
            />
          </div>
          <HomeCarteirinhaModal
            patientName={patient?.nome}
            gestationId={patient?.nome ?? ""}
            open={openModal.open}
            onClose={() =>
              setOpenModal({
                ...openModal,
                open: false,
              })
            }
            onAdd={() => openModal.onAdd()}
            title={openModal.title}
            desc={openModal.desc}
            buttonText={openModal.button}
            buttonExit={openModal.buttonExit}
          />
          {console.log("carteirinha", carteirinha)}

          <HomeCarteirinhaModalCompartilhamento
            patientName={patient?.nome}
            gestationId={gestationId}
            carteirinhaId={carteirinha?.id ?? ""}
            open={modalCompartilhar}
            carteirinha={carteirinha}
            editing={carteirinha?.linkCarteirinha ? true : false}
            onClose={() => setModalCompartilhar(false)}
            title={"COMPARTILHAMENTO"}
            desc={
              "A ObstCare gera um link e um QR code públicos da Carterinha que são acessáveis por qualquer pessoa. Esse link atualiza automaticamente de acordo com qualquer modificação ou adição de informações dentro da ObstCare."
            }
          />
        </>
      )}
    </div>
  );
}

export default HomeScreen;

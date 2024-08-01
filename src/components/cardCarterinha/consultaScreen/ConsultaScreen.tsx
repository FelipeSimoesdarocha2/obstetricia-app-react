import { useState } from "react";
import { format } from "date-fns";
import Card from "components/card/Card";
import Baby2 from "../imagens/baby2.png";
import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import Input from "components/input/Input";
import Button from "components/button/Button";
import Loader2 from "components/loader/Loader2";
import CheckIcon from "@mui/icons-material/Check";
import styles from "../CardCartetinha.module.scss";
import { handlerDocument } from "./handleDocument";
import consulta from "@core/@http/consulta/consulta";
import RadioButton from "components/radio/RadioButton";
import { IPatientDetails } from "@core/models/patient";
import InputDate from "components/input-date/InputDate";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useToast } from "providers/ToastProvider/ToastProvider";
import { ResponseCarteirinha } from "@core/@http/carteirinha/carteirinhaProblems";
import SaveModalCarteirinha from "pages/patient/@subpages/Details/@components/saveModalCarteirinha";

type consultaProps = {
  goBack: Function;
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  historicoId: string;
  carteirinhaId: string;
  carteirinha: ResponseCarteirinha | undefined;
  isLoading: boolean;
};
type consultaHistorico = {
  dum: string;
  dpp: string;
  dateDumIOSString: string;
  consultaCarteirinhaDetail: {
    id: string;
    date: string;
    percentual: number;
    order: number;
    isAfterToday: boolean;
    isBeforeToday: boolean;
    isToday: boolean;
  }[];
};

export type consulta = {
  id?: string;
  conduta: string;
  dateFirstEco: string;
  exameVaginal: string;
  medicacoes: string;
  observacoes: string;
  hda: string;
  idadeGestacional: string;
  queixa: string;
  movimentacaoFetal: any;
  apresentacaoFetal: any;
  destacarConsultaUterina: any;
  edma: any;
  bcf: any;
  dinamicaUterina: string;
  alturaUterina: any;
  peso: any;
  pressaoArterial: string;
};

function ConsultaScreen(props: consultaProps) {
  const {
    goBack,
    gestationId,
    carteirinha,
    carteirinhaId,
    isLoading,
    patient: patientC,
  } = props;
  const [patient, setPatient] = useState({
    dateFirstEco: format(new Date(), "yyyy-MM-dd"),
  } as consulta);
  const [loading, setLoading] = useState(false);
  const [minDateString, setMinDateString] = useState("");
  const [data, setData] = useState<consultaHistorico | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();
  const onChangeDataDum = (dateFirstEco: string) => {
    setPatient({ ...patient, dateFirstEco });
  };
  const onChangeIdadeGestacional = (idadeGestacional: string) => {
    setPatient({ ...patient, idadeGestacional });
  };

  const onChangeQueixa = (queixa: string) => {
    setPatient({ ...patient, queixa });
  };
  const onChangeHda = (hda: string) => {
    setPatient({ ...patient, hda });
  };
  const onChangeMedicacoes = (medicacoes: string) => {
    setPatient({ ...patient, medicacoes });
  };
  const onChangeObservacoes = (observacoes: string) => {
    setPatient({ ...patient, observacoes });
  };
  const onChangePeso = (peso: string) => {
    setPatient({ ...patient, peso: +peso });
  };
  const onChangeBcf = (bcf: string) => {
    setPatient({ ...patient, bcf: +bcf });
  };
  const onChangePressaoArterial = (pressaoArterial: string) => {
    setPatient({ ...patient, pressaoArterial });
  };
  const onChangeAlturaUterina = (alturaUterina: string) => {
    setPatient({ ...patient, alturaUterina: +alturaUterina });
  };
  const onChangeExameVaginal = (exameVaginal: string) => {
    setPatient({ ...patient, exameVaginal });
  };
  const onChangeDinamicaUterina = (dinamicaUterina: string) => {
    setPatient({ ...patient, dinamicaUterina });
  };
  const onChangeEdma = (edma: number) => {
    setPatient({ ...patient, edma: edma });
  };
  const onChangeMovimentacaoFetal = (movimentacaoFetal: number) => {
    setPatient({ ...patient, movimentacaoFetal: movimentacaoFetal });
  };
  const onChangeApresentacaoFetal = (apresentacaoFetal: number) => {
    setPatient({ ...patient, apresentacaoFetal: apresentacaoFetal });
  };
  const onChangeDestacarConsultaUterina = (destacarConsultaUterina: number) => {
    setPatient({
      ...patient,
      destacarConsultaUterina: destacarConsultaUterina,
    });
  };
  const onChangeConduta = (conduta: string) => {
    setPatient({ ...patient, conduta });
  };

  const onClickSave = async () => {
    const dataResponse = handlerDocument(patient, gestationId, carteirinhaId);
    console.log(dataResponse);
    try {
      const response = await consulta.createConsultaCarterinha(dataResponse);
      setModalOpen(true);
      toast.success({
        title: "Sucesso",
        message: "Consulta criada com sucesso",
      });
    } catch (error: any) {
      toast.error({
        title: "Error",
        message: "Error ao criar consulta",
      });
    }
  };
  const onClickEdit = async () => {
    const dataResponse = handlerDocument(patient, gestationId, carteirinhaId);

    try {
      const response = await consulta.editConsultaCarterinha(dataResponse);
      setModalOpen(true);
      toast.success({
        title: "Sucesso",
        message: "Consulta editada com sucesso",
      });
    } catch (error: any) {}
  };
  const fetchConsulta = async () => {
    try {
      const response = await consulta.getConsultaHisoticoConsulta(gestationId);
      console.log("response", response);
      setData(response);
    } catch (error: any) {
      console.log("error", error);
      toast.error({
        title: "Erro",
        message: "Erro ao busca consulta",
      });
    }
  };
  const fetchConsultaById = async (id: string) => {
    console.log(11111, id);
    setLoading(true);

    try {
      const response = await consulta.getConsultaHisoticoConsultaById(id);
      setEditing(true);
      setPatient({
        id: response.id,
        conduta: response.conduta,
        dateFirstEco: format(new Date(response?.date ?? ""), "yyyy-MM-dd"),
        exameVaginal: response.exameVaginal,
        medicacoes: response.medicacoes,
        observacoes: response.observacoes,
        hda: response.hda,
        idadeGestacional: response.idadeGestacional,
        queixa: response.queixa,
        movimentacaoFetal: response.movimentacaoFetal ? 1 : 0,
        apresentacaoFetal: response.apresentacaoFetal,
        destacarConsultaUterina: response.destaque ? 1 : 0,
        edma: response.edema,
        bcf: response.bcf,
        dinamicaUterina: response.dinamicaUterina,
        alturaUterina: response.alturaUterina,
        peso: response.peso,
        pressaoArterial: response.pressaoArterial,
      });
      setLoading(false);
    } catch (error: any) {
      console.log("error", error);
      toast.error({
        title: "Erro",
        message: "Erro ao busca consulta",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onClickCancelar = () => {
    goBack();
  };
  const requiredEdema = patient?.edma === undefined;
  const requiredMovFet = patient?.movimentacaoFetal === undefined;
  const requiredApreFet = patient?.apresentacaoFetal === undefined;
  const requiredDestaque = patient?.destacarConsultaUterina === undefined;

  const maxDateString = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    fetchConsulta();
  }, [patientC, modalOpen]);

  useEffect(() => {
    if (data?.dateDumIOSString) {
      const date = format(new Date(data?.dateDumIOSString ?? ""), "yyyy-MM-dd");
      setMinDateString(date);
    }
    // const date = format(new Date(data?.dateDumIOSString ?? ""), "yyyy-MM-dd");
  }, [data?.dateDumIOSString]);

  const getWidthItem = (item: any, index: number) => {
    if (index === 0) {
      return item.percentual + "%";
    }
    return (
      data?.consultaCarteirinhaDetail &&
      data?.consultaCarteirinhaDetail[index - 1] &&
      item.percentual -
        (data?.consultaCarteirinhaDetail[index - 1]?.percentual ?? 0) +
        "%"
    );
  };

  const isPar = (number: number) => {
    return number % 2 === 0;
  };

  const onClickConsulta = (item: {
    id: string;
    date: string;
    percentual: number;
    order: number;
    isAfterToday: boolean;
    isBeforeToday: boolean;
    isToday: boolean;
  }) => {
    if (item.isToday) {
      setEditing(false);
      setPatient({
        dateFirstEco: format(new Date(), "yyyy-MM-dd"),
      } as consulta);
      return;
    }
    fetchConsultaById(item.id);
  };

  return (
    <div className={`${styles.card} ${styles.cardCarteirinha}`}>
      {isLoading ? (
        <>
          <Skeleton height={200} />
          <Skeleton height={120} />
          <Skeleton height={400} />
          <Skeleton height={400} />
        </>
      ) : (
        <>
          <div className={styles.headerConsulta}>
            <div className={styles.containerBack}>
              <div className={styles.containerIcon}>
                <ChevronLeftIcon
                  onClick={() => goBack()}
                  style={{
                    color: "#1A535C",
                  }}
                />
              </div>
              <span className={styles.text}>Voltar</span>
            </div>
            <div className={styles.containerMid}>
              <img src={Baby2} className={styles.imageContainer} />
              <div className={styles.containerText}>
                <span className={styles.title}>Consulta</span>
                <span className={styles.subTitle}>Preenchido</span>
                <span className={styles.desc}>
                  {carteirinha?.dataUltimaAtividadeConsulta}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.spacerHeader} />
          <span className={styles.titleSection}>Histórico de consultas</span>
          <div className={styles.line} />
          <div className={styles.containerHistoricoLine}>
            <div className={styles.wrapperContainerChecked}>
              <div className={styles.headerChecked}>
                <div className={styles.containerChecked}>
                  <CheckIcon style={{ color: "#ffff" }} />
                </div>
                {/* <div className={styles.lineHeader} /> */}
              </div>

              <div className={styles.historicoTextContainer}>
                <span className={styles.historicoText}>
                  {data?.dum ? "DUM:" : ""}
                </span>
                <span className={styles.historicoText}>{data?.dum}</span>
              </div>
            </div>

            {data &&
              data?.consultaCarteirinhaDetail &&
              data?.consultaCarteirinhaDetail.length > 0 &&
              data?.consultaCarteirinhaDetail.map((item, index) => {
                return (
                  <>
                    <div
                      className={
                        item.isBeforeToday
                          ? styles.lineHeader
                          : styles.lineHeaderAfter
                      }
                      style={{
                        width: getWidthItem(item, index),
                      }}
                    />

                    <div className={styles.wrapperContainerChecked}>
                      {isPar(index) && (
                        <div
                          className={`${styles.historicoTextContainer} ${styles.historicoTextContainerTop}`}
                        >
                          {item.isToday ? (
                            <>
                              <span className={styles.historicoText}>
                                <b className={styles.bold}>Cadastrar</b>
                              </span>
                              <span className={styles.historicoText}>
                                <b className={styles.bold}> {item.date}</b>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className={styles.historicoText}>
                                Consulta:
                              </span>
                              <span className={styles.historicoText}>
                                {item.date}
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      <div
                        className={styles.headerChecked}
                        onClick={() => onClickConsulta(item)}
                      >
                        {item.isToday ? (
                          <div className={styles.containerToday}>
                            <div className={styles.ballToday} />
                          </div>
                        ) : (
                          <div className={styles.containerChecked}>
                            <CheckIcon style={{ color: "#ffff" }} />
                          </div>
                        )}
                      </div>

                      {!isPar(index) && (
                        <div className={styles.historicoTextContainer}>
                          {item.isToday ? (
                            <>
                              <span className={styles.historicoText}>
                                <b className={styles.bold}>Cadastrar</b>
                              </span>
                              <span className={styles.historicoText}>
                                <b className={styles.bold}> {item.date}</b>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className={styles.historicoText}>
                                Consulta:
                              </span>
                              <span className={styles.historicoText}>
                                {item.date}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
            <div
              className={styles.lineHeader}
              style={{
                width: "100%",
                backgroundColor: "#D1D5DB",
              }}
            />
            <div
              className={styles.wrapperContainerChecked}
              style={{
                marginLeft: "auto",
              }}
            >
              <div className={styles.headerChecked}>
                <div className={styles.finalContainer}>
                  <div className={styles.ballTodayFinal} />
                </div>
                {/* <div className={styles.lineHeader} /> */}
              </div>

              <div className={styles.historicoTextContainer}>
                <span className={styles.historicoText}>
                  {data?.dpp ? "DPP:" : ""}
                </span>
                <span className={styles.historicoText}>{data?.dpp}</span>
              </div>
            </div>
            {/* <div className={styles.containerToday}>
          <div className={styles.ballToday} />
        </div>
        <div className={styles.finalContainer}>
          <div className={styles.ballTodayFinal} />
        </div> */}
          </div>
          <div className={styles.spacer} />
          {loading ? (
            <div className={styles.containerLoading}>
              <Loader2 title="Consultando ..." />
            </div>
          ) : (
            <>
              <span className={styles.titleSection}>
                Adicionar nova consulta
              </span>
              <div className={styles.line} />
              <div className={styles.spacer} />
              {
                (console.log("minDateString", minDateString),
                console.log("maxDateString", maxDateString))
              }
              <InputDate
                info=""
                width="30%"
                value={patient?.dateFirstEco}
                id="data-dum"
                required={!patient?.dateFirstEco}
                label={
                  editing
                    ? "Data da consulta"
                    : "Qual a data da consulta que você quer registrar?"
                }
                onChange={onChangeDataDum}
                min={minDateString}
                max={maxDateString}
              />
              <div className={styles.spacerHeader} />

              <span className={styles.titleSection}>Anamnese (opcional)</span>
              <div className={styles.line} />
              <div className={styles.spacer} />
              <Input
                type="text"
                width="100%"
                value={patient?.idadeGestacional}
                id="nome-completo"
                label="Idade gestacional"
                required
                onChange={onChangeIdadeGestacional}
              />
              <Input
                type="text"
                width="100%"
                value={patient?.queixa}
                id="nome-completo"
                label="Queixa"
                required
                onChange={onChangeQueixa}
              />
              <Input
                type="text"
                width="100%"
                height={"200px"}
                value={patient?.hda}
                id="nome-completo"
                label="Hda"
                required
                onChange={onChangeHda}
                className={styles.textArea}
                textarea
              />
              <Input
                type="text"
                width="100%"
                value={patient?.medicacoes}
                id="nome-completo"
                label="Medicações"
                required
                onChange={onChangeMedicacoes}
              />
              <Input
                type="text"
                width="100%"
                value={patient?.observacoes}
                id="nome-completo"
                label="Observações"
                required
                onChange={onChangeObservacoes}
              />
              <div className={styles.spacerHeader} />

              <span className={styles.titleSection}>Exame físico</span>
              <div className={styles.line} />
              <div className={styles.spacer} />
              <div className={styles.rowInput}>
                <Input
                  type="number"
                  width="30%"
                  height={"200px"}
                  value={patient?.peso}
                  id="nome-completo"
                  label="Peso"
                  required
                  onChange={onChangePeso}
                />
                <Input
                  type="number"
                  width="30%"
                  height={"200px"}
                  value={patient?.bcf}
                  id="nome-completo"
                  label="BCF"
                  required
                  onChange={onChangeBcf}
                />
              </div>
              <div className={styles.rowInput}>
                <Input
                  type="text"
                  width="30%"
                  height={"200px"}
                  value={patient?.pressaoArterial}
                  id="nome-completo"
                  label="Pressão arterial"
                  required
                  onChange={onChangePressaoArterial}
                />
                <Input
                  type="number"
                  width="30%"
                  height={"200px"}
                  value={patient?.alturaUterina}
                  id="nome-completo"
                  label="Altura urerina (cm)"
                  required
                  onChange={onChangeAlturaUterina}
                />
              </div>
              <div className={styles.rowInput}>
                <Input
                  type="text"
                  width="30%"
                  height={"200px"}
                  value={patient?.exameVaginal}
                  id="nome-completo"
                  label="Exame vaginal"
                  required
                  onChange={onChangeExameVaginal}
                />
                <Input
                  type="text"
                  width="30%"
                  height={"200px"}
                  value={patient?.dinamicaUterina}
                  id="nome-completo"
                  label="Dinâmica uterina"
                  required
                  onChange={onChangeDinamicaUterina}
                />
              </div>
              <div className={styles.rowCheckbox}>
                <div className={styles.width30}>
                  <RadioButton
                    id="riscos"
                    label="Edema"
                    values={[
                      {
                        id: "risco-baixo1",
                        label: "0",
                        checked: patient?.edma === 0,
                        onChange: (_) => onChangeEdma(0),
                        required: requiredEdema,
                      },
                      {
                        id: "risco-alto",
                        label: "+1",
                        checked: patient?.edma === 1,
                        onChange: (_) => onChangeEdma(1),
                        required: requiredEdema,
                      },
                      {
                        id: "risco-baixo",
                        label: "+2",
                        checked: patient?.edma === 2,
                        onChange: (_) => onChangeEdma(2),
                        required: requiredEdema,
                      },
                      {
                        id: "risco-alto2",
                        label: "+3",
                        checked: patient?.edma === 3,
                        onChange: (_) => onChangeEdma(3),
                        required: requiredEdema,
                      },
                      {
                        id: "risco-alto3",
                        label: "+4",
                        checked: patient?.edma === 4,
                        onChange: (_) => onChangeEdma(4),
                        required: requiredEdema,
                      },
                    ]}
                  />
                </div>
                <div className={styles.width30}>
                  <RadioButton
                    id="riscos"
                    label="Movimentação fetal"
                    values={[
                      {
                        id: "risco-baixo4",
                        label: "Presente",
                        checked: patient?.movimentacaoFetal === 1,
                        onChange: (_) => onChangeMovimentacaoFetal(1),
                        required: requiredMovFet,
                      },
                      {
                        id: "risco-baixo5",
                        label: "Ausente",
                        checked: patient?.movimentacaoFetal === 0,
                        onChange: (_) => onChangeMovimentacaoFetal(0),
                        required: requiredMovFet,
                      },
                    ]}
                  />
                  <RadioButton
                    id="riscos"
                    label="Apresentação fetal"
                    values={[
                      {
                        id: "risco-baixo6",
                        label: "Pélvica",
                        checked: patient?.apresentacaoFetal === 1,
                        onChange: (_) => onChangeApresentacaoFetal(1),
                        required: requiredApreFet,
                      },
                      {
                        id: "risco-alto7",
                        label: "Córnica",
                        checked: patient?.apresentacaoFetal === 2,
                        onChange: (_) => onChangeApresentacaoFetal(2),
                        required: requiredApreFet,
                      },
                      {
                        id: "risco-alto6",
                        label: "Cefálica",
                        checked: patient?.apresentacaoFetal === 3,
                        onChange: (_) => onChangeApresentacaoFetal(3),
                        required: requiredApreFet,
                      },
                      {
                        id: "risco-alto8",
                        label: "Outra",
                        checked: patient?.apresentacaoFetal === 4,
                        onChange: (_) => onChangeApresentacaoFetal(4),
                        required: requiredApreFet,
                      },
                    ]}
                  />
                </div>
              </div>
              <RadioButton
                id="riscos"
                label="Destacar essa consulta na carterinha? Essa informação será colocada no início da carterinha em destaque. "
                values={[
                  {
                    id: "risco-baixo33",
                    label: "Sim",
                    checked: patient?.destacarConsultaUterina === 1,
                    onChange: (_) => onChangeDestacarConsultaUterina(1),
                    required: requiredDestaque,
                  },
                  {
                    id: "risco-baixo22",
                    label: "Não",
                    checked: patient?.destacarConsultaUterina === 0,
                    onChange: (_) => onChangeDestacarConsultaUterina(0),
                    required: requiredDestaque,
                  },
                ]}
              />
              <div className={styles.spacerHeader} />
              <span className={styles.titleSection}>Conduta</span>
              <div className={styles.line} />
              <div className={styles.spacer} />
              <Input
                type="text"
                height={"200px"}
                value={patient?.conduta}
                id="nome-completo"
                label="Conduta"
                required
                onChange={onChangeConduta}
                className={styles.textArea}
                textarea
              />
              <div className={styles.spacerHeader} />
              <span className={styles.titleSection}>finalizar</span>
              <div className={styles.line} />
              <div className={styles.spacer} />
              <Card
                header={{ title: "", rightContent: null }}
                classBody={styles.cardBody}
                body={
                  <>
                    <Button
                      name={editing ? "Salvar Edição" : "Salvar"}
                      isSubmit
                      loading={loading}
                      onClick={editing ? onClickEdit : onClickSave}
                      className={styles.btnAction}
                    />
                    {!editing && (
                      <Button
                        name="Cancelar"
                        type="secondary"
                        onClick={onClickCancelar}
                        className={`${styles.btnAction} ${styles.secondary}`}
                      />
                    )}
                  </>
                }
              />
              <SaveModalCarteirinha
                patientName={""}
                gestationId={""}
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                  goBack();
                }}
                onAdd={() => {
                  setModalOpen(false);
                  setPatient({
                    dateFirstEco: format(new Date(), "yyyy-MM-dd"),
                  } as consulta);
                }}
                title={"Consulta salva com com sucesso!"}
                buttonText={"ADICIONAR NOVA CONSULTA"}
                buttonTextCancel={"SAIR"}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ConsultaScreen;

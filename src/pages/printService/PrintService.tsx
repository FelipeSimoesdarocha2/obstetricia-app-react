import React, { ReactElement, useEffect, useState } from "react";
import styles from "./PrintService.module.scss";
import Tabela from "./Tabela";
import Consulta from "./Consulta";
import Consulta2 from "./Consulta2";
import Header from "./Header";
import Top from "./Top";
import Title from "./Title";
import Historico from "./Historico";
import Grafico from "./Grafico";
import carteirinhaProblems from "@core/@http/carteirinha/carteirinhaProblems";
import { useToast } from "providers/ToastProvider/ToastProvider";
import { useParams } from "react-router-dom";
import patientsService from "@core/@http/patient/patient";
import { IPatientDetails, IPatientHeatmap } from "@core/models/patient";
import { CarteirinhaImprimir } from "@core/@http/carteirinha/carteirinhaType";
import PatientBloodPressureGraphInfos from "pages/patient/@subpages/Details/@components/GraphInfos/PatientBloodPressureGraphInfos";
import PatientHumorGraphInfos from "./GraphInfos/PatientHumorGraphInfos";
import PatientGlicemiaGraphInfos from "./GraphInfos/PatientGlicemiaGraphInfos";
import PatientGlicemiaJejumGraphInfos from "./GraphInfos/PatientGlicemiaJejumGraphInfos";
import PatientWeightGraphInfos from "./GraphInfos/PatientWeightGraphInfos";
import PatientFetalMovementGraphInfos from "./GraphInfos/PatientFetalMovementGraphInfos";
import PatientGlicemiaPosCafeGraphInfos from "./GraphInfos/PatientGlicemiaPosCafeGraphInfos";
import PatientGlicemiaPreAlmocoGraphInfos from "./GraphInfos/PatientGlicemiaPreAlmocoGraphInfos";
import PatientGlicemiaPreJantaGraphInfos from "./GraphInfos/PatientGlicemiaPreJantaGraphInfos";
import PatientGlicemiaPosJantaGraphInfos from "./GraphInfos/PatientGlicemiaPosJantaGraphInfos";
import PatientHour22GraphInfos from "./GraphInfos/PatientHour22GraphInfos";
import PatientHeatmap from "pages/patient/@subpages/Details/@components/Heatmap/PatientHeatmap";
import moment from "moment";

function PrintService() {
  const { id } = useParams();
  const { toast } = useToast();
  const [data, setData] = useState<CarteirinhaImprimir>(
    {} as CarteirinhaImprimir
  );
  console.log(4444444444444, { data });
  const [patient, setPatient] = useState<IPatientDetails | null>();
  const [infosPatientGraphElement, setInfosPatientGraphElement] =
    useState<ReactElement>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heatmap, setHeatmap] = useState<IPatientHeatmap | null>();

  const fetchPatient = (id: string, gestationId: string) => {
    patientsService
      .getById(id, gestationId)
      .then((response) => {
        setPatient(response);
        console.log({ response });
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  };

  const getHeatmap = (gestationId: string) => {
    patientsService
      .getHeatmap(gestationId, {
        month: moment(new Date()).month(),
        year: moment().year(),
      })
      .then((response) => {
        // console.log("getHeatmap", {
        //   month: moment(new Date()).month() + 1,
        //   year: moment().year(),
        // });
        console.log("getHeatmap", response);
        setHeatmap(response);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  };

  const fetchPrintData = async () => {
    try {
      const response = await carteirinhaProblems.getPrintCarteirinha(id ?? "");

      setData(response);
      setIsLoading(true);

      fetchPatient(response.idPacient, response.idGestation);
      getHeatmap(response.idGestation);
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: "Erro ao buscar carteirinha",
      });
    }
  };

  useEffect(() => {
    fetchPrintData();
  }, [id]);

  const NomeExame = (numero: number) => {
    const dataTeste = [
      { value: 1, description: "Morfológico do 1º tri" },
      { value: 2, description: "Morfológico do 2º tri" },
      { value: 3, description: "USG Obstétrico" },
      { value: 4, description: "Cervicometria" },
      { value: 5, description: "Doppler Obstétrico" },
      { value: 6, description: "USG Transvaginal" },
      { value: 7, description: "Ecocardiograma fetal" },
      { value: 8, description: "Outro" },
    ];

    return dataTeste.find((item) => item.value === numero)?.description;
  };
  const NomeExameLab = (numero: number) => {
    const dataTeste = [
      { value: 1, description: "ABO/Rh" },
      { value: 2, description: "Coombs Indireto" },
      { value: 3, description: "Hemoglobina Glicada" },
      { value: 4, description: "Hb/Ht" },
      { value: 5, description: "Glicemia de Jejum" },
      { value: 6, description: "TTGO 75mg" },
      { value: 7, description: "antis-hiv" },
      { value: 8, description: "Sífilis (VDRL)" },
      { value: 9, description: "HbsAg" },
      { value: 10, description: "Anti HCV" },
      { value: 11, description: "TSH/T4" },
      { value: 12, description: "Toxoplasmose IgG e IgM" },
      { value: 13, description: "Rubéola IgG e IgM" },
      { value: 14, description: "Citomegalovirus IgG e IgM" },
      { value: 15, description: "Sumário de urina" },
      { value: 16, description: "Urocultura" },
      { value: 17, description: "Dosagem de vitamina D" },
      { value: 18, description: "PSGB " },
      { value: 19, description: "Outro" },
    ];

    return dataTeste.find((item) => item.value === numero)?.description;
  };

  const NomeVacina = (numero: number) => {
    const dataTeste = [
      { value: 1, description: "Anti tetânica" },
      { value: 2, description: "Covid-19" },
      { value: 3, description: "Hepatite B" },
      { value: 4, description: "Influenza" },
    ];

    return dataTeste.find((item) => item.value === numero)?.description;
  };
  const NomeImunizacao = (numero: number) => {
    const dataTeste = [
      { value: 1, description: "Imunizada" },
      { value: 2, description: "Não Imunizada" },
      { value: 3, description: "Sem informação" },
    ];

    return dataTeste.find((item) => item.value === numero)?.description;
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.spacer25} />
      <Top patient={patient} data={data} />
      <div className={styles.spacer50} />
      {data.vacinasDestaque?.length > 0 ||
      data.consultasDestaque?.length > 0 ||
      data.examesImagemDestaque?.length > 0 ||
      data.examesLaboratoriaisDestaque?.length > 0 ? (
        <>
          <Title
            title={"Destaques"}
            description={
              "Resultados de consultas, exames e ultrassons que merecem atenção de acordo com pré-natalista."
            }
          />
          <div className={styles.spacer50} />
          {data.consultasDestaque?.length > 0 && (
            <Consulta data={data.consultasDestaque} />
          )}
          {data.vacinasDestaque?.length > 0 && (
            <>
              <Tabela
                title={"Vacinas"}
                data={data.vacinasDestaque.map((item) => {
                  return {
                    nome: NomeVacina(item.vacinaTipos) ?? "-",
                    date: item.date,
                    resultado: NomeExameLab(item.imunizacao) ?? "-",
                  };
                })}
              />
              <div className={styles.spacer50} />
            </>
          )}
          {data.examesLaboratoriaisDestaque.length > 0 && (
            <>
              <Tabela
                title={"Exames Laboratoriais"}
                data={data.examesLaboratoriaisDestaque.map((item) => {
                  return {
                    nome: NomeExameLab(item.examesLaboratoriaisTipo) ?? "-",
                    date: item.date,
                    resultado: item.resultado,
                  };
                })}
              />
              <div className={styles.spacer50} />
            </>
          )}
          {data.examesImagemDestaque.length > 0 && (
            <>
              <Tabela
                title={"Exames de Ultrassons"}
                data={data.examesImagemDestaque.map((item) => {
                  return {
                    nome: NomeExame(item.examesDeImagemTipo) ?? "-",
                    date: item.date,
                    resultado: item.resultado,
                  };
                })}
              />

              <div className={styles.spacer50} />
            </>
          )}
          {data.vacinasDestaque.length > 0 && (
            <>
              <Tabela
                title={"Vacinas"}
                data={data.vacinasDestaque.map((item) => {
                  return {
                    nome: NomeVacina(item.vacinaTipos) ?? "-",
                    date: item.date,
                    resultado: NomeImunizacao(item.imunizacao) ?? "-",
                  };
                })}
              />
              <div className={styles.spacer50} />
            </>
          )}
        </>
      ) : null}

      <div className={styles.spacer50} />

      {data.historicos && (
        <>
          <Title
            title={"Rotina"}
            description={"Todas as informações da carterinha."}
          />
          <div className={styles.spacer50} />
          <Historico title="Histórico Pessoal" data={data.historicoPessoal} />
          <div className={styles.spacer50} />
          <Historico title="Histórico Familiar" data={data.historicoFamiliar} />
          <div className={styles.spacer50} />
          <Historico
            title="Histórico Obstétrico"
            data={data.historicoObstetrico}
          />
          <div className={styles.spacer50} />
        </>
      )}
      {data.consulta && (
        <>
          <Consulta2 data={data.consultas} />
          <div className={styles.spacer50} />
        </>
      )}
      {data.examesLaboratorial && (
        <>
          <Tabela
            title={"Lista de exames"}
            data={data.examesLaboratoriais.map((item) => {
              return {
                nome: NomeExameLab(item.examesLaboratoriaisTipo) ?? "-",
                date: item.date,
                resultado: item.resultado,
              };
            })}
          />
          <div className={styles.spacer50} />
        </>
      )}
      {data.exameImagem && (
        <>
          <Tabela
            title={"Lista de Ultrassons"}
            data={data.examesImagem.map((item) => {
              return {
                nome: NomeExame(item.examesDeImagemTipo) ?? "-",
                date: item.date,
                resultado: item.resultado,
              };
            })}
          />
          <div className={styles.spacer50} />
        </>
      )}
      {data.vacina && (
        <>
          <Tabela
            title={"Lista de vacinas"}
            data={data.vacinas.map((item) => {
              return {
                nome: NomeVacina(item.vacinaTipos) ?? "-",
                date: item.date,
                resultado: NomeImunizacao(item.imunizacao) ?? "-",
              };
            })}
          />
          <div className={styles.spacer50} />
        </>
      )}
      {data.graficosMonitoramento && (
        <>
          <Title
            title={"Monitoramentos"}
            description={
              "Informações de monitoramentos realizados pela paciente remotamente e pelo  pré natalista em consultório."
            }
          />
          <div className={styles.spacer50} />
        </>
      )}
      {data.pressao && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Pressão Arterial"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientBloodPressureGraphInfos
              isLoading={isLoading}
              isPrintService
              allBloodPressureData={
                patient?.variacoesBloodPressure.allBloodPressureData ?? []
              }
              lastMonthBloodPressureData={
                patient?.variacoesBloodPressure?.lastMonthBloodPressureData ??
                []
              }
              lastWeekBloodPressureData={
                patient?.variacoesBloodPressure?.lastWeekBloodPressureData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      {data.peso && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Peso"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientWeightGraphInfos
              isLoading={isLoading}
              allWeigthData={patient?.variacoesPeso?.allWeigthData ?? []}
              lastMonthWeigthData={
                patient?.variacoesPeso?.lastMonthWeigthData ?? []
              }
              lastWeekWeigthData={
                patient?.variacoesPeso?.lastWeekWeigthData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      {data.movFetal && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Altura Uterina"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientFetalMovementGraphInfos
              isLoading={isLoading}
              allFetalMovementData={
                patient?.variacoesMovFetal?.allMovFetalData ?? []
              }
              lastMonthFetalMovementData={
                patient?.variacoesMovFetal?.lastMonthMovFetalData ?? []
              }
              lastWeekFetalMovementData={
                patient?.variacoesMovFetal?.lastWeekMovFetalData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      {data.glicemias && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Glicemia Pós Almoço"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientGlicemiaGraphInfos
              isLoading={isLoading}
              allGlucosePostPrandialData={
                patient?.variacoesGlicemia?.allGlucosePostPrandialData ?? []
              }
              lastMonthGlucosePostPrandialData={
                patient?.variacoesGlicemia?.lastMonthGlucosePostPrandialData ??
                []
              }
              lastWeekGlucosePostPrandialData={
                patient?.variacoesGlicemia?.lastWeekGlucosePostPrandialData ??
                []
              }
            />
          </div>
          <div className={styles.spacer100} />
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Glicemia Jejum"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientGlicemiaJejumGraphInfos
              isLoading={isLoading}
              allGlucoseFastingData={
                patient?.variacoesGlicemiaJejum?.allGlucoseFastingData ?? []
              }
              lastMonthGlucoseFastingData={
                patient?.variacoesGlicemiaJejum?.lastMonthGlucoseFastingData ??
                []
              }
              lastWeekGlucoseFastingData={
                patient?.variacoesGlicemiaJejum?.lastWeekGlucoseFastingData ??
                []
              }
            />
          </div>
          <div className={styles.spacer100} />
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Glicemia Pós café"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientGlicemiaPreAlmocoGraphInfos
              isLoading={isLoading}
              allGlucoseFastingData={
                patient?.variacoesGlicemiaPreAlmoco?.allGlucosePreLunchData ??
                []
              }
              lastMonthGlucoseFastingData={
                patient?.variacoesGlicemiaPreAlmoco
                  ?.lastMonthGlucosePreLunchData ?? []
              }
              lastWeekGlucoseFastingData={
                patient?.variacoesGlicemiaPreAlmoco
                  ?.lastWeekGlucosePreLunchData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Glicemia Pré Janta"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientGlicemiaPreJantaGraphInfos
              isLoading={isLoading}
              allGlucoseFastingData={
                patient?.variacoesGlicemiaPreJanta?.allGlucosePreDinnerData ??
                []
              }
              lastMonthGlucoseFastingData={
                patient?.variacoesGlicemiaPreJanta
                  ?.lastMonthGlucosePreDinnerData ?? []
              }
              lastWeekGlucoseFastingData={
                patient?.variacoesGlicemiaPreJanta
                  ?.lastWeekGlucosePreDinnerData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Glicemia Pós Janta"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientGlicemiaPosJantaGraphInfos
              isLoading={isLoading}
              allGlucoseFastingData={
                patient?.variacoesGlicemiaPosJanta?.allGlucosePostDinnerData ??
                []
              }
              lastMonthGlucoseFastingData={
                patient?.variacoesGlicemiaPosJanta
                  ?.lastMonthGlucosePostDinnerData ?? []
              }
              lastWeekGlucoseFastingData={
                patient?.variacoesGlicemiaPosJanta
                  ?.lastWeekGlucosePostDinnerData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Glicemia 22h"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientHour22GraphInfos
              isLoading={isLoading}
              allHour22Data={
                patient?.variacoesGlicemia22Horas?.allGlucoseHour22Data ?? []
              }
              lastMonthHour22Data={
                patient?.variacoesGlicemia22Horas?.lastMonthGlucoseHour22Data ??
                []
              }
              lastWeekHour22Data={
                patient?.variacoesGlicemia22Horas?.lastWeekGlucoseHour22Data ??
                []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      {data.humor && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Humor"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientHumorGraphInfos
              isLoading={isLoading}
              allHumorData={patient?.variacoesHumor.allHumorData ?? []}
              lastMonthHumorData={
                patient?.variacoesHumor?.lastMonthHumorData ?? []
              }
              lastWeekHumorData={
                patient?.variacoesHumor?.lastWeekHumorData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      {data.sintomas && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Sintomas"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientFetalMovementGraphInfos
              isLoading={isLoading}
              allFetalMovementData={
                patient?.variacoesMovFetal?.allMovFetalData ?? []
              }
              lastMonthFetalMovementData={
                patient?.variacoesMovFetal?.lastMonthMovFetalData ?? []
              }
              lastWeekFetalMovementData={
                patient?.variacoesMovFetal?.lastWeekMovFetalData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}
      {data.movFetal && patient?.carteirinhaId && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Movimentação fetal"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientFetalMovementGraphInfos
              isLoading={isLoading}
              allFetalMovementData={
                patient?.variacoesMovFetal?.allMovFetalData ?? []
              }
              lastMonthFetalMovementData={
                patient?.variacoesMovFetal?.lastMonthMovFetalData ?? []
              }
              lastWeekFetalMovementData={
                patient?.variacoesMovFetal?.lastWeekMovFetalData ?? []
              }
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      {data.sintomas && (
        <>
          <div className={styles.containerPadding}>
            <span className={styles.titleRow}>{"Diário de sintomas"}</span>
          </div>
          <div className={styles.line} />
          <div className={styles.spacer25} />
          <div className={styles.containerGrafico}>
            <PatientHeatmap
              isLoading={isLoading}
              selectedMonth={moment().month()}
              selectedYear={moment().year()}
              colicaHeatmap={heatmap?.colicaHeatmap ?? []}
              dorCabecaHeatmap={heatmap?.dorCabecaHeatmap ?? []}
              nauseaHeatmap={heatmap?.nauseaHeatmap ?? []}
              tonturaHeatmap={heatmap?.tonturaHeatmap ?? []}
              vomitoHeatmap={heatmap?.vomitoHeatmap ?? []}
            />
          </div>
          <div className={styles.spacer100} />
        </>
      )}

      <Header />
    </div>
  );
}

export default PrintService;
// enum NavButtonsType {
//   Peso = 1,
//   BloodPressure = 2,
//   MovFetal = 3,
//   Humor = 4,
// }

// enum NavButtonsGlicemiaType {
//   Glicemia = 1,
//   GlicemiaJejum = 2,
//   PostCoffee = 3,
//   PreLunch = 4,
//   PreDinner = 5,
//   PostDinner = 6,
//   Hour22 = 7,
// }

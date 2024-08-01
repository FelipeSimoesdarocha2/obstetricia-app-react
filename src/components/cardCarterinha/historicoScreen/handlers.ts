import React from "react";
import { ICreateHistoryCarterinhaProps } from "@core/@http/history/historyProblems";
import { historicoEnum } from "../constants";

export type Historico = {
  name: historicoEnum;
  checked: boolean;
}[][];

export const handleDocument = (
  historico: Historico,
  historicoFamiliar: Historico,
  historicoObstetrico: Historico,
  gestationId: string,
  carteirinhaId: string
): ICreateHistoryCarterinhaProps => {
  const data = {
    gestationId: gestationId,
    carteirinhaId: carteirinhaId,
    hipertensaoArterialHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.hipertensaoArterialHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    diabetesHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.diabetesHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    cardiopatiaHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.cardiopatiaHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    cirugiaHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter((e) => e.name === historicoEnum.cirugiaHistoricoPessoal)[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    cirugiaPelvUlterinaHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.cirugiaPelvUlterinaHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    alergiasHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.alergiasHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    gemelarHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter((e) => e.name === historicoEnum.gemelarHistoricoPessoal)[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    infeccaoUrinariaHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.infeccaoUrinariaHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    transfSanguineaHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.transfSanguineaHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    lupusHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter((e) => e.name === historicoEnum.lupusHistoricoPessoal)[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    doencasPsiquiatricasHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.doencasPsiquiatricasHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    tromboembolismoHistoricoPessoal:
      historico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.tromboembolismoHistoricoPessoal
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    hipertensaoArterialHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.hipertensaoArterialHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    diabetesHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.diabetesHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    cardiopatiaHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.cardiopatiaHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    alergiasHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.alergiasHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    hipoHipertireoidismoHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.hipoHipertireoidismoHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    doencasAutoimunesHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.doencasAutoimunesHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    doencasPsiquiatricasHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.doencasPsiquiatricasHistoricoFamiliar
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    cancerHistoricoFamiliar:
      historicoFamiliar
        .map(
          (e) =>
            e.filter((e) => e.name === historicoEnum.cancerHistoricoFamiliar)[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    preEclampsiaEclampsiaHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name ===
                historicoEnum.preEclampsiaEclampsiaHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    incIstmocervicaHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.incIstmocervicaHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    prematuridadHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.prematuridadHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    isoimunizacaoRHHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.isoimunizacaoRHHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    oligoPolidramioHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.oligoPolidramioHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    ciurHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter((e) => e.name === historicoEnum.ciurHistoricoObstetrico)[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    posDatismoHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.posDatismoHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    anemiaHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.anemiaHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    toxoplasmoseHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.toxoplasmoseHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    ituPielonefriteHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) => e.name === historicoEnum.ituPielonefriteHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    historicoObstetricoHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.historicoObstetricoHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    hemorragiaPrimeiroTrimestreHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name ===
                historicoEnum.hemorragiaPrimeiroTrimestreHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    hemorragiaSegundoTrimestreHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name ===
                historicoEnum.hemorragiaSegundoTrimestreHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
    maFormacaoSindromeHistoricoObstetrico:
      historicoObstetrico
        .map(
          (e) =>
            e.filter(
              (e) =>
                e.name === historicoEnum.maFormacaoSindromeHistoricoObstetrico
            )[0]
        )
        .filter((e) => e?.checked)[0]?.checked ?? false,
  };

  return data as ICreateHistoryCarterinhaProps;
};

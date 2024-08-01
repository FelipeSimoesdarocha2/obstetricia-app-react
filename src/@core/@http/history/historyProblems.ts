import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import {
  IHealthProblem,
  IHealthProblemAfterPost,
} from "../../models/healthProblems";
import { IHealthProblemResponse } from "../models/responses/healthProblems";
import { TypeOutros } from "components/cardCarterinha/Types.Cartetinha";

export interface ISearchHealthProblemsByDoctorIdProps {
  type: TypeOutros;
  historicoCarteirinhaId: string;
  description: string;
}

export interface HistoryGetAll {
  gestationId: string;
}

export type searchHistoryByPacientIdResponse = {
  id: string;
  name: string;
};

export interface ICreateHistoryCarterinhaProps {
  id: string;
  gestationId: string;
  carteirinhaId: string;
  hipertensaoArterialHistoricoPessoal: boolean;
  diabetesHistoricoPessoal: boolean;
  cardiopatiaHistoricoPessoal: boolean;
  cirugiaHistoricoPessoal: boolean;
  cirugiaPelvUlterinaHistoricoPessoal: boolean;
  alergiasHistoricoPessoal: boolean;
  gemelarHistoricoPessoal: boolean;
  infeccaoUrinariaHistoricoPessoal: boolean;
  transfSanguineaHistoricoPessoal: boolean;
  lupusHistoricoPessoal: boolean;
  doencasPsiquiatricasHistoricoPessoal: boolean;
  tromboembolismoHistoricoPessoal: boolean;
  hipertensaoArterialHistoricoFamiliar: boolean;
  diabetesHistoricoFamiliar: boolean;
  cardiopatiaHistoricoFamiliar: boolean;
  alergiasHistoricoFamiliar: boolean;
  hipoHipertireoidismoHistoricoFamiliar: boolean;
  doencasAutoimunesHistoricoFamiliar: boolean;
  doencasPsiquiatricasHistoricoFamiliar: boolean;
  cancerHistoricoFamiliar: boolean;
  preEclampsiaEclampsiaHistoricoObstetrico: boolean;
  incIstmocervicaHistoricoObstetrico: boolean;
  prematuridadHistoricoObstetrico: boolean;
  isoimunizacaoRHHistoricoObstetrico: boolean;
  oligoPolidramioHistoricoObstetrico: boolean;
  ciurHistoricoObstetrico: boolean;
  posDatismoHistoricoObstetrico: boolean;
  anemiaHistoricoObstetrico: boolean;
  toxoplasmoseHistoricoObstetrico: boolean;
  ituPielonefriteHistoricoObstetrico: boolean;
  historicoObstetricoHistoricoObstetrico: boolean;
  hemorragiaPrimeiroTrimestreHistoricoObstetrico: boolean;
  hemorragiaSegundoTrimestreHistoricoObstetrico: boolean;
  maFormacaoSindromeHistoricoObstetrico: boolean;
}

export type historyByPacientId = {
  id: string;
  gestationId: string;
  carteirinhaId: string;
  hipertensaoArterialHistoricoPessoal: boolean;
  diabetesHistoricoPessoal: boolean;
  cardiopatiaHistoricoPessoal: boolean;
  cirugiaHistoricoPessoal: boolean;
  cirugiaPelvUlterinaHistoricoPessoal: boolean;
  alergiasHistoricoPessoal: boolean;
  gemelarHistoricoPessoal: boolean;
  infeccaoUrinariaHistoricoPessoal: boolean;
  transfSanguineaHistoricoPessoal: boolean;
  lupusHistoricoPessoal: boolean;
  doencasPsiquiatricasHistoricoPessoal: boolean;
  tromboembolismoHistoricoPessoal: boolean;
  hipertensaoArterialHistoricoFamiliar: boolean;
  diabetesHistoricoFamiliar: boolean;
  cardiopatiaHistoricoFamiliar: boolean;
  alergiasHistoricoFamiliar: boolean;
  hipoHipertireoidismoHistoricoFamiliar: boolean;
  doencasAutoimunesHistoricoFamiliar: boolean;
  doencasPsiquiatricasHistoricoFamiliar: boolean;
  cancerHistoricoFamiliar: boolean;
  preEclampsiaEclampsiaHistoricoObstetrico: boolean;
  incIstmocervicaHistoricoObstetrico: boolean;
  prematuridadHistoricoObstetrico: boolean;
  isoimunizacaoRHHistoricoObstetrico: boolean;
  oligoPolidramioHistoricoObstetrico: boolean;
  ciurHistoricoObstetrico: boolean;
  posDatismoHistoricoObstetrico: boolean;
  anemiaHistoricoObstetrico: boolean;
  toxoplasmoseHistoricoObstetrico: boolean;
  ituPielonefriteHistoricoObstetrico: boolean;
  historicoObstetricoHistoricoObstetrico: boolean;
  hemorragiaPrimeiroTrimestreHistoricoObstetrico: boolean;
  hemorragiaSegundoTrimestreHistoricoObstetrico: boolean;
  maFormacaoSindromeHistoricoObstetrico: boolean;
  historicoOutrosFamiliar:
    | {
        id: string;
        name: string;
      }[]
    | [];
  historicoOutrosPessoal:
    | {
        id: string;
        name: string;
      }[]
    | [];
  historicoOutrosObstetrico:
    | {
        id: string;
        name: string;
      }[]
    | [];
};

async function searchHistoryByPacientId(
  props: ISearchHealthProblemsByDoctorIdProps
): Promise<searchHistoryByPacientIdResponse[]> {
  const { description, type, historicoCarteirinhaId } = props;

  const queryParams = new URLSearchParams();

  queryParams.set("description", description);
  const response = (
    await getAxios().get<searchHistoryByPacientIdResponse[]>(
      `${
        process.env.REACT_APP_API_URL
      }/Carteirinha/historico-outros/all/${type}/${
        historicoCarteirinhaId ? historicoCarteirinhaId : "teste"
      }?${queryParams.toString()}`
    )
  ).data;

  return response;
}
async function historyByPacientId(
  gestationId: string
): Promise<historyByPacientId> {
  const response = (
    await getAxios().get<historyByPacientId>(
      `${process.env.REACT_APP_API_URL}/Carteirinha/historico/all/${gestationId}`
    )
  ).data;

  return response;
}

export interface ICreateHistoryProps {
  historicoCarteirinhaId: string | null;
  carteirinhaId: string;
  gestationId: string;
  outro: string;
  typeOutro: TypeOutros | null;
}

async function createHistoryOutros(props: ICreateHistoryProps): Promise<any> {
  const response = await getAxios().post<IHealthProblemAfterPost>(
    `${process.env.REACT_APP_API_URL}/Carteirinha/historico-outros`,
    props
  );

  return response.data;
}

export type createHistoryOutros = {
  historicoCarteirinhaId: string;
  carteirinhaId: string;
  gestationId: string;
  outro: string;
  typeOutro: number;
};

async function createHistoryCarterinha(
  props: ICreateHistoryCarterinhaProps
): Promise<any> {
  const response = await getAxios().post<IHealthProblemAfterPost>(
    `${process.env.REACT_APP_API_URL}/Carteirinha/historico`,
    props
  );

  return response.data;
}

async function editHistoryCarterinha(
  props: ICreateHistoryCarterinhaProps
): Promise<{ success: boolean; message: string }> {
  const response = await getAxios().put<{ success: boolean; message: string }>(
    `${process.env.REACT_APP_API_URL}/Carteirinha/historico`,
    props
  );

  return response.data;
}

async function deleteHistoryCarterinha(
  props: searchHistoryByPacientIdResponse
): Promise<{ success: boolean; message: string }> {
  const response = await getAxios().delete<{
    success: boolean;
    message: string;
  }>(
    `${process.env.REACT_APP_API_URL}/Carteirinha/historico-outros/${props.id}`
  );

  return response.data;
}

export default {
  searchHistoryByPacientId,
  createHistoryOutros,
  historyByPacientId,
  createHistoryCarterinha,
  editHistoryCarterinha,
  deleteHistoryCarterinha,
};

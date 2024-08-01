import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import { CarteirinhaImprimir } from "./carteirinhaType";

export interface getAllCarteirinhaProps {
  gestationId: string;
}

export interface ResponseCarteirinha {
  id: string;
  historicoCarteirinhaId: string;
  linkCarteirinha: string;
  linkCarteirinhaId: string;
  dataUltimaAtividadeConsulta: string;
  dataUltimaAtividadeHistoricos: string;
  dataUltimaAtividadeExamesLaboratoriais: string;
  dataUltimaAtividadeExamesDeImagem: string;
  dataUltimaAtividadeVacina: string;
}
export interface ResponseCarteirinhaCod {
  carteirinhaId: string;
  link: string;
  imagemPaciente: string | null;
  nomePaciente: string | null;
  telefonePaciente: string | null;
  emailPaciente: string;
  obstetraPaciente: string | null;
  convenioPaciente: string;
  riscoPaciente: string;
  firstEcoPaciente: string;
  igEcoPaciente: string | null;
  dppEcoPaciente: string | null;
  dumPaciente: string | null;
  igDumPaciente: string | null;
  dppDumPaciente: string | null;
  consultasDestaque: [];
  examesLaboratoriaisDestaque: [];
  examesLaboratoriais: [];
  examesImagemDestaque: [];
  examesImagem: [];
  consultas: [];
  historicoPessoal: [];
  historicoFamiliar: [];
  historicoObstetrico: [];
  vacinas: [];
  informacoesBasicas: boolean;
  consulta: boolean;
  historicos: boolean;
  vacina: boolean;
  examesLaboratorial: boolean;
  exameImagem: boolean;
  graficosMonitoramento: boolean;
  pressao: boolean;
  peso: boolean;
  alturaUlterina: boolean;
  glicemias: boolean;
  humor: boolean;
  sintomas: boolean;
  movFetal: boolean;
}

export type gerarLink = {
  gestationId: string;
  carteirinhaId: string;
  informacoesBasicas: boolean;
  consultas: boolean;
  historicos: boolean;
  vacinas: boolean;
  examesLaboratoriais: boolean;
  examesImagem: boolean;
  graficosMonitoramento: boolean;
  pressao: boolean;
  peso: boolean;
  alturaUlterina: boolean;
  glicemias: boolean;
  humor: boolean;
  sintomas: boolean;
  movFetal: boolean;
};

async function getAllCarteirinha(
  gestationId: string
): Promise<ResponseCarteirinha> {
  const response = (
    await getAxios().get<ResponseCarteirinha>(
      `${process.env.REACT_APP_API_URL}/Carteirinha/${gestationId}`
    )
  ).data;

  return response;
}

async function getPrintCarteirinha(
  codigo: string
): Promise<CarteirinhaImprimir> {
  const response = (
    await getAxios().get<CarteirinhaImprimir>(
      `${process.env.REACT_APP_API_URL}/Carteirinha/obter-carteirinha-codigo/${codigo}`
    )
  ).data;

  return response;
}
async function gerarLink(props: gerarLink): Promise<any> {
  const response = await getAxios().post<{
    linkCarteirinhaId: string;
    carteirinhaId: string;
    link: string;
  }>(
    `${process.env.REACT_APP_API_URL}/Carteirinha/geracao-link-carteirinha`,
    props
  );

  return response.data;
}
async function deleteLink(id: string): Promise<any> {
  const response = await getAxios().delete(
    `${process.env.REACT_APP_API_URL}/Carteirinha/link-carteirinha/${id}`
  );

  return response.data;
}

export default {
  getAllCarteirinha,
  gerarLink,
  getPrintCarteirinha,
  deleteLink,
};

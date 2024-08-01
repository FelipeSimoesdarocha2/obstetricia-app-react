import { getAxios } from "@core/@http/axiosConfig/axiosConfig";

export type createConsultaCarterinhaProps = {
  id?: string;
  gestationId: string;
  apresentacaoFetal: string;
  carteirinhaId: string;
  date: string;
  queixa: string;
  hda: string;
  medicacoes: string;
  observacoes: string;
  exameVaginal: string;
  conduta: string;
  idadeGestacional: string;
  peso: number;
  bcf: number;
  pressaoArterial: string;
  alturaUterina: number;
  dinamicaUterina: string;
  edema: number;
  movimentacaoFetal: boolean;
  destaque: boolean;
};

export type consultaById = {
  alturaUterina: number;
  apresentacaoFetal: number;
  bcf: number;
  edema: number;
  peso: number;
  destaque: true;
  movimentacaoFetal: true;
  carteirinha: string | null;
  gestation: string | null;
  carteirinhaId: string;
  conduta: string;
  createdAt: string;
  date: string;
  dinamicaUterina: string;
  exameVaginal: string;
  gestationId: string;
  hda: string;
  id: string;
  idadeGestacional: string;
  medicacoes: string;
  observacoes: string;
  pressaoArterial: string;
  queixa: string;
  updatedAt: string;
};

async function getConsultaCarteirinha(gestationId: string) {
  const response = await getAxios().get(
    `${process.env.REACT_APP_API_URL}/Carteirinha/historico-outros/${gestationId}`
  );

  return response.data;
}

async function createConsultaCarterinha(
  props: createConsultaCarterinhaProps
): Promise<any> {
  const response = await getAxios().post(
    `${process.env.REACT_APP_API_URL}/Carteirinha/consulta`,
    props
  );

  return response.data;
}

async function editConsultaCarterinha(
  props: createConsultaCarterinhaProps
): Promise<any> {
  const response = await getAxios().put(
    `${process.env.REACT_APP_API_URL}/Carteirinha/consulta`,
    props
  );

  return response.data;
}

async function getConsultaHisoticoConsulta(gestationId: string): Promise<any> {
  const response = await getAxios().get<{
    dum: string;
    dateDum: string;
    dateDumIOSString: string;
    dpp: string;
    consultaCarteirinhaDetail: {
      id: string;
      date: string;
      percentual: number;
      order: number;
    }[];
  }>(`${process.env.REACT_APP_API_URL}/Carteirinha/consulta/${gestationId}`);

  return response.data;
}
async function getConsultaHisoticoConsultaById(
  id: string
): Promise<consultaById> {
  const response = await getAxios().get<consultaById>(
    `${process.env.REACT_APP_API_URL}/Carteirinha/consultaById/${id}`
  );

  return response.data;
}

export default {
  editConsultaCarterinha,
  getConsultaCarteirinha,
  createConsultaCarterinha,
  getConsultaHisoticoConsulta,
  getConsultaHisoticoConsultaById,
};

import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import moment from "moment";

export type createImagemProps = {
  gestationId: string;
  carteirinhaId: string;
  date: string;
  resultado: string;
  examesDeImagemTipo: number;
  destaque: boolean;
};

async function getImagem(carteirinhaId: string) {
  const response = await getAxios().get<
    {
      id: string;
      descricao: string;
      date: string;
      resultado: string;
    }[]
  >(
    `${process.env.REACT_APP_API_URL}/Carteirinha/${carteirinhaId}/exames-de-imagem`
  );
  return response.data.map((item) => {
    return {
      id: item.id,
      columns: [
        { id: "1", value: item.descricao },
        { id: "2", value: moment(item.date).format("DD/MM/YYYY") },
        {
          id: "3",
          value: item.resultado,
        },
        {
          id: "4",
          value: "",
        },
      ],
    };
  });
}

async function createImagem(props: createImagemProps): Promise<any> {
  const response = await getAxios().post(
    `${process.env.REACT_APP_API_URL}/Carteirinha/exames-de-imagem/`,
    props
  );

  return response.data;
}

async function deleteImagem(id: string) {
  const response = await getAxios().delete(
    `${process.env.REACT_APP_API_URL}/Carteirinha/exame-de-imagem/${id}`
  );
  return response;
}

export default {
  getImagem,
  createImagem,
  deleteImagem,
};

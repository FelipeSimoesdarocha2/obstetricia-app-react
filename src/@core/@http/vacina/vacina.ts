import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import moment from "moment";

export type createVacinaProps = {
  gestationId: string;
  carteirinhaId: string;
  date: string;
  vacinaDoses: number;
  vacinaTipos: number;
  imunizacao: number;
  destaque: boolean;
};

async function getVacina(carteirinhaId: string) {
  const response = await getAxios().get<
    {
      id: string;
      descricao: string;
      date: string;
      resultado: string;
      vacinaDoses: number;
    }[]
  >(`${process.env.REACT_APP_API_URL}/Carteirinha/${carteirinhaId}/vacinas`);
  return response.data.map((item) => {
    return {
      id: item.id,
      columns: [
        { id: "1", value: item.descricao },
        {
          id: "2",
          value:
            item.vacinaDoses === 1
              ? "Dose única"
              : item.vacinaDoses === 2
              ? "1ª Dose"
              : item.vacinaDoses === 3
              ? "2ª Dose"
              : "3ª Dose",
        },
        { id: "3", value: moment(item.date).format("DD/MM/YYYY") },
        {
          id: "4",
          value: item.resultado,
        },
        {
          id: "5",
          value: "",
        },
      ],
    };
  });
}

async function createVacina(props: createVacinaProps): Promise<any> {
  const response = await getAxios().post(
    `${process.env.REACT_APP_API_URL}/Carteirinha/vacinas`,
    props
  );

  return response.data;
}

async function deleteVacina(id: string) {
  const response = await getAxios().delete(
    `${process.env.REACT_APP_API_URL}/Carteirinha/vacinas/${id}`
  );
  return response;
}

export default {
  getVacina,
  createVacina,
  deleteVacina,
};

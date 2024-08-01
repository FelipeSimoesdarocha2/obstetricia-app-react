import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import moment from "moment";

export type createExameLaboratorialProps = {
  gestationId: string;
  carteirinhaId: string;
  date: string;
  resultado: string;
  examesLaboratoriaisTipo: number;
  destaque: boolean;
};

async function getExameLaboratoriais(carteirinhaId: string) {
  const response = await getAxios().get<
    {
      id: string;
      descricao: string;
      date: string;
      resultado: string;
    }[]
  >(
    `${process.env.REACT_APP_API_URL}/Carteirinha/${carteirinhaId}/exames-laboratoriais`
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
async function deleteExameLaboratoriais(id: string) {
  const response = await getAxios().delete(
    `${process.env.REACT_APP_API_URL}/Carteirinha/exame-laboratoriais/${id}`
  );
  return response;
}

async function createExameLaboratoria(
  props: createExameLaboratorialProps
): Promise<any> {
  const response = await getAxios().post(
    `${process.env.REACT_APP_API_URL}/Carteirinha/exames-laboratoriais/`,
    props
  );

  return response.data;
}

export default {
  getExameLaboratoriais,
  createExameLaboratoria,
  deleteExameLaboratoriais,
};

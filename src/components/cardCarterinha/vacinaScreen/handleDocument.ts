import moment from "moment";
import { createVacinaProps } from "@core/@http/vacina/vacina";

export const handlerDocument = (
  patient: any,
  carteirinhaId: string,
  gestationId: string
) => {
  const data: createVacinaProps = {
    carteirinhaId: carteirinhaId,
    gestationId: gestationId,
    date: moment(patient.data).toISOString(),
    imunizacao: patient.imune,
    vacinaDoses: patient.dose,
    vacinaTipos: patient.tipo,
    destaque: patient.destacarVacina === 0 ? false : true,
  };

  return data;
};

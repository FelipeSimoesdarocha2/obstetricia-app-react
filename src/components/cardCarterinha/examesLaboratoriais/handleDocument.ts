import React from "react";
import moment from "moment";
import { createExameLaboratorialProps } from "@core/@http/exameLaboratorias/exameLaboratorias";

export const handlerDocument = (
  patient: any,
  carteirinhaId: string,
  gestationId: string
) => {
  const data: createExameLaboratorialProps = {
    carteirinhaId: carteirinhaId,
    gestationId: gestationId,
    date: moment(patient.data).toISOString(),
    resultado: patient.resultado,
    examesLaboratoriaisTipo: patient.tipo,
    destaque: patient.destaque === 0 ? false : true,
  };
  console.log(44444, data);

  return data;
};

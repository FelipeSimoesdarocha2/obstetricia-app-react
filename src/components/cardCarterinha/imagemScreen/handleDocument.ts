import React from "react";
import moment from "moment";
import { createImagemProps } from "@core/@http/imagem/imagem";

export const handlerDocument = (
  patient: any,
  carteirinhaId: string,
  gestationId: string
) => {
  const data: createImagemProps = {
    carteirinhaId: carteirinhaId,
    gestationId: gestationId,
    date: moment(patient.data).toISOString(),
    resultado: patient.resultado,
    examesDeImagemTipo: patient.tipo,
    destaque: patient.destaque === 0 ? false : true,
  };

  return data;
};

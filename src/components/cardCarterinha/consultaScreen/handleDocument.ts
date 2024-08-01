import React from "react";
import { createConsultaCarterinhaProps } from "@core/@http/consulta/consulta";
import moment from "moment";
import { consulta } from "./ConsultaScreen";

export type handlerDocumentProps = consulta & {};

export const handlerDocument = (
  patient: handlerDocumentProps,
  gestationId: string,
  carteirinhaId: string
) => {
  const data: createConsultaCarterinhaProps = {
    id: patient.id,
    gestationId: gestationId,
    carteirinhaId: carteirinhaId,
    date: moment(patient.dateFirstEco).toISOString(),
    queixa: patient.queixa,
    hda: patient.hda,
    medicacoes: patient.medicacoes,
    observacoes: patient.observacoes,
    exameVaginal: patient.exameVaginal,
    conduta: patient.conduta,
    idadeGestacional: patient.idadeGestacional,
    peso: patient.peso,
    bcf: patient.bcf,
    pressaoArterial: patient.pressaoArterial,
    alturaUterina: patient.alturaUterina,
    apresentacaoFetal: patient.apresentacaoFetal,
    dinamicaUterina: patient.dinamicaUterina,
    edema: patient.edma,
    movimentacaoFetal: patient.edma === 0 ? false : true,
    destaque: patient.destacarConsultaUterina === 0 ? false : true,
  };

  return data as createConsultaCarterinhaProps;
};

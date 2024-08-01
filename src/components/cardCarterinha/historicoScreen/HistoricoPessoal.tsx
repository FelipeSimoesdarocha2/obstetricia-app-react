import React from "react";
import styles from "../CardCartetinha.module.scss";
import Calendar from "../imagens/calendar.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useEffect, useState } from "react";

import Card from "components/card/Card";
import Button from "components/button/Button";
import Checkbox from "components/checkbox/Checkbox";
import PatientSearchBox from "../@components/PatientSearchBox";
import { IPatientDetails } from "@core/models/patient";
import { ISearchBoxItem } from "components/search-box/SearchBox";
import { TypeOutros } from "../Types.Cartetinha";
import { historicoEnum } from "../constants";
import { useToast } from "providers/ToastProvider/ToastProvider";
import healthProblemsHttp from "@core/@http/history/historyProblems";

type historicoProps = {
  historico: {
    name: historicoEnum;
    checked: boolean;
  }[][];
  toggleCheckedByName: (name: historicoEnum) => void;
  othersHistoryPersonal: ISearchBoxItem[] | undefined;
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  historicoId: string;
};

function HistoricoPessoal(props: historicoProps) {
  const {
    patient,
    gestationId,
    historicoId,
    historico,
    othersHistoryPersonal,
    toggleCheckedByName,
  } = props;
  const [othersHistoryPersonalSelected, setOthersHistoryPersonalSelected] =
    useState<string[]>([""]);

  const onAddItemPersonal = (item: ISearchBoxItem) => {
    const historico = othersHistoryPersonalSelected ?? [];
    const historicoIds = [...historico];
    historicoIds.push(item.id);
    setOthersHistoryPersonalSelected(historicoIds);
  };

  const onRemoveItemPersonal = (item: ISearchBoxItem) => {
    const historico = othersHistoryPersonalSelected ?? [];
    const historicoIds = [...historico];
    const index = historicoIds.findIndex((id) => id === item.id);
    historicoIds.splice(index, 1);
    setOthersHistoryPersonalSelected(historicoIds);
  };

  return (
    <>
      <div className={styles.spacerHeader} />
      <span className={styles.titleSection}>Histórico Pessoal</span>
      <div className={styles.line} />
      <div className={styles.spacer} />
      <div className={styles.rowCheckboxHistorico}>
        {historico.map((subarray, subIndex) => (
          <div className={styles.width30}>
            {subarray.map((item, index) => (
              <div key={index} className={styles.width30}>
                <Checkbox
                  onChange={(e) => toggleCheckedByName(item.name)}
                  title={item.name}
                  checked={item.checked}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.width60}>
        {console.log("othersHistoryPersonal", othersHistoryPersonal)}
        <PatientSearchBox
          values={othersHistoryPersonal}
          onSelectItem={onAddItemPersonal}
          onRemoveItem={onRemoveItemPersonal}
          title="Outros"
          carteirinhaId={patient?.carteirinhaId || ""}
          gestationId={gestationId}
          historicoCarteirinhaId={historicoId}
          typeOutro={TypeOutros.HistoricoPessoal}
        />
      </div>
    </>
  );
}

export default HistoricoPessoal;

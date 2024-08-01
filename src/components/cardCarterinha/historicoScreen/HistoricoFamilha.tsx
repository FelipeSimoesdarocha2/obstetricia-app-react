import React from "react";
import styles from "../CardCartetinha.module.scss";

import { useState } from "react";

import Checkbox from "components/checkbox/Checkbox";
import PatientSearchBox from "../@components/PatientSearchBox";
import { IPatientDetails } from "@core/models/patient";
import { ISearchBoxItem } from "components/search-box/SearchBox";
import { TypeOutros } from "../Types.Cartetinha";
import { historicoEnum } from "../constants";

type historicoProps = {
  historicoFamiliar: {
    name: historicoEnum;
    checked: boolean;
  }[][];
  toggleCheckedByNameFamiliar: (name: historicoEnum) => void;
  othersHistoryFamily: ISearchBoxItem[] | undefined;
  patient: IPatientDetails | null | undefined;
  gestationId: string;
  historicoId: string;
};

function HistoricoFamilha(props: historicoProps) {
  const {
    patient,
    gestationId,
    historicoId,
    historicoFamiliar,
    othersHistoryFamily,
    toggleCheckedByNameFamiliar,
  } = props;
  const [othersHistoryFamilhaSelected, setOthersHistoryFamilhaSelected] =
    useState<string[]>([""]);

  const onAddItemFamilha = (item: ISearchBoxItem) => {
    const historico = othersHistoryFamilhaSelected ?? [];
    const historicoIds = [...historico];
    historicoIds.push(item.id);
    setOthersHistoryFamilhaSelected(historicoIds);
  };

  const onRemoveItemFamilha = (item: ISearchBoxItem) => {
    const historico = othersHistoryFamilhaSelected ?? [];
    const historicoIds = [...historico];
    const index = historicoIds.findIndex((id) => id === item.id);
    historicoIds.splice(index, 1);
    setOthersHistoryFamilhaSelected(historicoIds);
  };

  return (
    <>
      <span className={styles.titleSection}>Histórico Familiar</span>
      <div className={styles.line} />
      <div className={styles.spacer} />
      <div className={styles.rowCheckboxHistorico}>
        {historicoFamiliar.map((subarray, subIndex) => (
          <div className={styles.width30}>
            {subarray.map((item, index) => (
              <div key={index} className={styles.width30}>
                <Checkbox
                  onChange={(e) => toggleCheckedByNameFamiliar(item.name)}
                  title={item.name}
                  checked={item.checked}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.width60}>
        <PatientSearchBox
          values={othersHistoryFamily}
          onSelectItem={onAddItemFamilha}
          onRemoveItem={onRemoveItemFamilha}
          title="Outros"
          carteirinhaId={patient?.carteirinhaId || ""}
          gestationId={gestationId}
          historicoCarteirinhaId={historicoId}
          typeOutro={TypeOutros.HistoricoFamiliar}
        />
      </div>
    </>
  );
}

export default HistoricoFamilha;

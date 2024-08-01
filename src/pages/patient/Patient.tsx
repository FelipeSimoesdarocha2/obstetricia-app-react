import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../@core/hooks/query";
import { IPatient } from "../../@core/models/patient";
import Tab, { ITabHead, ITabHeadItem } from "../../components/tab/Tab";
import PatientDetails from "./@subpages/Details/PatientDetails";
import PatientsList from "./@subpages/List/PatientsList";
import Upgrade from "../plan/Upgrade";

import { LocalStorage } from "../../@core/helpers/localStorage";

const tabHeaderDefault: ITabHead = {
  main: "",
  items: [
    {
      active: true,
      id: "",
      name: "Pacientes",
      alias: "Pacientes",
      canClose: false,
      ref: null,
    },
  ],
};

function Patient() {
  const [tabHeader, setTabHeader] = useState<ITabHead>(tabHeaderDefault);
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const query = useQuery();
  const navigate = useNavigate();

  const doctorId = localStorage.getItem(LocalStorage.DoctorId);

  const selectPatient = (patient: IPatient | undefined) => {
    if (!patient?.id) {
      query.delete("selectedPatient");
    }

    if (patient?.id) {
      query.set("selectedPatient", patient.id);
    }

    if (patient !== undefined) {
      setSelectedPatient(patient);
    }

    if (patient?.id) {
      navigate(`/patients?${query.toString()}`);
    } else {
      navigate(`/patients`);
    }
  };

  const handleClickPatient = (patient: IPatient) => {
    const tabHeaderItem: ITabHeadItem = {
      active: true,
      id: patient.id,
      name: patient.nome,
      canClose: true,
      alias: "Detalhes Paciente",
      ref: patient,
    };

    const copyItems = [
      ...tabHeader.items.map((item) => {
        const copyItem = { ...item };

        if (copyItem.id !== patient.id) {
          copyItem.active = false;
        }

        if (copyItem.id === patient.id) {
          copyItem.active = true;
        }

        return copyItem;
      }),
    ];

    if (tabHeader.items.findIndex((item) => item.id === patient.id) === -1) {
      copyItems.push(tabHeaderItem);
    }

    setTabHeader({ ...tabHeader, items: copyItems });
    selectPatient(patient);
  };

  const renderBody = () => {
    if (!selectedPatient) {
      return <PatientsList onClickPatient={handleClickPatient} />;
    }

    return (
      <PatientDetails
        id={selectedPatient.id}
        gestationId={selectedPatient.gestationId}
      />
    );
  };

  if (!doctorId) {
    return null;
  }

  return (
    <Tab
      header={tabHeader}
      transparentContent={!!selectedPatient}
      body={renderBody()}
      onClickCarouselItem={(item) => selectPatient(item?.ref)}
    />
  );
}

export default Patient;

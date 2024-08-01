import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "../../../../@core/hooks/query";
import { IPatientForm } from "../../../../@core/models/patient";
import Tab from "../../../../components/tab/Tab";
import PatientForm from "../@components/Form/PatientForm";

import patientsService from "../../../../@core/@http/patient/patient";

import { useToast } from "../../../../providers/ToastProvider/ToastProvider";

function PatientEdit() {
  const { id, gestationId } = useParams();

  const navigate = useNavigate();

  const query = useQuery();

  const [patient, setPatient] = useState<IPatientForm>();

  const { toast } = useToast();

  const formatDate = (value?: string) =>
    value && format(new Date(value), "yyyy-MM-dd");

  const navigateToList = () => {
    query.set("selectedPatient", id?.toString() ?? "");

    navigate(`../patients?${query.toString()}`);
  };

  const handleEditPatient = async (patient: IPatientForm) => {
    try {
      await patientsService.edit(id as string, gestationId as string, patient);

      toast.success({
        title: "Obstcare",
        message: "Alteração salva com sucesso!",
      });

      navigateToList();
    } catch (error: any) {
      toast.error({
        title: "Erro!",
        message: error.message,
      });
    }
  };

  const fetchPatient = async () => {
    try {
      const response = await patientsService.patientToEdit(
        id as string,
        gestationId as string
      );

      if (response.data) {
        const { data } = response;

        setPatient({
          ...data,
          birthDate: formatDate(data.birthDate),
          lastMenstruateDate: formatDate(data.lastMenstruateDate),
          dateFirstEco: formatDate(data.dateFirstEco),
          healthProblems: data.healthProblemsIds,
          healthProblemsIds: data.healthProblemsIds?.map(({ id }: any) => id),
        });
      }
    } catch (error: any) {
      toast.error({
        title: "Erro!",
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  return (
    <Tab
      header={{ items: [], main: "" }}
      body={
        <PatientForm
          title="Editar Paciente"
          onClickCancelar={navigateToList}
          onSubmit={handleEditPatient}
          editPatient={patient}
        />
      }
    />
  );
}

export default PatientEdit;

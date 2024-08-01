import React from "react";
import { useNavigate } from "react-router-dom";
import { IPatientForm } from "../../../../@core/models/patient";
import Tab from "../../../../components/tab/Tab";
import PatientForm from "../@components/Form/PatientForm";
import patientHttp from "../../../../@core/@http/patient/patient";

import { useToast } from '../../../../providers/ToastProvider/ToastProvider'

function PatientAdd() {
  const navigate = useNavigate();
  
  const { toast } = useToast();

  const navigateToList = () => {
    navigate("../patients");
  };

  const addPatient = async (patient: IPatientForm) => {
    try {

      await patientHttp.create(patient);

      navigateToList();
    } catch (error: any){
      let message = 'Não foi possível cadastrar a paciente, tente novamente mais tarde.';

      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          message = error.response.data;
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      }

      toast.error({
        title: 'Erro!',
        message
      })
    }
  };

  return (
    <Tab
      header={{ items: [], main: "" }}
      body={
        <PatientForm
          title="Nova Paciente"
          onClickCancelar={navigateToList}
          onSubmit={addPatient}
        />
      }
    />
  );
}

export default PatientAdd;

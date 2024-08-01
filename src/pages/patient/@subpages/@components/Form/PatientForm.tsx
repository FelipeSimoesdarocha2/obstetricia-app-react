/* eslint-disable react/require-default-props */
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "./PatientForm.module.scss";
import { IPatientForm } from "../../../../../@core/models/patient";
import Input from "../../../../../components/input/Input";
import InputPhone from "../../../../../components/input-phone/InputPhone";
import InputDate from "../../../../../components/input-date/InputDate";
import Card from "../../../../../components/card/Card";
import RadioButton from "../../../../../components/radio/RadioButton";
import { ISearchBoxItem } from "../../../../../components/search-box/SearchBox";
import PatientSearchBox from "./@components/PatientSearchBox";
import Button from "../../../../../components/button/Button";

interface IPatientFormProps {
  title: string;
  onClickCancelar: () => void;
  onSubmit: (patient: IPatientForm) => Promise<void>;
  editPatient?: IPatientForm;
}

function PatientForm(props: IPatientFormProps) {
  const { title, onClickCancelar, onSubmit, editPatient } = props;

  const [patient, setPatient] = useState<IPatientForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreated, setCreated] = useState<boolean>(false);

  const maxDateString = format(new Date(), "yyyy-MM-dd");

  const requiredRiscos = patient?.risk === undefined;

  const onChangeNome = (name: string) => {
    setPatient({ ...patient, name });
  };

  const onChangeTelefone = (phone: string) => {
    setPatient({ ...patient, phone });
  };

  const onChangeEmail = (email: string) => {
    setPatient({ ...patient, email });
  };

  const onChangeDataNascimento = (birthDate: string) => {
    setPatient({ ...patient, birthDate });
  };

  const onChangeDataDum = (lastMenstruateDate: string) => {
    setPatient({ ...patient, lastMenstruateDate });
  };

  const onChangeDataPrimeiraUltrassom = (dateFirstEco: string) => {
    setPatient({ ...patient, dateFirstEco });
  };

  const onChangeQtdSemanasPrimeiraUltrassom = (weeks: string) => {
    setPatient({
      ...patient,
      weeks: +weeks,
    });
  };

  const onChangeQtdDiasPrimeiraUltrassom = (days: string) => {
    setPatient({
      ...patient,
      days: +days,
    });
  };

  const onChangeProcedencia = (provenance: string) => {
    setPatient({ ...patient, provenance });
  };

  const onChangeRiscoBaixo = () => {
    setPatient({ ...patient, risk: 0 });
  };

  const onChangeRiscoAlto = () => {
    setPatient({ ...patient, risk: 1 });
  };

  const onChangeGestacoesPrevias = (previousPregnancies: string) => {
    setPatient({ ...patient, previousPregnancies: +previousPregnancies });
  };

  const onChangePartosPrevios = (previousBirths: string) => {
    setPatient({ ...patient, previousBirths: +previousBirths });
  };

  const onChangePacienteInternada = (hospitalized: boolean) => {
    setPatient({ ...patient, hospitalized });
  };

  const onAddItem = (item: ISearchBoxItem) => {
    const problems = patient?.healthProblemsIds ?? [];
    const healthProblemsIds = [...problems];

    healthProblemsIds.push(item.id);

    setPatient({ ...patient, healthProblemsIds });
  };

  const onRemoveItem = (item: ISearchBoxItem) => {
    const problems = patient?.healthProblemsIds ?? [];
    const healthProblemsIds = [...problems];

    const index = healthProblemsIds.findIndex((id) => id === item.id);
    healthProblemsIds.splice(index, 1);

    setPatient({ ...patient, healthProblemsIds });
  };

  const onChangeConvenio = (healthInsurance: string) => {
    setPatient({ ...patient, healthInsurance });
  };

  const onChangeProntuario = (linkOrNumberPe: string) => {
    setPatient({ ...patient, linkOrNumberPe });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!patient) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(patient);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (editPatient) {
      setPatient(editPatient);
    }
  }, [editPatient]);

  return (
    <div className={styles.container}>
      <form
        role="presentation"
        onSubmit={submit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <Card
          header={{ title, rightContent: null }}
          width="100%"
          classBody={styles.cardBody}
          body={
            <>
              <div className={styles.row}>
                <Input
                  type="text"
                  width="40%"
                  value={patient?.name}
                  id="nome-completo"
                  label="Nome completo"
                  required
                  onChange={onChangeNome}
                />
                <InputPhone
                  value={patient?.phone}
                  width="40%"
                  id="telefone"
                  label="Telefone"
                  required
                  onChange={onChangeTelefone}
                />
              </div>

              <div className={styles.row}>
                <Input
                  type="email"
                  width="40%"
                  value={patient?.email}
                  id="email"
                  label="Email"
                  required
                  onChange={onChangeEmail}
                  placeholder="email@mail.com"
                  info="A paciente receberá um e-mail contendo as informações para fazer
                    os lançamentos dos monitoramentos diários."
                />

                <InputDate
                  value={patient?.birthDate}
                  width="40%"
                  id="data-nascimento"
                  required
                  label="Data de Nascimento"
                  onChange={onChangeDataNascimento}
                  max={maxDateString}
                />
              </div>
            </>
          }
        />

        <Card
          header={{ title: "Cálculo DUM", rightContent: null }}
          width="40%"
          classBody={styles.cardBody}
          className={styles.noPaddingRight}
          body={
            <InputDate
              info="Resultado DPP DUM (01/01/0001)"
              width="100%"
              value={patient?.lastMenstruateDate}
              id="data-dum"
              required={!patient?.dateFirstEco}
              label="Data DUM"
              onChange={onChangeDataDum}
            />
          }
        />

        <Card
          header={{ title: "Cálculo 1ª Ultrassom", rightContent: null }}
          width="40%"
          classBody={styles.cardBody}
          className={styles.noPaddingLeft}
          body={
            <>
              <div className={styles.row}>
                <InputDate
                  info="Resultado DPP DUM (01/01/0001)"
                  width="100%"
                  value={patient?.dateFirstEco}
                  id="data-dum"
                  required={!patient?.lastMenstruateDate}
                  label="Data da 1ª Ultrassom"
                  onChange={onChangeDataPrimeiraUltrassom}
                />
              </div>

              <div className={`${styles.row} ${styles.spaceBetween}`}>
                <Input
                  id="qtd-semanas"
                  width="40%"
                  type="number"
                  value={patient?.weeks}
                  onChange={onChangeQtdSemanasPrimeiraUltrassom}
                  label="Qtd semanas"
                />

                <Input
                  id="qtd-dias"
                  width="40%"
                  type="number"
                  value={patient?.days}
                  onChange={onChangeQtdDiasPrimeiraUltrassom}
                  label="Qtd dias"
                />
              </div>
            </>
          }
        />

        <Card
          header={{ title: "Saúde da Paciente", rightContent: null }}
          width="100%"
          classBody={styles.cardBody}
          body={
            <>
              <div className={styles.row}>
                <Input
                  value={patient?.provenance}
                  id="data-dum"
                  type="text"
                  label="Qual o local de atendimento da paciente?"
                  onChange={onChangeProcedencia}
                />

                <RadioButton
                  id="riscos"
                  label="Qual o nível de risco"
                  values={[
                    {
                      id: "risco-baixo",
                      label: "Baixo",
                      checked: patient?.risk === 0,
                      onChange: (_) => onChangeRiscoBaixo(),
                      required: requiredRiscos,
                    },
                    {
                      id: "risco-alto",
                      label: "Alto",
                      checked: patient?.risk === 1,
                      onChange: (_) => onChangeRiscoAlto(),
                      required: requiredRiscos,
                    },
                  ]}
                />
                <Input
                  id="gestacoes-previas"
                  width="20%"
                  type="number"
                  value={patient?.previousPregnancies}
                  onChange={onChangeGestacoesPrevias}
                  label="Gestações prévias?"
                  min="0"
                  required
                />

                <Input
                  id="partos-previos"
                  width="20%"
                  type="number"
                  value={patient?.previousBirths}
                  onChange={onChangePartosPrevios}
                  label="Partos prévios?"
                  min="0"
                  required
                />
              </div>

              <div className={`${styles.row} ${styles.spaceBetween}`}>
                <PatientSearchBox
                  values={patient?.healthProblems}
                  onSelectItem={onAddItem}
                  onRemoveItem={onRemoveItem}
                />
              </div>

              <div className={`${styles.row} ${styles.spaceBetween}`}>
                <RadioButton
                  id="paciente-internada"
                  label="Esta paciente está internada?"
                  values={[
                    {
                      id: "paciente-internada-sim",
                      label: "Sim",
                      checked: patient?.hospitalized,
                      onChange: (_) => onChangePacienteInternada(true),
                    },
                    {
                      id: "paciente-internada-nao",
                      label: "Não",
                      checked: !patient?.hospitalized,
                      onChange: (_) => onChangePacienteInternada(false),
                    },
                  ]}
                />
              </div>
            </>
          }
        />

        <Card
          header={{ title: "Outros", rightContent: null }}
          width="100%"
          classBody={styles.cardBody}
          body={
            <>
              <Input
                value={patient?.healthInsurance}
                id="convenio"
                type="text"
                label="Convênio (opcional)"
                onChange={onChangeConvenio}
              />

              <Input
                value={patient?.linkOrNumberPe}
                id="link-numero-prontuario"
                type="text"
                label="Link ou número do Prontuário (opcional)"
                onChange={onChangeProntuario}
              />
            </>
          }
        />

        <Card
          header={{ title: "", rightContent: null }}
          width="100%"
          classBody={styles.cardBody}
          body={
            <>
              <Button
                name="Confirmar"
                isSubmit
                loading={loading}
                onClick={() => ({})}
                className={styles.btnAction}
              />

              <Button
                name="Cancelar"
                type="secondary"
                onClick={onClickCancelar}
                className={`${styles.btnAction} ${styles.secondary}`}
              />
            </>
          }
        />

        {/* <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={isCreated}
        >
          <DialogTitle style={{ fontFamily: "Sarabun", fontWeight: "700" }}>
            Paciente cadastrada com sucesso!
          </DialogTitle>
          <DialogContent
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>
              O email com a senha de acesso foi encaminhado para a paciente.
              Informe-a que ela já pode baixar e acessar o aplicativo com as
              credenciais do email enviado.
            </p>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                style={{ width: "110px" }}
                name="Ok"
                onClick={() => setCreated(false)}
                className={styles.btnAction}
              />
            </div>
          </DialogContent>
        </Dialog> */}
      </form>
    </div>
  );
}

export default PatientForm;

// React
import { useEffect, useState } from "react";

// Styles
import * as S from "./GestantesForm.styles";

// Models
import { GestantesFormProps } from "./models";
import { ICreateGestantes, IGestantes } from "../../../models";

// Formik
import { ErrorMessage, FormikProvider, useFormik } from "formik";

// Components
import { Button } from "../button";
import { Input } from "../input";
import { InputDate } from "../inputDate";
import { Select } from "../select";

// Hooks
import useValidationSchema from "../../../hooks/useValidationSchema";
import * as yup from "yup";

// Api
import {
  createGestantes,
  getGestantes,
  getObstetras,
} from "pages/admin/services/api";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email é obrigatório").email("Email é invalido"),
  name: yup.string().required("Nome é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  birthDate: yup.string().required("Aniversário é obrigatório"),
  lastMenstruateDate: yup.string().required("required"),
  previousPregnancies: yup.number().required("required"),
  previousBirths: yup.string().required("required"),
  dateFirstEco: yup.string().required("required"),
});

const GestantesForm = ({ data, setData, onClose }: GestantesFormProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [obstetraOptions, setObstetraOptions] = useState<
    { value: string; description: string }[]
  >([]);

  const handleCloseModal = () => {
    onClose();
  };

  const initialValues: IGestantes = {
    name: "",
    email: "",
    password: "",
    birthDate: "",
    phone: "",
    idDoctor: "",
    healthInsurance: "",
    linkOrNumberPe: "",
    provenance: "",
    risk: "1",
    finished: false,
    hospitalized: false,
    lastMenstruateDate: "",
    dateFirstEco: "",
    weeks: 0,
    days: 0,
    previousPregnancies: 0,
    previousBirths: 0,
  };

  const onSubmit = async () => {
    console.log(11111);
    try {
      setIsLoading(true);

      const currentDate = new Date();
      const birthDate = new Date(formik.values.birthDate);
      const lastMenstruateDate = new Date(formik.values.lastMenstruateDate);

      if (birthDate > currentDate || lastMenstruateDate > currentDate) {
        console.error(
          "Invalid dates: Birth date or last menstruate date cannot be in the future"
        );
        return;
      }

      const dataRequest: ICreateGestantes = {
        name: formik.values.name,
        email: formik.values.email,
        password: "123",
        birthDate: formik.values.birthDate,
        phone: formik.values.phone,
        idDoctor: formik.values.idDoctor,
        healthInsurance: "",
        linkOrNumberPe: "",
        provenance: "",
        risk: parseInt(formik.values.risk),
        finished: true,
        hospitalized: true,
        lastMenstruateDate: formik.values.lastMenstruateDate,
        dateFirstEco: formik.values.dateFirstEco,
        weeks: 0,
        days: 0,
        previousPregnancies: 0,
        previousBirths: 0,
      };

      await createGestantes(dataRequest);

      setData((await getGestantes()).data);
      formik.resetForm();
      handleCloseModal();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const fetchDataObstetras = async () => {
    try {
      const response = await getObstetras();
      const gestantesFormat = response.data;

      const options = gestantesFormat.map((gestante) => ({
        value: gestante.id,
        description: gestante.name,
      }));

      setObstetraOptions(options);
    } catch (error) {
      console.error("Error fetching obstetras:", error);
    }
  };

  useEffect(() => {
    fetchDataObstetras();
  }, []);

  useEffect(() => {
    if (!formik.values) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  return (
    <S.Container>
      <h2>Adicionar</h2>
      {/* @ts-ignore */}
      <FormikProvider value={formik}>
        <div className="form_itens">
          <div className="form-input">
            <Select
              id={"idDoctor"}
              title={"Obstetra"}
              data-testid="idDoctor"
              onChange={formik.handleChange("idDoctor")}
              value={formik.values.idDoctor}
              options={obstetraOptions}
            />
          </div>
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="name" component="div" />
            <Input
              key="name"
              id="name"
              title="Nome"
              type="text"
              placeholder="Escreva aqui..."
              data-testid="name"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
              autocomplete="current-name"
            />
          </div>
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="email" component="div" />
            <Input
              key="email"
              id="email"
              title="Email"
              type="text"
              placeholder="Escreva aqui..."
              data-testid="email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
              autocomplete="current-email"
            />
          </div>
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="phone" component="div" />
            <Input
              key="phone"
              id="phone"
              title="Telefone"
              type="tel"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phone"
              onChange={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              value={formik.values.phone}
              autocomplete="current-phone"
            />
          </div>
          <div className="form-input">
            <InputDate
              key="birthDate"
              id="date_of_birth"
              title="Data de nascimento"
              data-testid="birthDate"
              onChange={formik.handleChange("birthDate")}
              value={formik.values.birthDate}
            />
          </div>
          <div className="form-input">
            <InputDate
              key="lastMenstruateDate"
              id="lastMenstruateDate"
              title="Dum"
              data-testid="lastMenstruateDate"
              onChange={formik.handleChange("lastMenstruateDate")}
              value={formik.values.lastMenstruateDate}
            />
          </div>
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="name" component="div" />
            <Input
              key="previousPregnancies"
              id="previousPregnancies"
              title="Gestações prévias"
              type="text"
              placeholder=""
              data-testid="previousPregnancies"
              onChange={formik.handleChange("previousPregnancies")}
              onBlur={formik.handleBlur("previousPregnancies")}
              value={formik.values.previousPregnancies}
              autocomplete="previousPregnancies"
            />
          </div>
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="name" component="div" />
            <Input
              key="previousBirths"
              id="previousBirths"
              title="Partos prévios"
              type="text"
              placeholder="00"
              data-testid="previousBirths"
              onChange={formik.handleChange("previousBirths")}
              onBlur={formik.handleBlur("previousBirths")}
              value={formik.values.previousBirths}
              autocomplete="previousBirths"
            />
          </div>
          <div className="form-input">
            <Select
              key="risk"
              id={"risk"}
              title={"Risco"}
              data-testid="risk"
              onChange={formik.handleChange("risk")}
              value={formik.values.risk}
              options={[
                { value: "1", description: "Baixo" },
                { value: "0", description: "Alto" },
              ]}
            />
          </div>
          <div className="form-input">
            <InputDate
              key="dateFirstEco"
              id="dateFirstEco"
              title="Data da consulta"
              data-testid="dateFirstEco"
              onChange={formik.handleChange("dateFirstEco")}
              value={formik.values.dateFirstEco}
            />
          </div>
        </div>
        <div className="actions">
          <Button label="Cancel" type="primary" onClick={handleCloseModal} />
          <Button
            label="Salvar e enviar senha"
            disabled={isDisabled}
            loading={isLoading}
            type="secondary"
            onClick={() => formik.handleSubmit()}
          />
        </div>
      </FormikProvider>
    </S.Container>
  );
};

export default GestantesForm;

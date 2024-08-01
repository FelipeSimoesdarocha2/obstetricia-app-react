// React
import { useEffect, useState } from "react";

// Styles
import * as S from "./ObstetrasForm.styles";

// Models
import { ObstetrasFormProps } from "./models";
import { IObstcares } from "../../../models";

// Formik
import { useFormik, ErrorMessage, FormikProvider } from "formik";

// Components
import { Input } from "../input";
import { Button } from "../button";

// Hooks
import useValidationSchema from "../../../hooks/useValidationSchema";

// Api
import { createObstetras, getObstetras } from "pages/admin/services/api";

const ObstetrasForm = ({ data, setData, onClose }: ObstetrasFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const initialValues: IObstcares = {
    name: "",
    email: "",
    phones: "",
    crm: "",
  };

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("FullName", formik.values.name);
      formData.append("Password", "123");
      formData.append("Email", formik.values.email);
      formData.append("Phones", formik.values.phones);
      formData.append("CRM", formik.values.crm);
      formData.append("Gender", "1");
      formData.append("ProfilePicture", "null");

      await createObstetras(formData);

      setData((await getObstetras()).data);

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
    validationSchema: useValidationSchema(),
    onSubmit,
  });

  useEffect(() => {
    if (
      !formik.values.name ||
      !formik.values.email ||
      !formik.values.phones ||
      !formik.values.crm
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formik.values]);

  return (
    <S.Container>
      <h2>Adicionar</h2>
      {/* @ts-ignore */}
      <FormikProvider value={formik}>
        <div className="form_itens">
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="name" component="div" />
            <Input
              key="input-name"
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
              type="text"
              mask="(99) 9999-9999"
              placeholder="Escreva aqui..."
              data-testid="phones"
              onChange={formik.handleChange("phones")}
              onBlur={formik.handleBlur("phones")}
              value={formik.values.phones}
              autocomplete="current-phones"
            />
          </div>
          <div className="form-input">
            {/* @ts-ignore */}
            <ErrorMessage className="err" name="crm" component="div" />
            <Input
              key="crm"
              id="crm"
              title="CRM"
              type="text"
              placeholder="00000"
              data-testid="crm"
              onChange={formik.handleChange("crm")}
              onBlur={formik.handleBlur("crm")}
              value={formik.values.crm}
              autocomplete="current-crm"
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
            onClick={onSubmit}
          />
        </div>
      </FormikProvider>
    </S.Container>
  );
};

export default ObstetrasForm;

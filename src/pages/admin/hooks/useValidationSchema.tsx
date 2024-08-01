// Yup
import * as yup from 'yup';

const useValidationSchema = () => {
  const phoneValidation = yup
    .string()
    .matches(/^\(\d{2}\) \d{4}-\d{4}$/, 'Telefone inválido')
    .required('Telefone obrigatório');

  const crmValidation = yup
    .string()
    .required('CRM obrigatório');

  const emailValidation = yup
    .string()
    .test('email-validation', 'Email inválido', value => {
      if (value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      }
      return true;
    })
    .required('Email obrigatório');

  const passwordValidation = yup.string().min(6, 'password-min').required('password-required');

  const newPasswordValidation = yup
    .string()
    .oneOf([yup.ref('password')], 'password-match')
    .required('new-password-required');

  const validationSchema = yup.object().shape({
    crm: crmValidation,
    phone: phoneValidation,
    email: emailValidation,
    password: passwordValidation,
    newPassword: newPasswordValidation,
  });

  return validationSchema;
};

export default useValidationSchema;

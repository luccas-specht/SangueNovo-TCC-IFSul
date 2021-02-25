import React from "react";

import { useHistory, useLocation } from "react-router-dom";
import { FiLock } from "react-icons/fi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useRedefinePassword } from "../../../../../hooks";
import { validationMessage } from "../../../../../constants";

import { InputPassword, Button } from "../../../../components";

import { toastConfig } from "../../../../../configs";

import logo from "../../../../assets/images/logo.png";

import * as SC from "./formResetPassword.style";

interface FormPassowrdData {
  password: string;
  passwordConfirmation: string;
}

export const FormResetPassword = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { resetPassword } = useRedefinePassword();
  const messageFedback =
    "Ocorreu um erro ao resetar sua senha, tente novamente.";

  const initialValues = {
    password: "",
  } as FormPassowrdData;

  const validations = Yup.object().shape({
    password: Yup.string()
      .min(6, validationMessage.min6Char)
      .required(validationMessage.requiredPassword),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), undefined],
      validationMessage.requiredPasswordsMustMatch
    ),
  });

  const onSendPassword = async ({
    password,
  }: FormPassowrdData): Promise<void> => {
    const token = search.replace("?token=", "");

    if (!token) {
      toast.error(messageFedback, toastConfig);
      formik.resetForm();
    }

    await resetPassword(password, token);
    push("/login");
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values: FormPassowrdData) => {
      onSendPassword(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <SC.Container>
        <img src={logo} alt="logo sangue novo" />
        <SC.Form onSubmit={formik.handleSubmit}>
          <SC.Title>Redefinir senha</SC.Title>
          <InputPassword
            icon={<FiLock size={20} />}
            id="password"
            name="password"
            placeholder="Senha"
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
          />
          <InputPassword
            icon={<FiLock size={20} />}
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Confirmação de senha"
            error={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
          />
          <Button type="submit" title="Alterar Senha" />
          <SC.BackToSignIn to="login">Cancelar</SC.BackToSignIn>
        </SC.Form>
      </SC.Container>
    </>
  );
};

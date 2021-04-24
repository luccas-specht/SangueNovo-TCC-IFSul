import React, { useCallback, useState } from "react";

import { FiMail, FiArrowLeft } from "react-icons/fi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useRedefinePassword } from "../../../../hooks";
import { validationMessage } from "../../../../constants";

import { InputText, Button } from "../../../components";

import { toastConfig, toastConfigLink } from "../../../../configs";

import logo from "../../../assets/images/logo.png";

import * as SC from "./formForgotPassword.style";

interface FormPassowrdData {
  email: string;
}

export const FormForgotPassword = () => {
  const { forgotPassword } = useRedefinePassword();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues = {
    email: "",
  } as FormPassowrdData;

  const validations = Yup.object().shape({
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
  });

  const handleRedirectEtherealEmail = useCallback(
    (linkPassword: string) => (
      <a href={linkPassword}>Clique aqui para redefinir sua senha!</a>
    ),
    []
  );

  const onRecoverPassword = async ({
    email,
  }: FormPassowrdData): Promise<void> => {
    setIsLoading(true);
    const { data, status } = await forgotPassword(email);

    if (status === 200) {
      toast.success(
        handleRedirectEtherealEmail(data?.linkToResetPassword),
        toastConfigLink
      );
    } else {
      toast.error(`${data?.message}`, toastConfig);
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values: FormPassowrdData) => {
      onRecoverPassword(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <SC.Container>
        <img src={logo} alt="logo sangue novo" />
        <SC.Form onSubmit={formik.handleSubmit}>
          <SC.Title>Recuperar senha</SC.Title>
          <InputText
            icon={<FiMail size={20} />}
            id="email"
            name="email"
            placeholder="E-mail"
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            title={isLoading ? "Carregando..." : "Recuperar"}
          />
          <SC.BackToSignIn to="login">
            <div>
              <FiArrowLeft />
              Voltar para o login
            </div>
          </SC.BackToSignIn>
        </SC.Form>
      </SC.Container>
    </>
  );
};

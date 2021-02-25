import React from "react";

import { useHistory } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useRedefinePassword } from "../../../../hooks";
import { validationMessage } from "../../../../constants";

import { InputText, Button } from "../../../components";

import { toastConfig } from "../../../../configs";

import logo from "../../../assets/images/logo.png";

import * as SC from "./formForgotPassword.style";

interface FormPassowrdData {
  email: string;
}

export const FormForgotPassword = () => {
  const history = useHistory();
  const { forgotPassword } = useRedefinePassword();

  const initialValues = {
    email: "",
  } as FormPassowrdData;

  const validations = Yup.object().shape({
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
  });

  const onSendPassword = async ({ email }: FormPassowrdData): Promise<void> => {
    const response = await forgotPassword(email);
    if (response.status === 200) {
      history.push("/dashboard");
    } else {
      toast.error(`${response.data.message}`, toastConfig);
      formik.resetForm();
    }
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
          <Button type="submit" title="Recuperar" />
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

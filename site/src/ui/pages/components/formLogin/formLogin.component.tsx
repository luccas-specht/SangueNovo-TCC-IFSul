import React from "react";
import { useHistory, Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import { useAuth, useAuthenticated } from "../../../../hooks";
import { validationMessage } from "../../../../constants";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toastConfig } from "../../../../configs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../../assets/images/logo.png";

import { InputPassword, InputText, Button } from "../../../components";

import * as S from "./formLogin.style";
interface FormLoginData {
  email: string;
  password: string;
}

export const FormLogin = () => {
  const { push } = useHistory();
  const { authentication } = useAuth();
  const { authenticatedUser } = useAuthenticated();

  const initialValues = {
    email: "",
    password: "",
  } as FormLoginData;

  const validations = Yup.object().shape({
    email: Yup.string()
      .email(validationMessage.validEmail)
      .required(validationMessage.requiredEmail),
    password: Yup.string()
      .min(6, validationMessage.min6Char)
      .required(validationMessage.requiredPassword),
  });

  const onLogin = async ({ email, password }: FormLoginData): Promise<void> => {
    const { data, status } = await authentication(email, password);
    if (status === 200) {
      authenticatedUser(data);
      push("/dashboard");
    } else {
      toast.error(`${data.message}`, toastConfig);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values: FormLoginData) => {
      onLogin(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <S.Container>
        <img src={logo} alt="logo sangue novo" />
        <S.Form onSubmit={formik.handleSubmit}>
          <S.Title>Faça seu login</S.Title>
          <InputText
            icon={<FiMail size={20} />}
            id="email"
            name="email"
            placeholder="E-mail"
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
          />
          <InputPassword
            icon={<FiLock size={20} />}
            id="password"
            name="password"
            placeholder="Senha"
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
          />
          <Button type="submit" title="Entrar" />
          <Link to="esqueci-minha-senha">Esqueci a minha senha</Link>
        </S.Form>

        <S.CreateAccount to="/cadastro">
          <FiLogIn /> Criar conta
        </S.CreateAccount>
      </S.Container>
    </>
  );
};

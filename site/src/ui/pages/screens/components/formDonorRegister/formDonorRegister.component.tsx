import React from "react";

import { useHistory } from "react-router-dom";

import { FiMail, FiLock, FiUser, BiPhone } from "react-icons/all";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import { useFormik } from "formik";

import { validationMessage, masks } from "../../../../../constants";

import { useRegister } from "../../../../../hooks";

import { toastConfig } from "../../../../../configs";

import { InputText, InputPassword, Button } from "../../../../components";

import * as S from "./formDonorRegister.style";

type FormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export const FormDonorRegister = () => {
  const { registerDonator } = useRegister();
  const { push } = useHistory();
  const { phoneBrMask } = masks();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  } as FormData;

  const validations = Yup.object().shape({
    name: Yup.string()
      .min(6, validationMessage.min6Char)
      .required(validationMessage.requiredName),
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
    phone: Yup.string() /*TODO: adicionar validação de telefone*/
      .required(validationMessage.requiredPhone),
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char),
  });

  const onRegister = async ({
    name,
    phone,
    email,
    password,
  }: FormData): Promise<void> => {
    const { data, status } = await registerDonator(
      name,
      phone,
      email,
      password
    );
    if (status === 200) {
      push("/login");
    } else {
      toast.error(`${data.message}`, toastConfig);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values: FormData) => {
      onRegister(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <S.Form onSubmit={formik.handleSubmit}>
        <InputText
          icon={<FiUser size={20} />}
          id="name"
          name="name"
          placeholder="Nome"
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
        />
        <InputText
          icon={<BiPhone size={20} />}
          id="phone"
          name="phone"
          placeholder="Telefone"
          maxLength={15}
          value={phoneBrMask(formik.values.phone)}
          error={formik.touched.phone && formik.errors.phone}
          onChange={formik.handleChange}
        />
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
        <Button title="Cadastrar" />
      </S.Form>
    </>
  );
};

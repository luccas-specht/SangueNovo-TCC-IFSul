import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiUser,
  BiIdCard,
  BiPhone,
  BiCalendar,
} from "react-icons/all";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";
import { useFormik } from "formik";

import { validationMessage, masks } from "../../../../../constants";

import { useRegister } from "../../../../../hooks";

import { toastConfig } from "../../../../../configs";

import {
  InputText,
  InputPassword,
  InputDatePicker,
  Stepper,
  Button,
} from "../../../../components";

import * as S from "./formDonorRegister.style";

type FormData = {
  name: string;
  cpf: string;
  phone: string;
  birthday: any;
  email: string;
  password: string;
};

export const FormDonorRegister = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { registerDonator } = useRegister();
  const { push } = useHistory();
  const { cpfMask, phonePtBrMask } = masks();

  const initialValues = {
    name: "",
    cpf: "",
    phone: "",
    birthday: "",
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
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char),
    cpf: Yup.string() /*TODO: adicionar validação de cpf */
      .required(validationMessage.requiredCPF),
    phone: Yup.string() /*TODO: adicionar validação de telefone*/
      .required(validationMessage.requiredPhone),
    birthday: Yup.mixed() /*TODO: adicionar validação de data aniversãrio*/
      .required(validationMessage.requiredBirthDay),
  });

  const onRegister = async ({
    name,
    cpf,
    phone,
    birthday,
    email,
    password,
  }: FormData): Promise<void> => {
    const { data, status } = await registerDonator(
      name,
      cpf,
      birthday,
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

  useEffect(() => {
    setActiveStep(0);
  }, [formik.errors.name, formik.errors.email, formik.errors.password]);

  return (
    <>
      <ToastContainer />
      <S.Form onSubmit={formik.handleSubmit}>
        {activeStep === 0 ? (
          <>
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
            <Button disabled title="Entrar" />
          </>
        ) : (
          <>
            <InputDatePicker
              icon={<BiCalendar size={20} />}
              id="birthday"
              name="birthday"
              placeholder="Data de aniversário"
              value={formik.values.birthday}
              error={formik.touched.birthday && formik.errors.birthday}
              onChange={(date) => formik.setFieldValue("birthday", date)}
            />
            <InputText
              icon={<BiPhone size={20} />}
              id="phone"
              name="phone"
              placeholder="Telefone"
              maxLength={15}
              value={phonePtBrMask(formik.values.phone)}
              error={formik.touched.phone && formik.errors.phone}
              onChange={formik.handleChange}
            />
            <InputText
              icon={<BiIdCard size={20} />}
              id="cpf"
              name="cpf"
              placeholder="CPF"
              maxLength={14}
              value={cpfMask(formik.values.cpf)}
              error={formik.touched.cpf && formik.errors.cpf}
              onChange={formik.handleChange}
            />
            <Button title="Entrar" />
          </>
        )}
        <Stepper
          steps={2}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </S.Form>
    </>
  );
};

import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiUser,
  BiIdCard,
  BiPhone,
  BiMap,
} from "react-icons/all";

import { toastConfig } from "../../../../../configs";
import { validationMessage, masks } from "../../../../../constants";

import { useRegister } from "../../../../../hooks";

import {
  InputText,
  InputPassword,
  Stepper,
  Button,
} from "../../../../components";

import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as SC from "./formInstitutionRegister.style";

interface FormData {
  razaoSocial: string;
  cnpj: string;
  phone: string;
  email: string;
  password: string;
  cep: string;
}

export const FormInstitutionRegister = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { registerInstitution } = useRegister();
  const { push } = useHistory();
  const { cnpjMask, phonePtBrMask } = masks();

  const initialValues = {
    razaoSocial: "",
    cnpj: "",
    phone: "",
    email: "",
    password: "",
    cep: "",
  } as FormData;

  const validations = Yup.object().shape({
    razaoSocial: Yup.string().required(validationMessage.requiredName),
    cep: Yup.string().required(validationMessage.requiredCEP),
    cnpj: Yup.string() /*TODO: adicionar validação de cnpj*/
      .required(validationMessage.requiredCNPJ),
    phone: Yup.string() /*TODO: adicionar validação de telefone*/
      .required(validationMessage.requiredPhone),
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char),
  });

  const onRegister = async ({
    razaoSocial,
    cnpj,
    phone,
    email,
    password,
  }: FormData): Promise<void> => {
    const { data, status } = await registerInstitution(
      razaoSocial,
      cnpj,
      phone,
      email,
      password
    );
    if (status === 200) {
      push("/login");
    } else {
      toast.error(`${data?.message}`, toastConfig);
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
      <SC.Form onSubmit={formik.handleSubmit}>
        {activeStep === 0 ? (
          <>
            <InputText
              icon={<FiUser size={20} />}
              id="razaoSocial"
              name="razaoSocial"
              placeholder="Razão Social"
              value={formik.values.razaoSocial}
              error={formik.touched.razaoSocial && formik.errors.razaoSocial}
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
              icon={<BiMap size={20} />}
              id="cep"
              name="cep"
              placeholder="CEP"
              maxLength={9}
              value={formik.values.cep}
              error={formik.touched.cep && formik.errors.cep}
              onChange={formik.handleChange}
            />
            <InputText
              icon={<BiIdCard size={20} />}
              id="cnpj"
              name="cnpj"
              placeholder="CNPJ"
              maxLength={18}
              value={cnpjMask(formik.values.cnpj)}
              error={formik.touched.cnpj && formik.errors.cnpj}
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
      </SC.Form>
    </>
  );
};

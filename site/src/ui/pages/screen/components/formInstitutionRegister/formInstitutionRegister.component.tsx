import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { 
    FiMail, 
    FiLock, 
    FiUser, 
    BiIdCard, 
    BiPhone
 } from 'react-icons/all';

 import { toastConfig } from '../../../../../configs';
 import { validationMessage } from '../../../../../constants';

import { 
  InputText, 
  InputPassword, 
  Stepper,
  Button
} from '../../../../components';

import { useRegister } from '../../../../../hooks';

import * as Yup from 'yup'
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formInstitutionRegister.style';

interface FormData {
    razaoSocial: string;
    cnpj: string;
    phone: string;
    email: string;
    password: string;
}

export const FormInstitutionRegister = () => {
  const [renderedStep, setRenderedStep] = useState<number>(0);
  const { registerInstitution } = useRegister();
  const { push } = useHistory();

  const initialValues = {
     razaoSocial: '',
     cnpj: '',
     phone: '',
     email: '',
     password: ''
   } as FormData;

   const validations = Yup.object().shape({
    razaoSocial: Yup.string()
     .required(validationMessage.requiredName),
    cnpj: Yup.string() /*TODO: adicionar validação de cnpj*/ 
     .required(validationMessage.requiredCPF),
    phone: Yup.string() /*TODO: adicionar validação de telefone*/ 
     .required(validationMessage.requiredCPF),
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char)
  });

   const onRegister = async ({ 
     razaoSocial,
     cnpj, 
     phone,
     email, 
     password
    }: FormData): Promise<void> => {
     const response = await registerInstitution(razaoSocial, cnpj, phone, email, password);
    
     if(response?.status === 200){
       push('/login');
     } else {
      formik.resetForm();
      toast.error(`${response.data?.message}`, toastConfig);
     }
   };

   const formik = useFormik({
     initialValues: initialValues,
     validationSchema: validations,
     onSubmit: (values: FormData) => {
      onRegister(values)
     }
   });

  
  return(
    <>
    <ToastContainer />
    <SC.Form 
      // animantion={renderedStep % 2 === 0}
      onSubmit={formik.handleSubmit}
    > 
    {renderedStep === 0 ? (
    <>
      <InputText
      icon={<FiUser size={20}/>}
      id="razaoSocial"
      name="razaoSocial"
      placeholder='Razão Social'
      value={formik.values.razaoSocial}
      error={formik.errors.razaoSocial}
      onChange={formik.handleChange}
    />      
    <InputText
      icon={<FiMail size={20}/>}
      id="email"
      name="email"
      placeholder='E-mail'
      value={formik.values.email}
      error={formik.errors.email}
      onChange={formik.handleChange}
    />    
    <InputPassword
      icon={<FiLock size={20}/>}
      id="password"
      name="password"
      placeholder='Senha'
      value={formik.values.password}
      error={formik.errors.password}
      onChange={formik.handleChange}
    />
    <Button disabled title='Entrar' />
    </>
    ): (
      <>
        <InputText
          icon={<BiPhone size={20}/>}
          id="phone"
          name="phone"
          placeholder='Telefone'
          value={formik.values.phone}
          error={formik.errors.phone}
          onChange={formik.handleChange}
        />      
       <InputText
         icon={<BiIdCard size={20}/>}
         id="cnpj"
         name="cnpj"
         placeholder='CNPJ'
         value={formik.values.cnpj}
         error={formik.errors.cnpj}
         onChange={formik.handleChange}
       /> 
       <Button title='Entrar' />
      </>
    )}
      <Stepper 
        steps={2} 
        onRender={(index: number) => setRenderedStep(index)}
      />
    </SC.Form>
  </>
  );
};
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { 
    FiArrowLeft,  
    FiMail, 
    FiLock, 
    FiUser, 
    BiIdCard, 
    BiCalendar
 } from 'react-icons/all';

 import * as Yup from 'yup'
 import { useFormik } from "formik";

import { validationMessage } from '../../../../../constants';

import { 
  InputText, 
  InputPassword, 
  Steps,
  Button
} from '../../../../components';

import { useRegister } from '../../../../../hooks';

import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formDonorRegister.style';

interface FormData {
    name: string;
    cpf: string;
    phone: string;
    birthday: any;
    email: string;
    password: string;
}

export const FormDonorRegister = () => {
  const [renderedStep, setRenderedStep] = useState<number>(1);
  const { registerDonator } = useRegister();
  const { push } = useHistory();

  const initialValues = {
     name: '',
     cpf: '',
     phone: '',
     birthday: '',
     email: '',
     password: '',
   } as FormData;

   const validations = Yup.object().shape({
    name: Yup.string()
     .required(validationMessage.requiredName),
    email: Yup.string()
     .required(validationMessage.requiredEmail)
     .email(validationMessage.validEmail),
    password: Yup.string()
     .required(validationMessage.requiredPassword)
     .min(6, validationMessage.min6Char),
    cpf: Yup.string() /*TODO: adicionar validação de cpf e cnpj*/ 
     .required(validationMessage.requiredCPF),
    phone: Yup.string() /*TODO: adicionar validação de cpf telefone*/ 
     .required(validationMessage.requiredCPF),
    birthday: Yup.string() /*TODO: adicionar validação de data aniversãrio*/ 
     .required(validationMessage.requiredBirthDay)
  });

   const onRegister = async ({ 
     name, 
     cpf, 
     phone,
     birthday, 
     email, 
     password
    }: FormData): Promise<void> => {
     const response = await registerDonator(name, cpf, birthday, email, password)
    
     if(response?.status === 200){
       push('/sign-in');
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

   console.log('renderedStep', renderedStep)
  return (
    <>
      <ToastContainer />
      <SC.Form onSubmit={formik.handleSubmit}> 
      {renderedStep === 1 ? (
      <>
        <InputText
        icon={<FiUser size={20}/>}
        id="name"
        name="name"
        placeholder='Nome'
        value={formik.values.name}
        error={formik.errors.name}
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
        error={formik.errors.password}
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button disabled title='Entrar' />
      </>
      ): null}
        
        <Steps 
          steps={2} 
          onRender={(index) => setRenderedStep(index)}
        />
      </SC.Form>
    </>
  );
};
import React from 'react';

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

import { InputText, InputPassword, Button } from '../../../../components';

import { useRegister } from '../../../../../hooks';


import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formInstitutionRegister.style';

interface FormData {
    name: string;
    cpf: string;
    phone: string;
    birthday: any;
    email: string;
    password: string;
}

export const FormInstitutionRegister = () => {
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
    cpf: Yup.string() /*TODO: adicionar validação de cpf e cnpj*/ 
     .required(validationMessage.requiredCPF),
    phone: Yup.string() /*TODO: adicionar validação de cpf telefone*/ 
     .required(validationMessage.requiredCPF),
    birthday: Yup.string() /*TODO: adicionar validação de data aniversãrio*/ 
     .required(validationMessage.requiredBirthDay),
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char)
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

  
  return(
    <>
        <ToastContainer />
        <h1>FORME AQUI instituição</h1>
        {/* <SC.Form onSubmit={formik.handleSubmit}>   
          <SC.BackToSingIn to='sign-in'>
            <FiArrowLeft />
            Voltar para o login
         </SC.BackToSingIn>
        </SC.Form> */}
    </>
  );
};
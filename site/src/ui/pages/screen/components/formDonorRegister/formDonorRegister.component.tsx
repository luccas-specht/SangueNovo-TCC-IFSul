import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { 
    FiMail, 
    FiLock, 
    FiUser, 
    BiIdCard,
    BiPhone 
} from 'react-icons/all';

 import * as Yup from 'yup'
 import { useFormik } from "formik";

import { validationMessage } from '../../../../../constants';

import { 
  InputText, 
  InputPassword, 
  Stepper,
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
    birthday: Date | null;
    email: string;
    password: string;
}

export const FormDonorRegister = () => {
  const [renderedStep, setRenderedStep] = useState<number>(0);
  const { registerDonator } = useRegister();
  const { push } = useHistory();

  const initialValues = {
     name: '',
     cpf: '',
     phone: '',
     birthday: new Date("2014-08-18T21:11:54"),
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
     const response = await registerDonator(name, cpf, phone, birthday, email, password);
    
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

  return (
    <>
      <ToastContainer />
      <SC.Form 
        onSubmit={formik.handleSubmit}
      > 
      {renderedStep === 0 ? (
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
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
          />
          <Button disabled title='Entrar' />
        </>
        ) : (
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
           id="cpf"
           name="cpf"
           placeholder='CPF'
           value={formik.values.cpf}
           error={formik.errors.cpf}
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
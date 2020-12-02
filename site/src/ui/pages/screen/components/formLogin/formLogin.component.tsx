import React from 'react';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../../hooks'
import { validationMessage } from '../../../../../constants';

import * as Yup from 'yup'
import { useFormik } from "formik";

import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formLogin.style';
interface FormLoginData {
    email: string;
    password: string;
}

const FormLogin = () => {
  const history = useHistory();
  const { authentication } = useAuth();

  const initialValues = {
     email: '',
     password: ''
   } as FormLoginData

   const validations = Yup.object().shape({
     email: Yup.string()
       .required(validationMessage.requiredEmail)
       .email(validationMessage.validEmail),
     password: Yup.string()
       .required(validationMessage.requiredPassword)
       .min(6, validationMessage.min6Char)
   });

   const onLogin = async ({ email, password }: FormLoginData): Promise<void> => {
     const response = await authentication(email, password);
     if(response.status === 401){
       toast.error(`${response.data.message}`, toastConfig);
       formik.resetForm();
     }else{
      toast.success(`Login realizado com sucesso`, toastConfig);
      history.push('/dashboard');
     }
   }

   const formik = useFormik({
     initialValues: initialValues,
     validationSchema: validations,
     onSubmit: (values: FormLoginData) => {
       onLogin(values)
     }
   });

  return(
      <>
        <ToastContainer />
          <SC.Form onSubmit={formik.handleSubmit}>

          </SC.Form>
      </>
  );

};

export { FormLogin };
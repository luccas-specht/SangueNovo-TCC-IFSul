import React from "react";

import { useRedefinePassword } from '../../../../../hooks';

import { validationMessage } from '../../../../../constants'

import { useFormik } from "formik";
import * as Yup from 'yup';

import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formForgotPassword.style';
interface FormForgotPasswordData {
  email: string;
}

const FormForgotPassword = () => {
  const { resetPassword } = useRedefinePassword();

  const initialValues = {
    email: ''
  } as FormForgotPasswordData
  
  const validations = Yup.object().shape({
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail)
  });

  const recoverPassword = async ({ email }: FormForgotPasswordData): Promise<void> => {
    const response = await resetPassword(email);
    if(response.status === 400){
      toast.error(`${response.data.message}`, toastConfig);
      formik.resetForm();
    }else{
     toast.success(`deu bom cpx`, toastConfig);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (data: FormForgotPasswordData) => {
      recoverPassword(data)
    }
  });
 
  return (
    <>
     <ToastContainer />
      <SC.Form onSubmit={formik.handleSubmit}>
       
      </SC.Form>
    </>
  );
};

export { FormForgotPassword };
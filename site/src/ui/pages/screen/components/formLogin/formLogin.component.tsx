import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../../../../hooks'
import { validationMessage } from '../../../../../constants';

import { InputPassword, InputText, Button } from '../../../../components';

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

export const FormLogin = () => {
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
     console.log('res', response)
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
       <SC.Title>Faça seu logon</SC.Title>
          <InputText
            icon={<FiMail size={20} />}
            id="email"
            name="email"
            placeholder='E-mail'
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
          />    
           <InputPassword
             icon={<FiLock size={20} />}
             id="password"
             name="password"
             placeholder='Senha'
             error={formik.errors.password}
             value={formik.values.password}
             onChange={formik.handleChange}
          />

        <Button type='submit' title='Entrar' />
        <Link to='forgot-password'>Esqueci a minha senha</Link>
      </SC.Form>

      <SC.CreateAccount to='sign-up'>
          <FiLogIn />
          Criar conta
      </SC.CreateAccount>
    </>
  );
};
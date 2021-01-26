import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { BiIdCard, BiCalendar } from 'react-icons/bi';

import { validationMessage } from '../../../../../constants';

import { InputText, InputPassword, Button } from '../../../../components';
import { DonorSpecificInput } from '../donorSpecificInput/donorSpecificInput.component';

import { useRegister } from '../../../../../hooks';

import * as Yup from 'yup'
import { useFormik } from "formik";

import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formRegister.style';

interface FormRegisterProps {
  isDonator: boolean
}

interface FormRegisterData {
    name_razaoSocial: string;
    cpf_cnpf: string;
    birthday?: any;
    email: string;
    password: string;
}

export const FormRegister = ({ isDonator }: FormRegisterProps) => {
  const { registerDonator, registerInstitution } = useRegister();
  const { push } = useHistory();

  const initialValuesInstitution = {
     name_razaoSocial: '',
     cpf_cnpf: '',
     email: '',
     password: '',
   } as FormRegisterData

   const initialValuesDonator = {
    name_razaoSocial: '',
    cpf_cnpf: '',
    email: '',
    password: '',
    birthday: null,
  } as FormRegisterData

   const validationsInstitution = Yup.object().shape({
     name_razaoSocial: Yup.string()
      .required(validationMessage.requiredRazaoSocial),
     cpf_cnpf: Yup.string() /*TODO: adicionar validação de cpf e cnpj*/ 
      .required(validationMessage.requiredCNPJ),
     email: Yup.string()
       .required(validationMessage.requiredEmail)
       .email(validationMessage.validEmail),
     password: Yup.string()
       .required(validationMessage.requiredPassword)
       .min(6, validationMessage.min6Char)
   });

   const validationsDonator = Yup.object().shape({
    name_razaoSocial: Yup.string()
     .required(validationMessage.requiredName),
    cpf_cnpf: Yup.string() /*TODO: adicionar validação de cpf e cnpj*/ 
     .required(validationMessage.requiredCPF),
    birthday: Yup.string() /*TODO: adicionar validação data*/ 
     .required(validationMessage.requiredBirthDay),
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char)
  });

   const onRegister = async ({ 
     name_razaoSocial, 
     cpf_cnpf, 
     birthday, 
     email, 
     password
    }: FormRegisterData): Promise<void> => {
    let response

    if(isDonator) {
      response = await registerDonator(name_razaoSocial, cpf_cnpf, birthday, email, password)
     } else {
      response = await registerInstitution(name_razaoSocial, cpf_cnpf, email, password);
    } 

    console.log('response', response)
     if(response?.status === 200){
       push('/sign-in');
     }else{
      formik.resetForm();
      toast.error(`${response.data?.message}`, toastConfig);
     }
   };

   const formik = useFormik({
     initialValues: isDonator ? initialValuesDonator : initialValuesInstitution,
     validationSchema: isDonator ? validationsDonator : validationsInstitution,
     onSubmit: (values: FormRegisterData) => {
      onRegister(values)
     }
   });

   useEffect(() => {
    formik.resetForm();
  }, [isDonator]);
  
  return(
    <>
    <ToastContainer />
       <SC.Form onSubmit={formik.handleSubmit}>   
          { isDonator ? 
          (<>
               <InputText
                icon={<FiUser size={20} />}
                id="name_razaoSocial"
                name="name_razaoSocial"
                placeholder='Nome'
                value={formik.values.name_razaoSocial}
                error={formik.errors.name_razaoSocial}
                onChange={formik.handleChange}
               />  
              <SC.ContextInputs>
                <DonorSpecificInput
                  icon={<BiCalendar size={20} />}
                  id="birthday"
                  name="birthday"
                  type='text'
                  placeholder='Data de nascimento'
                  value={formik.values.birthday}
                  error={formik.errors.birthday}
                  onChange={formik.handleChange}
                /> 
              <DonorSpecificInput
                icon={<BiIdCard size={22} />}
                id="cpf_cnpf"
                name="cpf_cnpf"
                type='text'
                placeholder='CPF'
                value={formik.values.cpf_cnpf}
                error={formik.errors.cpf_cnpf}
                onChange={formik.handleChange}
              /> 
            </SC.ContextInputs>
           </>)
          : 
          (<>
          <InputText
            icon={<FiUser size={20} />}
            id="name_razaoSocial"
            name="name_razaoSocial"
            placeholder='Razão social'
            value={formik.values.name_razaoSocial}
            error={formik.errors.name_razaoSocial}
            onChange={formik.handleChange}
            />  
          <InputText
            icon={<BiIdCard size={22} />}
            id="cpf_cnpf"
            name="cpf_cnpf"
            placeholder='CNPJ'
            value={formik.values.cpf_cnpf}
            error={formik.errors.cpf_cnpf}
            onChange={formik.handleChange}  
         /> 
         </>)
        }
        
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
      <Button
       type='submit'
       title='Cadastrar'
      />
     <SC.BackToSingIn to='sign-in'>
        <FiArrowLeft />
        Voltar para o login
     </SC.BackToSingIn>
  </SC.Form>
  </>
  );
};
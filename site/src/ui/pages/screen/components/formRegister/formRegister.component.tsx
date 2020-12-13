import React from 'react';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { BiIdCard, BiCalendar } from 'react-icons/bi';

import { useHistory } from 'react-router-dom';

import { useRegister } from '../../../../../hooks'
import { validationMessage } from '../../../../../constants';

import { InputText, InputPassword, Button } from '../../../../components';

import * as Yup from 'yup'
import { useFormik } from "formik";

import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formRegister.style';

interface FormRegisterProps {
  donator: boolean
}

interface FormRegisterData {
    name_razaoSocial: string;
    cpf_cnpf: string;
    birthday?: any;
    email: string;
    password: string;
}

const FormRegister = ({ donator }: FormRegisterProps) => {
  const history = useHistory();
  const { register } = useRegister();

  const initialValuesInstitution = {
     name_razaoSocial: '',
     cpf_cnpf: '',
     email: '',
     password: '',
   } as FormRegisterData

   const initialValuesDonator = {
    name_razaoSocial: '',
    cpf_cnpf: '',
    birthday: null,
    email: '',
    password: '',
  } as FormRegisterData

   const validationsInstitution= Yup.object().shape({
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

   const validationsDonator= Yup.object().shape({
    name_razaoSocial: Yup.string()
     .required(validationMessage.requiredName),
    cpf_cnpf: Yup.string() /*TODO: adicionar validação de cpf e cnpj*/ 
     .required(validationMessage.requiredCPF),
    birthday: Yup.string()
     .required(validationMessage.requiredBirthDay),
    email: Yup.string()
      .required(validationMessage.requiredEmail)
      .email(validationMessage.validEmail),
    password: Yup.string()
      .required(validationMessage.requiredPassword)
      .min(6, validationMessage.min6Char)
  });

  //  const onRegister = async ({ nameazaoSocial, cpfCnpf, email, password }: FormRegisterData): Promise<void> => {
  //    const response = await register(nameRazaoSocial, cpfCnpf, email, password);
  //    if(response.status === 400){
  //      toast.error(`${response.data.message}`, toastConfig);
  //      formik.resetForm();
  //    }else{
  //      toast.success('Cadastro realizado com sucesso', toastConfig);
  //      history.push('/dashboard');
  //    }
  //  }


   const formik = useFormik({
     initialValues: donator ? initialValuesDonator : initialValuesInstitution,
     validationSchema: donator ? validationsDonator : validationsInstitution,
     onSubmit: (values: FormRegisterData) => {
      // onRegister(values)
     }
   });

   console.log('form error', formik.errors )
  //  const [donation, setDonation] = useState<boolean>();
  // const [institution, setInstitution] = useState<boolean>();

  // const handleActive = useCallback((who: 'donation' | 'institution' ) => {
  //   if(who === 'donation'){
  //     setInstitution(false);
  //     setDonation(true);
  //   }else{
  //     setDonation(false);
  //     setDonation(true);
  //   }
  // },[donation, institution]);

  // return(
  //   <ul>
  //     <li onClick={()=> handleActive('donation')}>
  //       Sou Doador
  //     </li>
  //     <li onClick={()=> handleActive('institution')}>
  //      Sou Instituição
  //     </li>
  //   </ul>

  return(
    <>
    <ToastContainer />
     <SC.Form onSubmit={formik.handleSubmit}>
      <SC.Title>Faça seu Login</SC.Title>
      <InputText
        icon={<FiUser size={20} />}
        id="name"
        name="name"
        placeholder='Nome'
        value={formik.values.name_razaoSocial}
        error={formik.errors.name_razaoSocial}
        onChange={formik.handleChange}
        />  
        { donator ?
          <>
            <InputText
            icon={<BiIdCard size={22} />}
            id="cpf_cnpf"
            name="cpf_cnpf"
            placeholder='CPF'
            value={formik.values.cpf_cnpf}
            error={formik.errors.cpf_cnpf}
            onChange={formik.handleChange}
          />  
          <InputText
            icon={<BiCalendar size={20} />}
            id="birthday"
            name="birthday"
            placeholder='Data de nascimento'
            value={formik.values.name_razaoSocial}
            error={formik.errors.name_razaoSocial}
            onChange={formik.handleChange}
          /> 
        </>
        :
        <InputText
          icon={<BiIdCard size={22} />}
          id="cpf_cnpf"
          name="cpf_cnpf"
          placeholder='CNPj'
          value={formik.values.cpf_cnpf}
          error={formik.errors.cpf_cnpf}
          onChange={formik.handleChange}
        />  
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
       <Button type='submit' title='Entrar' />
       <SC.BackToSingIn to='sign-in'>
         <FiArrowLeft />
         Voltar para o login
       </SC.BackToSingIn>
     </SC.Form>
   </>
  );

};

export { FormRegister };
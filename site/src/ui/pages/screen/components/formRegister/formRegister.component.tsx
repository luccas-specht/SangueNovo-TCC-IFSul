import React from 'react';

import { useHistory } from 'react-router-dom';

import { useRegister } from '../../../../../hooks'
import { validationMessage } from '../../../../../constants';

import * as Yup from 'yup'
import { useFormik } from "formik";

import { toastConfig } from '../../../../../configs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as SC from './formRegister.style';
interface FormRegisterData {
    nameRazaoSocial: string;
    cpfCnpf: string;
    email: string;
    password: string;
}

const FormRegister = () => {
  const history = useHistory();
  const { register } = useRegister();

  const initialValues = {
     nameRazaoSocial: '',
     cpfCnpf: '',
     email: '',
     password: ''
   } as FormRegisterData

   const validations = Yup.object().shape({
     nameRazaoSocial: Yup.string()
      .required(validationMessage.requiredName),
     cpfCnpf: Yup.string() /*TODO: adicionar validação de cpf e cnpj*/ 
      .required(validationMessage.requiredName),
     email: Yup.string()
       .required(validationMessage.requiredEmail)
       .email(validationMessage.validEmail),
     password: Yup.string()
       .required(validationMessage.requiredPassword)
       .min(6, validationMessage.min6Char)
   });

   const onRegister = async ({ nameRazaoSocial, cpfCnpf, email, password }: FormRegisterData): Promise<void> => {
     const response = await register(nameRazaoSocial, cpfCnpf, email, password);
     if(response.status === 400){
       toast.error(`${response.data.message}`, toastConfig);
       formik.resetForm();
     }else{
       toast.success('Cadastro realizado com sucesso', toastConfig);
       history.push('/dashboard');
     }
   }

   const formik = useFormik({
     initialValues: initialValues,
     validationSchema: validations,
     onSubmit: (values: FormRegisterData) => {
      onRegister(values)
     }
   });

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

          </SC.Form>
      </>
  );

};

export { FormRegister };
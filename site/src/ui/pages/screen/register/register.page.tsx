import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';

import { FabTheme } from '../../../components';
import { FormDonorRegister, FormInstitutionRegister } from '../components';

import logo from '../../../assets/images/logo.png';

import * as SC from './register.style';

export const Register = () => {
  const [tabActive, setTabActive] = useState<boolean>(true);

  return (
      <SC.Container>
        <FabTheme/>
        <SC.Context>
        <SC.AnimationContext>
          <SC.FormContainer>
            <img src={logo} alt="logo sangue novo"/>
            <SC.Title> Faça sua conta </SC.Title>
            <SC.Ul active={tabActive}>
              <li onClick={()=> setTabActive(true)}>
                Sou Doador
              </li>
              <li onClick={()=> setTabActive(false)}>
                Sou Instituição
              </li>
            </SC.Ul>
            {tabActive ? <FormDonorRegister/>
             : <FormInstitutionRegister/>}
            <SC.BackToSignIn to='sign-in'>
               <FiArrowLeft />
               Voltar para o login
             </SC.BackToSignIn>
          </SC.FormContainer>
        </SC.AnimationContext>
        </SC.Context> 
      </SC.Container>
    );
};
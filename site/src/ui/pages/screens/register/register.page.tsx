import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../../assets/images/logo.png';
import { FabTheme } from '../../../components';

import { FormDonorRegister, FormInstitutionRegister } from '../../components';

import * as S from './register.style';

export const Register = () => {
  const [tabActive, setTabActive] = useState<boolean>(true);
  
  return (
      <S.Container>
        <FabTheme/>
        <S.Context>
        <S.AnimationContext>
          <S.FormContainer>
            <img src={logo} alt="logo sangue novo"/>
            <S.Title> Faça sua conta </S.Title>
            <S.Ul active={tabActive}>
              <li onClick={() => setTabActive(true)}>
                Sou Doador
              </li>
              <li onClick={() => setTabActive(false)}>
                Sou Instituição
              </li>
            </S.Ul>
            {tabActive ? <FormDonorRegister/>
             : <FormInstitutionRegister/>}
            <S.BackToSignIn to='login'>
               <FiArrowLeft />
               Voltar para o login
             </S.BackToSignIn>
          </S.FormContainer>
        </S.AnimationContext>
        </S.Context> 
      </S.Container>
    );
};
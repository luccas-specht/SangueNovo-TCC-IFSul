import React, { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";

import clouds from "../../../assets/images/clouds.png";
import typeBlood from "../../../assets/images/type_blood.png";
import superHeroMan from "../../../assets/images/super_hero_man.png";
import logo from "../../../assets/images/logo.png";

import { FabTheme } from "../../../components";

import { FormDonorRegister, FormInstitutionRegister } from "../components";

import * as S from "./register.style";

export const Register = () => {
  const [tabActive, setTabActive] = useState<boolean>(true);

  return (
    <S.Container>
      <FabTheme />
      <S.WrapperImg>
        <img src={clouds} alt="nuvens" />
        <img src={typeBlood} alt="tipos de sangue" />
      </S.WrapperImg>
      <S.Context>
        <S.AnimationContext>
          <S.FormContainer>
            <img src={logo} alt="logo sangue novo" />
            <S.Title> Faça sua conta </S.Title>
            <S.Ul active={tabActive}>
              <li onClick={() => setTabActive(true)}>Sou Doador</li>
              <li onClick={() => setTabActive(false)}>Sou Instituição</li>
            </S.Ul>
            <S.AnimantionForm active={tabActive}>
              {tabActive ? <FormDonorRegister /> : <FormInstitutionRegister />}
            </S.AnimantionForm>
            <S.BackToSignIn to="login">
              <FiArrowLeft />
              Voltar para o login
            </S.BackToSignIn>
          </S.FormContainer>
          <S.RigthImg src={superHeroMan} alt="super herói" />
        </S.AnimationContext>
      </S.Context>
    </S.Container>
  );
};

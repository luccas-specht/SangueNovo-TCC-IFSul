import React, { useCallback } from "react";

import { useHistory } from "react-router-dom";

import { useAuthenticated } from "../../../hooks";

import logoImg from "../../assets/images/logo.png";
import imageDefaultProfile from "../../assets/images/avatar_user_default.png";

import * as S from "./header.style";

export const Header = () => {
  const { push } = useHistory();
  const { user, signOut } = useAuthenticated();

  console.log("user:", user);

  const handleSignOut = useCallback(() => {
    signOut();
    push("/login");
  }, [signOut, push]);

  return (
    <S.Container>
      <S.LogoImg src={logoImg} alt="logo sangue novo" />
      <S.Profile>
        <img
          src={user?.user?.avatar ?? imageDefaultProfile}
          alt="imagem de perfil"
        />
        <div>
          <S.WellcomeUser>Bem Vindo,</S.WellcomeUser>
          <S.UserName>{user?.user?.userName}</S.UserName>
        </div>
      </S.Profile>
      <S.NavBar>
        <li>Painel Adminstrativo</li>
        <li>Campanhas</li>
        <li>Criar Campanhas</li>
      </S.NavBar>
      <S.Actions>
        <S.StyledFiPower onClick={handleSignOut} />
        <S.StyledFabTheme />
      </S.Actions>
    </S.Container>
  );
};

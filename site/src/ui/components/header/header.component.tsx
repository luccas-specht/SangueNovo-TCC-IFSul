import React, { useCallback } from "react";

import {
  GoTasklist,
  MdCreate,
  BsCalendarFill,
  CgReadme,
} from "react-icons/all";

import { useHistory } from "react-router-dom";

import { useAuthenticated } from "../../../hooks";

import logoImg from "../../assets/images/logo.png";
import imageDefaultProfile from "../../assets/images/avatar_user_default.png";

import { FabTheme } from "..";

import * as S from "./header.style";

export const Header = () => {
  const { push } = useHistory();
  const { user, signOut } = useAuthenticated();

  const handleSignOut = useCallback(() => {
    signOut();
    push("/login");
  }, [signOut, push]);

  const navegations = [
    {
      title: "Listar Campanhas de doação",
      icon: <GoTasklist size={20} />,
      to: "",
    },
    {
      title: "Criar Campanha de doação",
      icon: <MdCreate size={20} />,
      to: "",
    },
    {
      title: "Minhas Campanhas",
      icon: <CgReadme size={20} />,
      to: "",
    },
    {
      title: "Meus Agendamentos",
      icon: <BsCalendarFill size={20} />,
      to: "",
    },
  ];

  return (
    <S.Container>
      <S.LogoImg src={logoImg} alt="logo sangue novo" />
      <S.Profile>
        <img
          src={user?.user?.avatar ?? imageDefaultProfile}
          alt="imagem de perfil"
        />
        <div>
          <S.WellcomeUser>Bem vindo,</S.WellcomeUser>
          <S.UserName>{user?.user?.userName}</S.UserName>
        </div>
      </S.Profile>
      <S.NavBar>
        {navegations.map(({ title, icon, to }) => (
          <S.StyledLink to={to}>
            {icon}
            <li>{title}</li>
          </S.StyledLink>
        ))}
      </S.NavBar>
      <S.Actions>
        <S.StyledFiPower onClick={handleSignOut} />
        <FabTheme />
      </S.Actions>
    </S.Container>
  );
};

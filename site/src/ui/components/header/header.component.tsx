import React, { useCallback } from "react";

import { BsCardChecklist, BiNews, BiBookReader } from "react-icons/all";

import { useHistory } from "react-router-dom";

import { useAuthenticated } from "../../../hooks";

import logoImg from "../../assets/images/logo.png";
import imageDefaultProfile from "../../assets/images/default_user_image.png";

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
      title: "Painel Adminstrativo",
      icon: <BiBookReader size={20} color="green" />,
      to: "painel-adminstrativo",
    },
    {
      title: "Listar Campanhas de Doação",
      icon: <BsCardChecklist size={20} color="green" />,
      to: "listar-campanhas",
    },
    {
      title: "Criar Campanha",
      icon: <BiNews size={20} color="green" />,
      to: "criar-campanha",
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
            <div>{icon} </div>
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

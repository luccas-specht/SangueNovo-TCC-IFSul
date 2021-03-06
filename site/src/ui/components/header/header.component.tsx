import React, { useCallback, useState } from "react";

import { BsCardChecklist, BiNews, BiBookReader } from "react-icons/all";

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { useAuthenticated } from "../../../hooks";

import logoImg from "../../assets/images/logo.png";
import imageDefaultProfile from "../../assets/images/default_user_image.png";

import { FabTheme } from "..";

import * as S from "./header.style";

export const Header = () => {
  const { push } = useHistory();
  const { user, signOut } = useAuthenticated();
  const [open, setOpen] = useState<boolean>(false);

  const handleSignOut = useCallback(() => {
    signOut();
    push("/login");
  }, [signOut, push]);

  const navegations = [
    {
      // icon: <BiBookReader size={20} />,
      to: "painel-adminstrativo",
      title: "Painel Adminstrativo",
    },
    {
      // icon: <BsCardChecklist size={20} />,
      to: "listar-campanhas",
      title: "Listar Campanhas de Doação",
    },
    {
      // icon: <BiNews size={20} />,
      to: "criar-campanha",
      title: "Criar Campanha",
    },
  ];

  const renderDivs = useCallback(
    (number: number) => [...Array(number)].map(() => <div />),
    []
  );

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
      <div>
        <S.Burguer open={open} onClick={() => setOpen(!open ?? true)}>
          {renderDivs(3)}
        </S.Burguer>
        <S.Ul open={open}>
          {navegations.map(({ title, to }) => (
            <li>
              <Link to={to}> {title}</Link>
            </li>
          ))}
        </S.Ul>
      </div>
    </S.Container>
  );
};

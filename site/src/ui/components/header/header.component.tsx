import { useCallback, useState, useMemo, useLayoutEffect } from "react";

import {
  BsCardChecklist,
  BiNews,
  BiBookReader,
  FiPower,
  RiCalendarEventLine,
  BiDonateBlood,
} from "react-icons/all";

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { useAuthenticated } from "../../../hooks";

import logoImg from "../../assets/images/logo.png";
import imageDefaultProfile from "../../assets/images/default_user_image.png";

import * as S from "./header.style";

type Navegation = {
  icon: JSX.Element;
  to: string;
  title?: string;
  order: number;
};

export const Header = () => {
  const [isOpenBurguerMenu, setIsOpenBurguerMenu] = useState<boolean>(false);
  const { push } = useHistory();
  const { user, signOut } = useAuthenticated();

  const handleOpenBurgermenu = useCallback(
    () => setIsOpenBurguerMenu(!isOpenBurguerMenu ?? true),
    [isOpenBurguerMenu]
  );

  const handleSignOut = useCallback(() => {
    signOut();
    push("/login");
  }, [signOut, push]);

  const renderDivs = useCallback(
    (number: number) => [...Array(number)].map(() => <div />),
    []
  );

  const navegations = useMemo(
    (): Navegation[] => [
      {
        order: 1,
        icon: <BiBookReader size={20} />,
        to: "minhas-campanhas",
        title: "Minhas Campanhas",
      },
      {
        order: 2,
        icon: <RiCalendarEventLine size={20} />,
        to: "meus-agendamentos",
        title: "Meus Agendamentos",
      },
      {
        order: 3,
        icon: <BsCardChecklist size={20} />,
        to: "listar-campanhas",
        title: "Listar Campanhas de Doação",
      },
      {
        order: 4,
        icon: <BiNews size={20} />,
        to: "criar-campanha",
        title: "Criar Campanha",
      },
      {
        order: 5,
        icon: <FiPower size={20} onClick={handleSignOut} />,
        to: "/login",
      },
    ],
    [handleSignOut]
  );

  useLayoutEffect(() => {
    if (!!user?.user?.isDonator) {
      console.log("user", !!user?.user?.isDonator);
      navegations.push({
        order: 0,
        icon: <BiDonateBlood size={20} />,
        to: "minhas-doações",
        title: "Minhas Doações",
      });
    }
  }, [user?.user?.isDonator, navegations]);

  const sortArray = useCallback(
    (): Navegation[] =>
      navegations.sort((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      }),
    [navegations]
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
      <S.Burguer open={isOpenBurguerMenu} onClick={handleOpenBurgermenu}>
        {renderDivs(3)}
      </S.Burguer>
      <S.Ul open={isOpenBurguerMenu}>
        {sortArray().map(({ icon, title, to }) => (
          <li>
            <Link to={to}>
              {icon}
              {title}
            </Link>
          </li>
        ))}
        {/* <FabTheme /> */}
      </S.Ul>
    </S.Container>
  );
};

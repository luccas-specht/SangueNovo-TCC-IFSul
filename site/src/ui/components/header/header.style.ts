import styled from "styled-components";

import { FiPower } from "react-icons/fi";

import { Link } from "react-router-dom";

type PropsImg = {
  src: string;
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.colorHeader};
  align-items: center;
  padding: 0px 100px;
`;

export const LogoImg = styled.img<PropsImg>`
  max-width: 100px;
  max-height: 100px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  opacity: 1;
  visibility: visible;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 245px;
  height: 100%;
  margin-left: 100px;

  font-style: normal;
  font-size: 16px;
  line-height: 20px;

  img {
    max-width: 54px;
    max-height: 54px;
    border-radius: 50%;
    background-size: cover;
    opacity: 1;
    visibility: visible;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 16px;
  }
`;

export const WellcomeUser = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.titleColor};
`;

export const UserName = styled.strong`
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.primary2};
`;

export const NavBar = styled.ul`
  display: flex;
  align-self: center;
  flex: 1;
  max-height: 45%;
  justify-content: space-evenly;
  align-items: flex-end;
  margin-top: 15px;

  li {
    padding-left: 15px;
    font-style: normal;
    font-size: 14px;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  svg {
    color: green;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100%;
`;

export const StyledFiPower = styled(FiPower)`
  width: 20px;
  height: 20px;
  background-size: cover;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

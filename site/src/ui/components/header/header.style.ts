import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

import { device } from "../../../constants";

import { FaMoon, FaSun } from "react-icons/all";

type PropsImg = {
  src: string;
};

type BurbuerProps = {
  open: boolean;
  isDonator?: boolean;
};

export const Container = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.colorHeader};
  align-items: center;
  padding: 0px 100px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
  transition: 1s;

  @media ${device.mobileL()} {
    padding: 0;
  }
`;

export const LogoImg = styled.img<PropsImg>`
  max-width: 110px;
  background-size: cover;

  @media ${device.mobileL()} {
    margin-left: 10px;
    max-width: 65px;
    background-size: cover;
  }
`;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;
  max-width: 245px;
  height: 100%;
  margin-left: 3%;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  visibility: visible;

  img {
    max-width: 54px;
    max-height: 54px;
    border-radius: 50%;
    background-size: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 16px;
    width: 100px;
  }

  @media ${device.mobileL()} {
    margin-left: 10%;
    font-size: 14px;
    line-height: 10px;

    img {
      max-width: 40px;
      max-height: 40px;
      border-radius: 50%;
      background-size: cover;
    }

    div {
      width: 150px;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
`;

export const WellcomeUser = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.titleColor};
`;

export const UserName = styled.strong<{ isDonator: Boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  max-width: ${({ isDonator }) => (isDonator ? "130px" : "180px")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.primary};

  @media ${device.mobileL()} {
    max-width: 120px;
    font-size: 15px;
    text-overflow: initial;
    overflow-x: auto;
  }
`;

export const Burguer = styled.div<BurbuerProps>`
  @media ${device.mobileL()} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 1;
    width: 25px;
    height: 25px;
    top: 32px;
    right: 15px;
    position: fixed;
    cursor: pointer;

    div {
      width: 2rem;
      height: 0.25rem;
      background-color: ${({ theme }) => theme.colors.tabColor};
      border-radius: 10px;
      transform-origin: 1px;
      transition: all 0.3s linear;

      &:nth-child(1) {
        ${({ open }) =>
          open
            ? css`
                transform: translateY(-5px) rotate(45deg);
              `
            : css`
                transform: rotate(0);
              `}
      }
      &:nth-child(2) {
        ${({ open }) =>
          open
            ? css`
                transform: translateX(100%);
                opacity: 0;
              `
            : css`
                transform: translateX(0);
                opacity: 1;
              `}
      }
      &:nth-child(3) {
        ${({ open }) =>
          open
            ? css`
                transform: translateY(-1.5px) rotate(-45deg);
              `
            : css`
                transform: rotate(0);
              `}
      }
    }
  }
`;

export const Li = styled.li<{ isHover: boolean }>`
  transition: 0.5s;
  ${({ isHover }) =>
    isHover &&
    css`
      &:hover {
        transform: translateX(10px);
        border-bottom: 1px solid ${({ theme }) => theme.colors.tabColor};
      }
    `}
`;

export const Ul = styled.ul<BurbuerProps>`
  display: flex;
  padding-top: 15px;
  padding-left: ${({ isDonator }) => (isDonator ? "20px" : "none")};
  width: 100%;
  justify-content: ${({ isDonator }) =>
    isDonator ? "space-around" : "space-between"};

  button {
    border: none;
    background: transparent;
  }

  li {
    font-size: 14px;
  }

  svg {
    margin-right: 10px;
  }

  a {
    display: flex;
    align-items: flex-end;
    color: ${({ theme }) => theme.colors.text};
  }

  @media ${device.mobileL()} {
    margin-left: 0;
    padding-top: 0;
    right: 0px;
    top: 70px;
    height: 20%;
    max-height: 160px;
    width: 250px;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    list-style: none;
    border-radius: 5px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.colors.colorHeader};
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;

    li {
      padding-left: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.colorBurguerMenu};
      padding-bottom: 10px;
    }
  }
`;

export const StyledFaSun = styled(FaSun)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.colorIconDarkLight};
`;

export const StyledFaMoon = styled(FaMoon)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.colorIconDarkLight};
`;

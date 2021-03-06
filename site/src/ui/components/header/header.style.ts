import styled from "styled-components";

import { device } from "../../../constants";

type PropsImg = {
  src: string;
};

type BurbuerProps = {
  open: boolean;
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.colorHeader};
  align-items: center;
  padding: 0px 100px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);

  @media ${device.mobileL()} {
    padding: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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

export const Profile = styled.div`
  display: flex;
  align-items: center;
  max-width: 245px;
  height: 100%;
  margin-left: 5%;
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

export const UserName = styled.strong`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  max-width: 200px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.primary2};

  @media ${device.mobileL()} {
    max-width: 120px;
    font-size: 15px;
    text-overflow: initial;
    overflow-x: auto;
  }
`;

export const Burguer = styled.div<BurbuerProps>`
  @media ${device.mobileL()} {
    width: 25px;
    height: 25px;
    position: fixed;
    top: 32px;
    right: 15px;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    cursor: pointer;

    div {
      width: 2rem;
      height: 0.25rem;
      background-color: ${({ open }) => (open ? "red" : "#333")};
      border-radius: 10px;
      transform-origin: 1px;
      transition: all 0.3s linear;

      &:nth-child(1) {
        transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      }
      &:nth-child(2) {
        transform: ${({ open }) =>
          open ? "translateX(100%)" : "translateX(0)"};
        opacity: ${({ open }) => (open ? 0 : 1)};
      }
      &:nth-child(3) {
        transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      }
    }
  }
`;

export const Ul = styled.ul<BurbuerProps>`
  @media ${device.mobileL()} {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    li {
      padding: 18px 10px;
    }

    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100%;
    width: 250px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: red;
    }
  }
`;

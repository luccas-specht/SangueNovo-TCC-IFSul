import styled from "styled-components";

import { shade } from "polished";

import { Link } from "react-router-dom";

import { device } from "../../../../constants";

export const Header = styled.header`
  display: flex;
  width: 100%;

  height: 80px;
  background-color: ${({ theme }) => theme.colors.colorHeader};
  align-items: center;
  padding: 0px 100px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);

  @media ${device.mobileL()} {
    padding: 0px 30px;
  }
`;

export const Back = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  transition: color 0.3s;

  align-items: center;
  align-self: center;

  &:hover {
    color: ${({ theme }) => shade(0.2, theme.colors.text)};
  }

  svg {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
`;

export const Profile = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-top: -100px;

  img {
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    background-size: cover;
  }

  label {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
    border-radius: 50%;
    transition: background-color 0.2;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${({ theme }) => theme.colors.text};
    }
    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.text};
    }
  }
`;

export const EditWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 20px;

    align-self: flex-start;
    font-family: "Roboto Slab";

    font-style: normal;
    font-weight: 500;

    font-size: 20px;
    line-height: 26px;
  }
`;

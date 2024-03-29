import styled from "styled-components";

import { shade } from "polished";

import { Link } from "react-router-dom";

import { device } from "../../../../constants";

export const Container = styled.div`
  height: 350px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  box-shadow: 2px 2px 10px
    ${({ theme }) => theme.colors.colorBoxShadowCampaignCard};
  transition: 1s;

  img {
    margin: 15px 0;
  }

  @media ${device.mobileL()} {
    width: 350px;
    height: 300px;
    margin-top: 30%;

    img {
      margin-top: -30%;
    }
  }
`;

export const Form = styled.form`
  width: 350px;
  text-align: center;

  @media ${device.mobileL()} {
    width: 300px;
    margin-top: 10%;
  }
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-style: normal;
  line-height: 32px;
  font-weight: 400;
  font-size: 25px;

  @media ${device.mobileL()} {
    margin-top: 5%;
  }
`;

export const BackToSignIn = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  transition: color 0.3s;

  div {
    display: flex;
    margin-top: 15px;
  }

  &:hover {
    color: ${({ theme }) => shade(0.2, theme.colors.text)};
  }

  svg {
    margin-right: 5px;
  }
`;

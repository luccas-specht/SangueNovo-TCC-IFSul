import styled, { keyframes, css } from "styled-components";

import { shade } from "polished";

import { Link } from "react-router-dom";

import { device } from "../../../../constants";

type TabProps = {
  active: boolean;
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  @media ${device.mobileL()} {
    flex-direction: column;
    width: 375px;
  }
`;

export const Context = styled.div`
  display: flex;
  flex: 1;
  padding-right: 14%;
  align-items: center;
  flex-direction: column;
  align-self: center;

  @media ${device.mobileL()} {
    flex-direction: column;
    padding-right: 0;
  }
`;

export const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-100px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(100px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContext = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  animation: ${appearFromLeft} 1.2s;

  @media ${device.mobileL()} {
    margin: 0;
  }
`;

export const FormContainer = styled.div`
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
    margin: 25px auto;
  }

  @media ${device.mobileL()} {
    padding-top: 5%;
    margin-top: 50%;
    width: 350px;

    img {
      top: 50px;
      position: absolute;
    }
  }
`;

export const AnimantionForm = styled.div<TabProps>`
  animation: ${({ active }) => (active ? appearFromRight : appearFromLeft)} 1s;
`;

export const Title = styled.h1`
  font-style: normal;
  line-height: 32px;
  text-align: center;
  font-weight: 400;
  font-size: 25px;
`;

export const Ul = styled.ul<TabProps>`
  width: 80%;
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  li {
    font-style: normal;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    font-weight: 900;

    ${({ active }) =>
      active
        ? css`
            &:first-child {
              color: ${({ theme }) => theme.colors.tabColor};
              border-radius: 1px;
              border-bottom: 1.5px solid ${({ theme }) => theme.colors.tabColor};
            }
          `
        : css`
            &:last-child {
              color: ${({ theme }) => theme.colors.tabColor};
              border-radius: 1px;
              border-bottom: 1.5px solid ${({ theme }) => theme.colors.tabColor};
            }
          `}
  }
`;

export const BackToSignIn = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  transition: color 0.3s;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
  margin-top: 20px;

  &:hover {
    color: ${({ theme }) => shade(0.2, theme.colors.text)};
  }

  svg {
    margin-right: 5px;
  }
`;

export const WrapperImg = styled.div`
  margin-left: 10%;
  display: flex;
  height: 85%;
  padding-top: 50px;
  align-self: flex-start;
  flex-direction: column;
  justify-content: space-between;
  visibility: visible;

  & :first-child {
    max-width: 160px;
    max-height: 120px;
  }

  & :last-child {
    max-height: 300px;
    max-width: 320px;
  }

  @media ${device.mobileL()} {
    margin: 0;
    padding: 0;
    visibility: hidden;
    height: 0;

    img {
      margin: 0;
      visibility: hidden;
      opacity: 0;
    }
  }
`;

export const RigthImg = styled.img`
  max-width: 200px;
  max-height: 200px;
  align-self: flex-end;
  visibility: visible;

  @media ${device.mobileL()} {
    opacity: 0;
    max-width: 0;
    max-height: 0;
    visibility: hidden;
  }
`;

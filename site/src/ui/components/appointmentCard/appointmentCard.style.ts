import { shade } from "polished";
import styled, { css } from "styled-components";

interface ContentProps {
  color: string;
  high: boolean;
}

export const Appointment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  transition: 1s;

  & + div {
    margin-top: 16px;
  }

  &:hover {
    transform: translateX(20px);
  }
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    padding-top: 10px;
    align-items: center;
    align-self: flex-start;

    span {
      display: flex;
      align-items: center;
      width: 100px;
      height: 100%;
      padding-top: 8px;

      color: ${({ theme }) => theme.colors.titleColor};

      svg {
        color: #ff9000;
        margin-right: 8px;
        margin-left: 12px;
      }
    }
  }
`;

export const WrapperImg = styled.div`
  max-height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0 0px 20px;
  border-radius: 10px;
  margin-top: -5px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 20px;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

export const ContentPriority = styled.div<ContentProps>`
  width: 100%;
  height: 100%;

  span {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    align-self: flex-end;
    padding-top: 0px !important;
    padding-left: 10px;
    color: ${({ color }) => color} !important;

    svg {
      visibility: ${({ high }) => (high ? "visible" : "hidden")};
      opacity: ${({ high }) => (high ? "1" : "0")};
      margin-left: 10px;
      cursor: pointer;
      color: #bf0404 !important;
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    max-width: 500px;
  }
`;

export const WrapperCampaign = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  margin-top: -15px;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;

  font-family: "Paytone One", sans-serif;
  font-size: 23px;
  font-weight: 400;
  font-style: normal;
  color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WrapperInfo = styled.div`
  width: 100%;
  height: 100%;
`;

export const BloodType = styled.text`
  display: flex;
  align-items: center;
  font-size: 15px;
  width: 120%;
  justify-content: space-between;

  span {
    color: #bf0404 !important;
    padding-top: 5px !important;
    padding-left: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
  }
`;

export const StyledButtonIcon = styled.button<{ isShowButton: boolean }>`
  border: none;
  background: none;
  color: none;
  padding-top: 5px;

  svg {
    max-width: 23px;
    max-height: 23px;
    ${({ isShowButton }) =>
      isShowButton
        ? css`
            transition: 1s;
            transform: rotate(180deg);
          `
        : css`
            transition: 1s;
            transform: rotate(0deg);
          `}
    cursor: pointer;
    color: #c4c4c4;
  }
`;

export const WrapperButtons = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const StyledButton = styled.button<{ color: string }>`
  width: 50%;
  height: 56px;
  border: none;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 18px;
  margin: 0px 20px 10px 20px;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ color }) => shade(0.2, color)};
  }
`;

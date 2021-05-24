import styled, { css } from "styled-components";

interface ContentProps {
  color: string;
  high: boolean;
}

interface CardContainerProps {
  isShowButton: boolean;
}

export const CardContainer = styled.main<CardContainerProps>`
  width: 100%;
  max-width: 850px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundCampaignCard};
  margin-top: 10px;
  transition: 1s;

  &:hover {
    box-sizing: border-box;
    box-shadow: 0px -2px 8px rgba(150, 150, 150, 0.25);
  }

  ${({ isShowButton }) =>
    isShowButton
      ? css`
          height: 300px;
        `
      : css`
          height: 210px;
        `}
`;

export const Content = styled.div`
  padding: 21px;
  display: flex;
  height: 100%;
`;

export const Left = styled.aside`
  height: 100%;
  max-height: 158px;
  max-width: 180px;
  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    object-fit: cover;
    object-position: center;
  }
`;

export const Right = styled.aside`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  flex: 1;
  padding-left: 21px;
`;

export const Title = styled.h1`
  align-self: flex-start;
  margin-top: -12px;

  font-family: "Paytone One", sans-serif;
  font-size: 28px;
  font-weight: 400;

  font-style: normal;
  color: ${({ theme }) => theme.colors.titleColorCampaignCard};
`;

export const Description = styled.div`
  font-style: normal;
  margin-top: 10px;

  font-weight: 600;
  font-style: normal;
  font-size: 15px;
  line-height: 23px;
  width: 100%;
  max-width: 800px;
  text-align: start;

  color: ${({ theme }) => theme.colors.titleColor};
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const WrapperContent = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

export const CampaignDetails = styled.div`
  width: 270px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const Date = styled.strong`
  font-family: "Paytone One", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.titleColorCampaignCard};
`;

export const ContentPriority = styled.div<ContentProps>`
  color: ${({ color }) => color};

  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;

  span {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    align-self: flex-end;

    svg {
      visibility: ${({ high }) => (high ? "visible" : "hidden")};
      opacity: ${({ high }) => (high ? "1" : "0")};
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;

export const BloodType = styled.text`
  font-size: 15px;
  span {
    color: #bf0404;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13px;

  button {
    max-width: 500px;
  }
`;

export const StyledButtonIcon = styled.button<{ isShowButton: boolean }>`
  border: none;
  background: none;
  color: none;
  padding-top: 7%;
  height: 100%;

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
  width: 45%;
  height: 56px;
  border: none;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 18px;
`;

import styled, { css } from "styled-components";

interface ContentProps {
  color: string;
  high: boolean;
}

interface CardContainerProps {
  isShowButton: boolean;
}

export const CardContainer = styled.main<CardContainerProps>`
  box-sizing: border-box;
  width: 100%;
  max-width: 850px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundCampaignCard};
  margin-top: 10px;
  box-shadow: 2px 2px 10px
    ${({ theme }) => theme.colors.colorBoxShadowCampaignCard};
  transition: 1s;

  ${({ isShowButton }) =>
    isShowButton
      ? css`
          height: 300px;
        `
      : css`
          height: 200px;
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
  min-height: 60px;
  align-self: flex-start;
  margin-top: -7px;

  font-family: "Paytone One", sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 35px;
  font-style: normal;
  color: ${({ theme }) => theme.colors.titleColorCampaignCard};
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100px;
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
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.footer`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13px;

  button {
    width: 100%;
  }
`;

export const StyledButtonIcon = styled.button<{ isShowButton: boolean }>`
  border: none;
  background: none;
  color: none;
  padding-top: 15px;

  svg {
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

export const ContentProgress = styled.div`
  height: 20px;
  width: 90%;
  position: relative;
  display: flex;
  align-self: flex-start;
  align-items: center;
`;

export const Progress = styled.div`
  background-color: #c4c4c4;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  max-width: 450px;
  align-self: flex-start;

  span {
    color: #c4c4c4;
    font-style: normal;
    line-height: 25px;
  }
`;

export const ProgressDone = styled.div`
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.colorProgressBar},
    ${({ theme }) => theme.colors.colorProgressBar}
  );
  border-radius: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  transition: 1s ease 0.3s;

  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledCurrentGoal = styled.text`
  width: 100px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.colorProgressBar};
  font-family: "Paytone One", sans-serif;
  font-size: 36px;
  line-height: 44px;
  align-items: center;
`;

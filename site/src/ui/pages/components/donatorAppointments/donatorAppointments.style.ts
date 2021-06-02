import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 90%;
  align-items: flex-start;
`;

export const Main = styled.main`
  padding-top: 80px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ContentList = styled.div`
  height: 100%;
  width: 50%;
  max-width: 1500px;
  max-height: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
`;

export const WrapperCampaings = styled.div`
  width: 100%;
  max-width: 975px;
  height: 100%;

  padding: 30px;
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border: transparent;
    padding: 2px 0;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => shade(-0.6, theme.colors.text)};
  }
`;

export const DonationCard = styled.div<{ isFinished: boolean }>`
  width: 100%;
  max-width: 850px;
  min-height: 200px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundCampaignCard};
  box-shadow: 2px 2px 10px
    ${({ theme }) => theme.colors.colorBoxShadowCampaignCard};
  transition: 1s;
  display: flex;
  padding: 20px;

  opacity: ${({ isFinished }) => (isFinished ? "0.4" : "1")};

  & + div {
    margin-top: 10px;
  }

  &:hover {
    transform: ${({ isFinished }) =>
      isFinished ? "translateX(0px)" : "translateX(20px)"};
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Location = styled.a<{ isFinished: boolean }>`
  height: 100%;
  width: 200px;
  border-radius: 10px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: ${({ isFinished }) => (isFinished ? "default" : "pointer")};

  svg {
    margin: 40px;
  }
`;

export const Wrapper = styled.aside`
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 20px;
  flex-direction: column;

  strong {
    margin-top: -7px;
    align-self: flex-start;
    font-family: "Paytone One", sans-serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 35px;
    font-style: normal;
    color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  }
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

export const Details = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  justify-content: space-between;

  div {
    display: flex;
    align-self: flex-end;
    align-items: center;
    height: 25px;

    svg {
      margin-right: 5px;
    }
  }
`;

export const Info = styled.div<{ color: string }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ color }) => color};

  svg {
    color: ${({ color }) => color};
  }
`;

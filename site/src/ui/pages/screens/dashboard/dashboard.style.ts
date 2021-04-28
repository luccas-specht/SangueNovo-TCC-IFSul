import styled from "styled-components";

import { shade } from "polished";

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Main = styled.main`
  height: 100%;
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  border-top: 2px solid #f2f2f2;
`;

export const WrapperCampaings = styled.div`
  margin-top: 7px;
  width: 70%;
  height: 100%;
  max-height: 700px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border: transparent;
    padding: 2px 0;
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => shade(-0.6, theme.colors.text)};
  }
`;

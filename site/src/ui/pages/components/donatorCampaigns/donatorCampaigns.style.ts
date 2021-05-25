import styled from "styled-components";
import { shade } from "polished";

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
  height: 90%;
  margin-top: 30px;
  padding-bottom: 30px;
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

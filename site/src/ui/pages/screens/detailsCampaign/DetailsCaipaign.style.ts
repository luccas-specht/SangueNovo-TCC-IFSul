import styled from "styled-components";

export const Container = styled.div`
  width: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  flex-direction: column;
`;

export const ContentCampaign = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentMap = styled.div`
  width: 50%;
  height: 100%;
  background-color: red;
  display: flex;
`;

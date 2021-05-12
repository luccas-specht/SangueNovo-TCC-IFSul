import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const ImageCaipaignBox = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`;

export const MainInfoBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const MoreInfoBox = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const restInfoBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 100px;
`;

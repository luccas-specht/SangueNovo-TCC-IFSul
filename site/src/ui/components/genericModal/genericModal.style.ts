import styled from "styled-components";

export const Modal = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  box-shadow: 2px 2px 10px
    ${({ theme }) => theme.colors.colorBoxShadowCampaignCard};
  width: 35%;
  height: 53%;
  border-radius: 10px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  width: 32px;
  height: 32px;
  right: calc(-104% + 64px);
  top: 16px;
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;

  &:before,
  &:after {
    content: " ";
    position: absolute;
    width: 2.5px;
    height: 24px;
    background-color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

export const Content = styled.div`
  padding: 10px 5% 2% 5%;
`;

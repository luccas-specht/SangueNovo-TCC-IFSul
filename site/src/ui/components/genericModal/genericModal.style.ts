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
  background-color: #fff;
  color: #000;
  width: 35%;
  height: 45%;
  border-radius: 20px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  width: 32px;
  height: 32px;
  right: calc(-100% + 64px);
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
    background-color: #333333;
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

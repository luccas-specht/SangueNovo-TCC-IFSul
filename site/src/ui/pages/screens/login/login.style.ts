import styled, { keyframes } from "styled-components";

import { device } from "../../../../constants/responsivenessAvailable";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  @media ${device.mobileL()} {
    flex-direction: column;
    width: 375px;
  }
`;

export const Context = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media ${device.mobileL()} {
    flex-direction: column;
  }
`;

export const WrapperImg = styled.div`
  margin-top: 50px;
  margin-left: 10%;
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
  visibility: visible;

  & :first-child {
    max-width: 160px;
    max-height: 120px;
  }

  & :last-child {
    max-height: 140px;
  }

  @media ${device.mobileL()} {
    opacity: 0;
    margin: 0;
    height: 0;
    width: 0;
    visibility: hidden;
  }
`;

export const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(-100px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContext = styled.div`
  margin: 0 14%;
  display: flex;
  align-self: center;
  align-items: center;
  animation: ${appearFromRight} 1.2s;

  @media ${device.mobileL()} {
    margin: 0;
  }
`;

export const ImgRight = styled.img`
  max-width: 200px;
  max-height: 200px;
  align-self: flex-end;

  @media ${device.mobileL()} {
    opacity: 0;
    max-width: 0;
    max-height: 0;
  }
`;

import styled, { keyframes } from "styled-components";

import { device } from "../../../../constants";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  @media ${device.mobileL()} {
    width: 375px;
    align-items: center;
  }
`;

export const Context = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  @media ${device.mobileL()} {
    flex-direction: column;
  }
`;

export const LeftImg = styled.div`
  margin-left: 10%;
  display: flex;
  height: 100%;
  align-items: flex-start;

  img {
    margin-top: 50px;
    max-width: 160px;
    max-height: 120px;
  }

  @media ${device.mobileL()} {
    display: none;
    height: 0;
    margin: 0;

    img {
      margin-top: 0;
      max-width: 0;
      max-height: 0;
    }
  }
`;

export const RightImg = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  flex: 1;
  margin-left: 13%;

  @media ${device.mobileL()} {
    display: none;
    height: 0;
    margin: 0;
    flex: 0;
  }
`;

export const ContextImg = styled.div`
  width: 100%;

  img {
    float: right;
    max-width: 200px;
    max-height: 130px;
  }

  @media ${device.mobileL()} {
    width: 0;

    img {
      opacity: 0;
      float: none;
      max-width: 0px;
      max-height: 0px;
    }
  }
`;

export const AnimationImg = styled.img`
  @media ${device.mobileL()} {
    opacity: 0;
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
  margin-left: 17.7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  animation: ${appearFromRight} 1.2s;

  @media ${device.mobileL()} {
    margin: 0;
  }
`;

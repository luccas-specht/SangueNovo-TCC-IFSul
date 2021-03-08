import styled from "styled-components";

import { device } from "../../../../constants";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 70%;
  align-self: center;
  align-items: center;
  flex-direction: column;

  @media ${device.mobileL()} {
    flex-direction: column;
    flex: 0;
    height: 100vh;
    max-width: 415px;
  }
`;

export const Content = styled.div`
  display: flex;
  padding-top: 5%;
  width: 50%;

  @media ${device.mobileL()} {
    width: 100%;
    flex-direction: column;
  }
`;

export const AnimationWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 600px;
  min-height: 600px;

  @media ${device.mobileL()} {
    align-self: center;
    min-width: 0;
    min-height: 0;
    max-height: 300px;
    max-width: 300px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    min-width: 300px;
    align-self: center;
  }
`;

export const StyledText = styled.div`
  font-weight: 550;
  font-size: 30px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.primary1};
  text-transform: uppercase;

  @media ${device.mobileL()} {
    align-self: center;
    font-size: 20px;
    line-height: 25px;
  }
`;

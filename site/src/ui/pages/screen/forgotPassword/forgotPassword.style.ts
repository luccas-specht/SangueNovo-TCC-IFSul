import styled, { keyframes } from 'styled-components';

import loginImgLight from '../../../assets/images/login-background-light.png';
import loginImgDark from '../../../assets/images/login-background-dark.png';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Context = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 800px;
`;

const ImgBackground = styled.div`
  flex: 1;
  background: url(${props => props.theme.imageBackground}) no-repeat center;
  background-size: cover;
`;

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimationContext = styled.div`
  padding-top: 20px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1.2s;
`;

export { 
    Container, 
    Context, 
    ImgBackground, 
    AnimationContext };
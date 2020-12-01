import styled, { keyframes } from 'styled-components';
import singInImg from '../../../assets/images/sing-up-background.png';

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
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimationContext = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1.2s;
`;

const ImgBackground = styled.div`
  flex: 1;
  background: url(${singInImg}) no-repeat center;
  background-size: cover;
`;

export { Container, Context, ImgBackground, AnimationContext };

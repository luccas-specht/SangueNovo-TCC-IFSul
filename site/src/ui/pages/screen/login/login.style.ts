import styled, { keyframes } from 'styled-components';

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
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  max-width: 800px;
`;

const ContextLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: -50px;
`;

const ImgBackground = styled.div`
  flex: 1;
  background: url(${props => props.theme.imageLoginBackground}) no-repeat center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1.2s;
`;

export { 
    Container, 
    Context, 
    ImgBackground, 
    AnimationContext,
    ContextLogin };
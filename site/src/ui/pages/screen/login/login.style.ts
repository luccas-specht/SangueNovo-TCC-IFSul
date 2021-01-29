import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Context = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  place-content: center;
  justify-content: space-evenly;
`;


export const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(-80px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContext = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  animation: ${appearFromRight} 1.5s;
`;
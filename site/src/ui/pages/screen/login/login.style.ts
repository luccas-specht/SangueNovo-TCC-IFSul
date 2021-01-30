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
`;

export const WrapperImg = styled.div`
  margin-top: 50px;
  padding-left: 10%;
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
  
    & :first-child {
      max-width: 160px; 
      max-height: 120px; 
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
  animation: ${appearFromRight} 2s;
`;

export const ImgRight = styled.img`
  max-width: 200px; 
  max-height: 230px;
  align-self: flex-end;
`;
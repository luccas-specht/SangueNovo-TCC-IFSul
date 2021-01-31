import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  
  @media (max-width: 415px) {
    flex-direction: column;
    width: 375px; 
  }
`;

export const Context = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media (max-width: 415px) {
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
  
    & :first-child {
      max-width: 160px; 
      max-height: 120px; 
    }

  @media (max-width: 415px) {
    opacity: 0;
    margin: 0;
    height: 0;
    width: 0;
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

  @media (max-width: 415px) {
    margin: 0;
  }
`;

export const ImgRight = styled.img`
  max-width: 200px; 
  max-height: 230px;
  align-self: flex-end;

  @media (max-width: 415px) {
    opacity: 0;
    max-width: 0;
    max-height: 0;
  }
`;
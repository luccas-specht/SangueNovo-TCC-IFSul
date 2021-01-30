import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Context = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
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
`;

export const RightImg = styled.div`
   display: flex;
   align-items: flex-end;
   height: 100%;
   flex: 1;
   margin-left: 13%;
`;

export const ContextImg = styled.div`
  width: 100%;
  
    img {
        float: right;
        max-width: 200px; 
        max-height: 200px; 
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
`;
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

export const WrapperImg = styled.div`
  margin-top: 50px;
  padding-left: 200px;
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
  
    & :first-child {
      max-width: 159px; 
      max-height: 114px; 
    }
`;

export const ColumnRight = styled.div`

`;
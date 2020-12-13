import styled, { keyframes, css } from 'styled-components';

import loginImgLight from '../../../assets/images/register-background-light.png';
import loginImgDark from '../../../assets/images/register-background-dark.png';

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

interface ImgBackgroundProps {
  titleThemeLight: string
}

const ImgBackground = styled.div<ImgBackgroundProps>`
  flex: 1;
   ${props => 
      props.titleThemeLight === 'light'? 
      css` 
        background: url(${loginImgLight}) no-repeat center;
      ` 
      : css` 
        background: url(${loginImgDark}) no-repeat center;
      ` 
   };
  background-size: cover;
`;

const appearFromRight = keyframes`
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
  animation: ${appearFromRight} 1.2s;
`;

export { 
    Container, 
    Context, 
    ImgBackground, 
    AnimationContext };
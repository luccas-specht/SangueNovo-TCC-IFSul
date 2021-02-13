import styled, { keyframes, css } from 'styled-components';

import { shade } from 'polished';

import { Link } from 'react-router-dom';

import { device } from '../../../../constants/responsivenessAvailable';

interface TabProps {
  active: boolean;
}

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  
 @media ${device.mobileL()} {
    flex-direction: column;
    width: 375px; 
  }
`;

export const Context = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-self: center;

  @media ${device.mobileL()} {
    flex-direction: column;
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
  display: flex;
  align-self: center;
  align-items: center;
  animation: ${appearFromRight} 1.2s;

  @media ${device.mobileL()} {
    margin: 0;
  }
`;

export const FormContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};

  img {
    margin: 25px auto;
  }
`;

export const Title = styled.h1`
  font-style: normal;
  line-height: 32px;
  text-align: center;
  font-weight: 400;
  font-size: 25px;
`;

export const Ul = styled.ul<TabProps>`
  width: 80%;
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  li {
    font-style: normal;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    font-weight: 900;
    

    ${({ active }) => active ? 
    css`
      &:first-child {
        color: #3F51B5;
        border-radius: 1px;
        border-bottom: 2px solid #3F51B5;
      }
    `
   : css`
      &:last-child {
          color: #3F51B5;
          border-radius: 1px;
          border-bottom: 2px solid #3F51B5;
        }
     `}
  }  
`;

export const BackToSignIn = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    transition: color 0.3s;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
    
    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.text)};
    }

    svg {
      margin-right: 5px;
    }
`;
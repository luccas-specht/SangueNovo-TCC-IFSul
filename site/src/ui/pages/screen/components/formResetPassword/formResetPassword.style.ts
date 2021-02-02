import styled from 'styled-components';

import { shade } from 'polished';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
`;


export const Form = styled.form`
  width: 424px;
  text-align: center;
  
  > div{
    margin-bottom: 8px;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    display: block;
    margin-top: 24px;
    transition: color 0.3s;
    
    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.text)};
    }
  
  }
`;

export const BackToSingIn = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  margin-top: 24px;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }

  svg {
    margin-right: 8px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-style: normal;
  line-height: 32px;
  text-align: center;
`;

export const CreateAccount = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  display: block;
  margin-top: 24px;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => shade(0.2, props.theme.colors.primary)};
  }
  svg {
    margin-right: 16px;
  }
`;
import styled from 'styled-components';

import { shade } from 'polished';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 350px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};

  img {
    margin: 15px 0;
  }
`;

export const Form = styled.form`
  width: 350px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-style: normal;
  line-height: 32px;
  font-weight: 400;
`;


export const BackToSignIn = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
    display: block;
    margin-top: 24px;
    transition: color 0.3s;
    align-items: center;
    
    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.text)};
    }

    svg {
      margin-right: 5px;
    }
`;
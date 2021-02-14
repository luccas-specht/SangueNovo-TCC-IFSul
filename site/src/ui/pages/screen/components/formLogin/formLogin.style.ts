import styled from 'styled-components';

import { shade } from 'polished';

import { Link } from 'react-router-dom';

import { device } from '../../../../../constant/responsivenessAvailable';

export const Container = styled.div`
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};

  img {
    margin: 25px 0;
  }

  @media ${device.mobileL()} {
    flex-direction: column;
    width: 350px; 
    height: 350px;
    margin: 50% 0;

    img {
      margin-top: -30%;
    }
  }
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-style: normal;
  line-height: 32px;
  text-align: center;
  font-weight: 400;
  font-size: 25px;
`;

export const Form = styled.form`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

    a {
      color: ${({ theme }) => theme.colors.text};
      display: block;
      margin-top: 24px;
      transition: color 0.3s;

        &:hover {
          color:  ${({ theme }) => shade(0.2,theme.colors.text)};
        }
    }

  @media ${device.mobileL()} {
    width: 325px;
    margin-top: 10%;
  }
`;

export const CreateAccount = styled(Link)`
  margin: 20px 0;
  color: ${(props) => props.theme.colors.primary};
  display: block;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  
    &:hover {
      color: ${(props) => shade(0.2, props.theme.colors.primary)};
    }

    svg {
      margin-right: 10px;
    }

  @media ${device.mobileL()} {
    margin: 30% 0;
  }
`;
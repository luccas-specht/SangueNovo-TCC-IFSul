import styled from 'styled-components';

import { shade } from 'polished';

import { Link } from 'react-router-dom';

const Form = styled.form`
  margin: 80px 0;
  width: 424px;
  text-align: center;
  a {
    color: ${(props) => props.theme.colors.text};
    display: block;
    margin-top: 24px;
    transition: color 0.3s;
    &:hover {
      color: ${(props) => shade(0.2, props.theme.colors.text)};
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-style: normal;
  line-height: 32px;
  text-align: center;
`;

const BackToSingIn = styled(Link)`
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
    margin-right: 10px;
  }
`;

const ContextInputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
`;


export { Form, 
        Title, 
        BackToSingIn,
        ContextInputs
         };
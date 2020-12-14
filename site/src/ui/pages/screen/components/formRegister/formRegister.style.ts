import styled from 'styled-components';

import { shade } from 'polished';

import { Link } from 'react-router-dom';

const Form = styled.form`
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
    margin-right: 8px;
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
        BackToSingIn,
        ContextInputs
         };
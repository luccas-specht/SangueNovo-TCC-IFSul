import styled from 'styled-components';

import { shade } from 'polished';

export const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 56px;
  border: 0;
  border-radius: 10px;
  padding: 0 16px;
  font-weight: 500;
  margin-top: 20px;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.primary)};
  }
`;
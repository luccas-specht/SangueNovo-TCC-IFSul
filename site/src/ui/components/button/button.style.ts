import styled, { css } from 'styled-components';

import { shade } from 'polished';

interface PropsButton {
  disabled: boolean;
}

export const Button = styled.button<PropsButton>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
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
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }

  ${props => props.disabled && css` 
    background-color: #DDDDDD;
    cursor: auto;

    &:hover {
      background-color: #DDDDDD;
    }
  `}
`;
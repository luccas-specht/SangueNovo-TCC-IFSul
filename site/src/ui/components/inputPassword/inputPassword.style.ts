import styled, { css } from 'styled-components';

import { MdRemoveRedEye, BsFillEyeSlashFill } from 'react-icons/all';

interface PropsContainer {
  isFilled: boolean;
  isFocus: boolean;
  isErrored: boolean;
}

const Container = styled.div<PropsContainer>`
  background: ${(props) => props.theme.colors.backgroundInput};
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.backgroundInput};
  padding: 16px;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  ${(props) =>
    props.isErrored &&
    css`
    
    `}
  ${(props) =>
    props.isFocus &&
    css`
      color: ${(props) => props.theme.colors.primary};
      border-color: ${(props) => props.theme.colors.primary};
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: ${(props) => props.theme.colors.primary};
  `}
`;

const Input = styled.input`
  color: ${(props) => props.theme.colors.text};
  flex: 1;
  background: transparent;
  border: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
`;

const CloseEye = styled(MdRemoveRedEye)`
  cursor: pointer;
`;

const OpenEye = styled(BsFillEyeSlashFill)`
  cursor: pointer;
`;
export { Container, Input, CloseEye, OpenEye };
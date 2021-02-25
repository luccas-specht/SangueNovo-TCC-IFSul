import styled, { css } from "styled-components";

import { MdRemoveRedEye, BsFillEyeSlashFill } from "react-icons/all";

type ContainerProps = {
  isErrored: boolean;
  isFocused: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
  padding: 16px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  max-height: 56px;

  & + div {
    margin-top: 10px;
  }

  button {
    border: none;
    background: transparent;

    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.errorColor};
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${({ theme }) => theme.colors.backgroundPrimary};
    `}
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 10px;
  flex: 1;
  background: transparent;
  border: 0;
  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CloseEye = styled(MdRemoveRedEye)`
  margin: 3px 10px 0 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const OpenEye = styled(BsFillEyeSlashFill)`
  margin: 3px 10px 0 0;
  color: ${({ theme }) => theme.colors.text};
`;

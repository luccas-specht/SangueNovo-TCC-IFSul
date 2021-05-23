import styled, { css } from "styled-components";

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
  transition: 1s;

  & + div {
    margin-top: 10px;
  }

  input {
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.text};
    flex: 1;
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

export const Button = styled.button`
  border: none;
  background: none;

  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Content = styled.div`
  margin-left: 53px;
`;

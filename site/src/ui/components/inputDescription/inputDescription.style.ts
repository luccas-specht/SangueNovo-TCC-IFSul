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
  color: ${(props) => props.theme.colors.text};
  display: flex;
  height: auto;

  & + div {
    margin-top: 10px;
  }

  svg {
    margin-right: 10px;
    min-height: 20px;
    min-width: 20px;
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

export const Input = styled.textarea`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  background: transparent;
  border: 0;
  min-height: 145px;
  max-height: 260px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
  padding: 16px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  max-height: 56px;

  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.text};
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
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  background: transparent;
  border: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;
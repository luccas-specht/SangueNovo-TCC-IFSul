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

  svg {
    margin-right: 10px;
  }
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  border: 0;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;
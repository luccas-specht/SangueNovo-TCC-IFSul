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

  & + div {
    margin-top: 8px;
  }
 
  input {
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.text};
    flex: 1;
  }
`;


export const Button = styled.button`
    border: none;
    background: none;

    svg {
      margin-right: 10px;
      color: ${({ theme }) => theme.colors.text};
    }
`;
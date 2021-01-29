import styled from 'styled-components';

interface propsConatiner {
  isFilled: boolean;
  isFocus: boolean; 
  isErrored: boolean;
}

export const Container = styled.div<propsConatiner>`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 10px;
  border: 2px solid ${({theme}) => theme.colors.background};
  padding: 16px;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
 
  svg {
    margin-right: 16px;
  }
`;

export const Input = styled.input`
  color: ${(props) => props.theme.colors.text};
  flex: 1;
  background: transparent;
  border: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
`;
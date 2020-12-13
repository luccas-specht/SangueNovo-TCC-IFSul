import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.colors.backgroundInput};
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.backgroundInput};
  padding: 16px;
  width: 207px;
  height: 58px;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const Input = styled.input`
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: 0;
  max-width: 115px;
  
  &::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
`;
export { Container, Input };
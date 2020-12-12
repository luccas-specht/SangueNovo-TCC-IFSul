import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.colors.backgroundInput};
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.backgroundInput};
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

const Input = styled.input`
  color: ${(props) => props.theme.colors.text};
  flex: 1;
  background: transparent;
  border: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
`;
export { Container, Input };
import styled from "styled-components";

import Button from "@material-ui/core/Button";

export const Container = styled.div`
  margin: 5px auto;

  .MuiMobileStepper-root {
    background: none;
  }

  button {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const StyledButton = styled(Button)`
  .MuiButton-label {
    font-weight: bold;
    text-transform: none;
  }
`;

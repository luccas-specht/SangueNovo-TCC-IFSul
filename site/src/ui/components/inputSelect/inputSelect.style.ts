import styled from "styled-components";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export const StyledAutocomplete = styled(Autocomplete)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  position: relative;
  border-radius: 7px;
  margin-bottom: 10px;

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding-left: 0 !important;
    padding-right: 25px !important;
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]
    .MuiAutocomplete-input {
    padding: 9.5px 0 9.5px 45px;
    color: ${(props) => props.theme.colors.text};

    &::placeholder {
      opacity: 1;
    }
  }

  .MuiInputAdornment-positionStart {
    position: absolute;
    padding: 0;
    width: 35px;
    height: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;

    svg {
      color: ${(props) => props.theme.colors.text};
    }
  }

  .MuiAutocomplete-popper {
    width: 100% !important;
  }
`;

export const ScoreInline = styled.div`
  background-color: ${({ theme }) => theme.colors.tabColor};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

export const StyledTextField = styled(TextField)`
  margin-top: 0px !important;
  margin-bottom: 0px !important;

  .MuiOutlinedInput-root {
    color: ${(props) => props.theme.colors.backgroundPrimary};

    fieldset {
      border-color: transparent;
    }

    &:hover fieldset {
      border-color: transparent;
    }
    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.colors.backgroundPrimary};
      color: ${(props) => props.theme.colors.backgroundPrimary};
    }
  }
`;

export const Text = styled.text`
  color: ${(props) => props.theme.colors.text};
  font-size: 15px;
`;

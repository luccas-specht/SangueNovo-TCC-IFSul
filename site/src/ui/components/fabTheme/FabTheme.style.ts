import styled from "styled-components";

import { FaMoon, FaSun } from "react-icons/all";

import { device } from "../../../constants/responsivenessAvailable";

export const Container = styled.div`
  position: absolute;
  top: 3.4%;
  left: 91.1%;

  button {
    border: none;
    background: transparent;

    svg {
      color: ${({ theme }) => theme.colors.colorIconDarkLight};
      cursor: pointer;
    }
  }

  @media ${device.mobileL()} {
    top: 5%;
    left: 80%;
  }
`;

export const StyledFaSun = styled(FaSun)`
  width: 23px;
  height: 23px;
`;

export const StyledFaMoon = styled(FaMoon)`
  width: 20px;
  height: 20px;
`;

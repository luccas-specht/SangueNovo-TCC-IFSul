import styled from "styled-components";

import { device } from "../../../../../constants";

export const Form = styled.form`
  margin: 20px auto;
  width: 340px;
  height: 310px;
  align-self: center;

  @media ${device.mobileL()} {
    width: 325px;
  }
`;

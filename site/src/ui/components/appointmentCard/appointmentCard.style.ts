import styled, { css } from "styled-components";

export const Container = styled.div<{ isNextAppointment?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  margin-top: 24px;
  position: relative;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50px;
  }
  strong {
    margin-left: 24px;
    font-size: 18px;
    color: ${(props) => props.theme.colors.white};
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.white};
    font-size: 18px;
    svg {
      color: ${(props) => props.theme.colors.primary};
      margin-right: 8px;
      size: 18px;
    }
  }
  ${(props) =>
    props.isNextAppointment &&
    css`
      &::before {
        position: absolute;
        height: 80%;
        width: 1px;
        left: 0;
        top: 10%;
        content: "";
        background-color: ${(props) => props.theme.colors.primary};
      }
    `}
`;

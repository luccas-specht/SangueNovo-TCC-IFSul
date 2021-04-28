import styled from "styled-components";

import { Link } from "react-router-dom";

import { shade } from "polished";

import AddIcon from "@material-ui/icons/Add";

export const Container = styled(Link)`
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Fab = styled.button`
  width: 58px;
  height: 58px;
  position: fixed;
  right: 12%;
  bottom: 10%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  transition: background-color 0.2;
  transition: background-color 0.3s;

  button {
    display: none;
  }

  &:hover {
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }
`;

export const StyledAddIcon = styled(AddIcon)`
  color: ${({ theme }) => theme.colors.white};
`;

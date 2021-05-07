import React from "react";

import * as S from "./button.style";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  title,
  type,
  disabled = false,
  onClick = () => {},
}: Props) => (
  <S.Button type={type} disabled={disabled} onClick={onClick}>
    {title}
  </S.Button>
);

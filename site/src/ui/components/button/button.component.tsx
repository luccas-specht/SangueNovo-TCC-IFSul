import React from "react";

import * as S from "./button.style";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({ title, type, disabled = false }: Props) => (
  <S.Button type={type} disabled={disabled}>
    {title}
  </S.Button>
);

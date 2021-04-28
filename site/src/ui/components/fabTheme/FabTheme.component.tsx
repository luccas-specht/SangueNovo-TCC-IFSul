import React, { useCallback } from "react";

import { useTheme } from "../../../hooks";

import * as S from "./FabTheme.style";

export const FabTheme = () => {
  const { theme, changeTheme } = useTheme();

  const renderedIcon = useCallback(
    () => (
      <button type="button" onClick={changeTheme}>
        {theme.title === "light" ? <S.StyledFaSun /> : <S.StyledFaMoon />}
      </button>
    ),
    [changeTheme, theme]
  );

  return <S.Container>{renderedIcon()}</S.Container>;
};

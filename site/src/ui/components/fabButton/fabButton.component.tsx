import React from "react";

import * as S from "./fabButton.style";

type Props = {
  url?: string;
};

export const FabButton = ({ url = "/criar-campanha" }: Props) => (
  <S.Container to={url}>
    <S.Fab type="button">
      <S.StyledAddIcon />
    </S.Fab>
  </S.Container>
);

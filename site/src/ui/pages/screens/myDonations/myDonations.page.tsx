import React from "react";

import { Header, FabButton } from "../../../components";
import { WaitingAnimation } from "../../components";

import * as S from "./myDonations.styled";

export const MyDonations = () => {
  return (
    <>
      <Header />
      <S.Container>
        <WaitingAnimation
          message={`Parece que você não realizou nenhuma doação procure por campanhas de doações em, Listar Campanhas, selecione alguma para doar e ajude a salvar pessoas!`}
        />
      </S.Container>
      <FabButton />
    </>
  );
};

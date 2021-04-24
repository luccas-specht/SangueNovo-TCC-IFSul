import React from "react";

import { Header } from "../../../components";

import { FilterCampaings } from "../../components";

import * as S from "./dashboard.style";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Main>
            <FilterCampaings />
          </S.Main>
        </S.Content>
      </S.Container>
    </>
  );
};

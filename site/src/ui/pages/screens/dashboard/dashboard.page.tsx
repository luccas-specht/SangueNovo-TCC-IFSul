import React, { useState } from "react";

import { Header } from "../../../components";

import { FilterCampaings } from "../../components";

import * as S from "./dashboard.style";

export const Dashboard = () => {
  const [listCampaigns, setListCampaigns] = useState([]);
  const [filter, setFilter] = useState();
  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Main>
            <FilterCampaings setFilter={setFilter} />
          </S.Main>
        </S.Content>
      </S.Container>
    </>
  );
};

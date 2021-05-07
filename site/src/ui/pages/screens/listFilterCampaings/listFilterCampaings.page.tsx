import React, { useEffect, useState } from "react";

import { Header, FabButton } from "../../../components";

import { FilterCampaings } from "../../components";

import * as S from "./listFilterCampaings.style";

export const ListFilterCampaings = () => {
  const [listCampaigns, setListCampaigns] = useState([]);
  const [filter, setFilter] = useState();

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Main>
            <FilterCampaings setFilter={setFilter} />
            <S.ContentList>
              <S.WrapperCampaings>
                {[...Array(50)].map((e) => (
                  <div
                    style={{ border: "2px solid blue", width: 50, height: 50 }}
                  />
                ))}
              </S.WrapperCampaings>
            </S.ContentList>
          </S.Main>
        </S.Content>
      </S.Container>
      <FabButton url="criar-campanha" />
    </>
  );
};

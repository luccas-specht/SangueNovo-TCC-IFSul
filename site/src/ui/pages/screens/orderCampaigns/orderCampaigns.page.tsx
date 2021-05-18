import React, { useEffect, useState } from "react";
import { useCampaign } from "../../../../hooks";

import { Header, FabButton, CampaignCard } from "../../../components";

import { FilterCampaings } from "../../components";

import * as S from "./orderCampaigns.style";

export const OrderCampaigns = () => {
  const { listAndFilterCampaigns } = useCampaign();

  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const ListAll = async () => {
      const { data, status } = await listAndFilterCampaigns();
      if (status === 200) setCampaigns(data);
    };
    ListAll();
  }, []);

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Main>
            <FilterCampaings setFilter={setFilter} />
            <S.ContentList>
              <S.WrapperCampaings>
                {campaigns.map((campaign: any, key) => (
                  <CampaignCard
                    key={key}
                    id={campaign?.id}
                    goal={campaign?.goal}
                    title={campaign?.title}
                    avatar={campaign?.avatar}
                    priority={campaign?.priority}
                    bloodType={campaign?.bloodType}
                    availableDate={campaign?.availableDate}
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

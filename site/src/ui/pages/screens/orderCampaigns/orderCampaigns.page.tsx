import React, { useEffect, useState } from "react";
import { useCampaign } from "../../../../hooks";

import { Header, FabButton, CampaignCard } from "../../../components";

import { FilterCampaings } from "../../components";

import * as S from "./orderCampaigns.style";

export const OrderCampaigns = () => {
  const { listAndFilterCampaigns } = useCampaign();

  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const e = await listAndFilterCampaigns();
      if (e.status === 200) setCampaigns(e.data);
    };
    fetchCampaigns();
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
                {campaigns.map((campaign: any) => (
                  <CampaignCard
                    key={campaign.id}
                    id={campaign?.id}
                    title={campaign?.title}
                    avatar={campaign?.avatar}
                    priority={campaign?.priority}
                    bloodType={campaign?.bloodType}
                    currentGoal={campaign?.currentGoal}
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

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCampaign } from "../../../../hooks";

import { Header, FabButton, CampaignCard, Loader } from "../../../components";

import { FilterCampaings, WaitingAnimation } from "../../components";

import * as S from "./orderCampaigns.style";

export const OrderCampaigns = () => {
  const { push } = useHistory();
  const { listAndFilterCampaigns } = useCampaign();

  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const response = await listAndFilterCampaigns(filter);
      if (response.status === 200) {
        setCampaigns(response.data);
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, [filter]);

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Main>
            <FilterCampaings setFilter={setFilter} />
            <S.ContentList>
              {isLoading ? (
                <Loader />
              ) : campaigns.length > 0 ? (
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
                      onClick={() => push(`/detalhes-campanha/${campaign.id}`)}
                    />
                  ))}
                </S.WrapperCampaings>
              ) : (
                <WaitingAnimation message="Não há nenhuma campanha de doação com essas características." />
              )}
            </S.ContentList>
          </S.Main>
        </S.Content>
      </S.Container>
      <FabButton url="criar-campanha" />
    </>
  );
};

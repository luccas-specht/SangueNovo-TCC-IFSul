import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { toastConfig } from "../../../../configs";
import { useCampaign, useAuthenticated } from "../../../../hooks";

import {
  CampaignCard,
  Loader,
  CampaignRequestedCard,
} from "../../../components";

import { WaitingAnimation } from "../../components";

import * as S from "./manageCampaigns.style";

export const ManageCampaigns = () => {
  const { listCampaignsByCampaignStatus } = useCampaign();
  const { user } = useAuthenticated();
  const { push } = useHistory();

  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<boolean>(true);

  useEffect(() => {
    const handleListCampaign = async () => {
      setIsLoading(true);
      const { data, status } = await listCampaignsByCampaignStatus(
        user?.user?.id,
        tabActive ? "Ativo" : "Solicitado"
      );
      status === 200
        ? setUserCampaigns(data)
        : toast.error(`${data?.message}`, toastConfig);
      setIsLoading(false);
    };
    handleListCampaign();
  }, [tabActive, user, user?.user?.id]);

  const renderTab = useCallback(
    () => (
      <S.Ul active={tabActive}>
        <button onClick={() => setTabActive(true)}>
          <li>Ativas</li>
        </button>
        <button onClick={() => setTabActive(false)}>
          <li>Solicitadas</li>
        </button>
      </S.Ul>
    ),
    [tabActive]
  );

  const renderCampaigns = useCallback(() => {
    return (
      <S.Main>
        <S.ContentList>
          {renderTab()}
          <S.WrapperCampaings>
            {userCampaigns.length > 0 ? (
              userCampaigns.map((campaign: any) =>
                tabActive ? (
                  <CampaignCard
                    key={campaign.id}
                    id={campaign?.id}
                    title={campaign?.title}
                    avatar={campaign?.avatar}
                    priority={campaign?.priority}
                    bloodType={campaign?.bloodType}
                    currentGoal={campaign?.currentGoal}
                    availableDate={campaign?.availableDate}
                    buttonName="Visualizar campanha"
                    onClick={() => push(`/detalhes-campanha/${campaign.id}`)}
                  />
                ) : (
                  <CampaignRequestedCard
                    key={campaign.id}
                    id={campaign?.id}
                    title={campaign?.title}
                    avatar={campaign?.avatar}
                    priority={campaign?.priority}
                    bloodType={campaign?.bloodType}
                    description={campaign?.description}
                    availableDate={campaign?.availableDate}
                  />
                )
              )
            ) : (
              <S.WrapperAnimation>
                <WaitingAnimation
                  message={
                    tabActive
                      ? "Sem campanhas ativas no momento, crie uma campanha de doação ou veja suas solicitações."
                      : "Sem campanhas solicitadas aguarte até que um doador crie uma campanha ou crie uma campanha de doação!"
                  }
                />
              </S.WrapperAnimation>
            )}
          </S.WrapperCampaings>
        </S.ContentList>
      </S.Main>
    );
  }, [userCampaigns, renderTab, push, tabActive]);

  return (
    <>
      <ToastContainer />
      <S.Container>
        {isLoading ? (
          <S.Main>
            <S.ContentList>
              <Loader />
            </S.ContentList>
          </S.Main>
        ) : (
          renderCampaigns()
        )}
      </S.Container>
    </>
  );
};

import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { toastConfig } from "../../../../configs";
import {
  useCampaign,
  useAuthenticated,
  useInstitution,
} from "../../../../hooks";

import { Header, FabButton, CampaignCard, Loader } from "../../../components";

import { WaitingAnimation } from "../../components";

import * as S from "./manageCampaigns.style";

export const MangeCampaigns = () => {
  const { listCampaignsByUserId } = useCampaign();
  const { listRequestedCampaigns } = useInstitution();

  const { user } = useAuthenticated();
  const { push } = useHistory();

  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<boolean>(true);

  useEffect(() => {
    const handleListCampaign = async () => {
      setIsLoading(true);
      const { data, status } = await listCampaignsByUserId(user.user.userId);
      status === 200
        ? setUserCampaigns(data)
        : toast.error(`${data?.message}`, toastConfig);
      setIsLoading(false);
    };
    handleListCampaign();
  }, []);

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
    return userCampaigns.length > 0 ? (
      <S.Main>
        <S.ContentList>
          {!user.user.isDonator && renderTab()}
          <S.WrapperCampaings>
            {userCampaigns.map((campaign: any) => (
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
            ))}
          </S.WrapperCampaings>
        </S.ContentList>
      </S.Main>
    ) : (
      <WaitingAnimation
        message="Sem campanhas ativas no momento, espere a instituição responsável
        aprovar ou crie uma campanha de doação."
      />
    );
  }, [userCampaigns, user?.user?.isDonator, renderTab, push]);

  return (
    <>
      <ToastContainer />
      <Header />
      <S.Container>{isLoading ? <Loader /> : renderCampaigns()}</S.Container>
      <FabButton />
    </>
  );
};

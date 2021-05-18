import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "react-lottie";

import { toastConfig } from "../../../../configs";
import { useCampaign, useAuthenticated } from "../../../../hooks";

import { Header, FabButton } from "../../../components";
import animation from "../../../assets/animations/animation_waiting_approve_campaign.json";

import * as S from "./listMyCampaigns.style";

export const ListMyCampaigns = () => {
  const { listCampaignsByUserId } = useCampaign();
  const { user } = useAuthenticated();

  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<boolean>(true);

  const optionsConfig = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: animation,
    }),
    []
  );

  useEffect(() => {
    const handleListCampaign = async () => {
      setIsLoading(true);
      const { data, status } = await listCampaignsByUserId(user.user.userId);
      setIsLoading(false);
      status === 200
        ? setUserCampaigns(data)
        : toast.error(`${data?.message}`, toastConfig);
    };
    handleListCampaign();
  }, [user.user.userId]);

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
    return userCampaigns.length === 0 ? (
      <S.Main>
        <S.ContentList>{!user.user.isDonator && renderTab()}</S.ContentList>
      </S.Main>
    ) : (
      <S.AnimationContent>
        <S.AnimationWrapper>
          <Lottie options={optionsConfig} isClickToPauseDisabled />
        </S.AnimationWrapper>
        <S.TextInfo>
          Sem campanhas ativas no momento, espere a instituição responsável
          aprovar ou crie uma campanha de doação.
        </S.TextInfo>
      </S.AnimationContent>
    );
  }, [userCampaigns, optionsConfig, user.user.isDonator, renderTab]);

  return (
    <>
      <ToastContainer />
      <Header />
      <S.Container>{isLoading ? <div /> : renderCampaigns()}</S.Container>
      <FabButton />
    </>
  );
};

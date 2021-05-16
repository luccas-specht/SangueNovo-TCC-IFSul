import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "react-lottie";

import { toastConfig } from "../../../../configs";
import { useCampaign, useAuthenticated } from "../../../../hooks";

import { Header, FabButton } from "../../../components";
import animation from "../../../assets/animations/animation_waiting_approve_campaign.json";

import * as S from "./listMyCampaign.style";

export const ListMyCampaigns = () => {
  const { listCampaignsByUserId } = useCampaign();
  const { user } = useAuthenticated();

  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);

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
      const { data, status } = await listCampaignsByUserId(user.user.userId);
      status === 200
        ? setUserCampaigns(data)
        : toast.error(`${data?.message}`, toastConfig);
    };
    handleListCampaign();
  }, [user.user.userId]);

  const renderCampaigns = useCallback(() => {
    return userCampaigns.length > 0 ? (
      <h1>oie</h1>
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
  }, [userCampaigns, optionsConfig]);

  console.log("userCampaigns", userCampaigns);

  return (
    <>
      <ToastContainer />
      <Header />
      <S.Container>{renderCampaigns()}</S.Container>
      <FabButton />
    </>
  );
};

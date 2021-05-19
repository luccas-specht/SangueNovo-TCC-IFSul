import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { toastConfig } from "../../../../configs";
import { useCampaign, useAuthenticated } from "../../../../hooks";

import { Header, FabButton } from "../../../components";

import { WaitingAnimation } from "../../components";

import * as S from "./listMyCampaigns.style";

export const ListMyCampaigns = () => {
  const { listCampaignsByUserId } = useCampaign();
  const { user } = useAuthenticated();

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
        <S.ContentList>{!user.user.isDonator && renderTab()}</S.ContentList>
      </S.Main>
    ) : (
      <WaitingAnimation
        message="Sem campanhas ativas no momento, espere a instituição responsável
        aprovar ou crie uma campanha de doação."
      />
    );
  }, [userCampaigns, user.user.isDonator, renderTab]);

  return (
    <>
      <ToastContainer />
      <Header />
      <S.Container>{isLoading ? <div /> : renderCampaigns()}</S.Container>
      <FabButton />
    </>
  );
};

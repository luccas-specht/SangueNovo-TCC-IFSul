import React, { useCallback, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import { toastConfig } from "../../../../configs";

import { useCampaign, useAuthenticated } from "../../../../hooks";

import { Header, FabButton } from "../../../components";

export const ListMyCampaigns = () => {
  const { listCampaignsByUserId } = useCampaign();
  const { user } = useAuthenticated();

  const [userCampaigns, setUserCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const handleListCampaign = async () => {
      const { data, status } = await listCampaignsByUserId(user.user.userId);
      if (status === 200) {
        setUserCampaigns(data);
      } else {
        toast.error(`${data?.message}`, toastConfig);
      }
    };
    handleListCampaign();
  }, [listCampaignsByUserId, user.user.userId]);

  const renderCampaigns = useCallback(() => {
    return userCampaigns.length > 0 ? <h1>sim</h1> : <h1>not</h1>;
  }, [userCampaigns]);

  return (
    <>
      <ToastContainer />
      <Header />
      {renderCampaigns()}
      <FabButton />
    </>
  );
};

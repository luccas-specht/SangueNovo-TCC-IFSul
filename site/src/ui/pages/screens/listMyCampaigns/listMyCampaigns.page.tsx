import React from "react";

import { useAuthenticated } from "../../../../hooks";
import { Header, FabButton } from "../../../components";

import { DonatorCampaigns, ManageCampaigns } from "../../components";

import * as S from "./listMyCampaigns.style";

export const ListMyCampaigns = () => {
  const { user } = useAuthenticated();
  return (
    <>
      <Header />
      <S.Container>
        {user?.user?.isDonator ? <DonatorCampaigns /> : <ManageCampaigns />}
      </S.Container>
      <FabButton />
    </>
  );
};

import { useRequest } from "../useRequest/useRequest.hook";

export const useInstitution = () => {
  const { put, get, patch } = useRequest("/institution");

  const listInstitution = async (): Promise<any> => {
    const { data, status } = await get("list");
    return { data, status };
  };

  const listRequestedCampaigns = async (
    institutionId: string
  ): Promise<any> => {
    const { data, status } = await get(`list/campaigns/${institutionId}`);
    return { data, status };
  };

  const updateInstitutionProfile = async (
    razaoSocial: string | null,
    phone: string | null,
    password: string | null,
    cep: string | null,
    userId: string | null
  ): Promise<any> => {
    const { data, status } = await put("profile", {
      razaoSocial: razaoSocial,
      phone: phone,
      password: password,
      cep: cep,
      userId: userId,
    });
    return { data, status };
  };

  const updateStatusCampaign = async (
    institutionId: string,
    campaignId: string,
    newStatus: string
  ): Promise<any> => {
    const { data, status } = await patch("update/campaign", {
      institution_id: institutionId,
      campaign_id: campaignId,
      new_status: newStatus,
    });
    return { data, status };
  };

  return {
    listInstitution,
    listRequestedCampaigns,
    updateInstitutionProfile,
    updateStatusCampaign,
  };
};

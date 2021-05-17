import { useRequest } from "../useRequest/useRequest.hook";

export const useInstitution = () => {
  const { put, get } = useRequest("/institution");

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

  return {
    listInstitution,
    listRequestedCampaigns,
    updateInstitutionProfile,
  };
};

import { useRequest } from "../useRequest/useRequest.hook";

export const useCampaign = () => {
  const { post, get } = useRequest("/campaign");

  const registerCampaign = async (
    title: string,
    description: string,
    availableDate: string,
    priority: any,
    bloodType: any,
    goal: string,
    userId: any,
    institutionId: any
  ): Promise<any> => {
    const { data, status } = await post("", {
      title: title,
      description: description,
      availableDate: new Date(availableDate),
      priority: priority,
      typeBlood: bloodType,
      goal: parseFloat(goal),
      user_id: userId,
      institution_id: institutionId,
    });
    return { data, status };
  };

  const listAndFilterCampaigns = async (query?: string): Promise<any> => {
    const newQuery = query ? query.replace("&", "") : "";

    const { data, status } = await get(`list/order?${newQuery}`);
    return { data, status };
  };

  const listCampaignsByUserId = async (user_id: string): Promise<any> => {
    const { data, status } = await get(`list/${user_id}`);
    return { data, status };
  };

  const getCampaignById = async (campaign_id: string): Promise<any> => {
    const { data, status } = await get(`${campaign_id}`);
    return { data, status };
  };

  const listCampaignsByCampaignStatus = async (
    campaign_id: string,
    campaign_status: string
  ): Promise<any> => {
    const { data, status } = await get(
      `/list/status/${campaign_id}/${campaign_status}`
    );
    return { data, status };
  };

  return {
    registerCampaign,
    listCampaignsByUserId,
    listAndFilterCampaigns,
    getCampaignById,
    listCampaignsByCampaignStatus,
  };
};

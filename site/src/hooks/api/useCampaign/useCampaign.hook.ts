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

  const listAndFilterCampaigns = async (): Promise<any> => {
    const { data, status } = await get(`list/order`, {
      bloodTypes: ["A+"],
      institutionId: "",
      priorities: ["Alta"],
      title: "",
    });
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

  return {
    registerCampaign,
    listCampaignsByUserId,
    listAndFilterCampaigns,
    getCampaignById,
  };
};

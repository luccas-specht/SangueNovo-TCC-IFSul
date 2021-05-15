import { useRequest } from "../useRequest/useRequest.hook";

export const useCampaign = () => {
  const { post } = useRequest("");

  const registerCampaign = async (
    title: string,
    description: string,
    availableDate: any,
    priority: any,
    bloodType: any,
    goal: string,
    userId: any,
    institutionId: any
  ): Promise<any> => {
    const { data, status } = await post("campaign", {
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

  return {
    registerCampaign,
  };
};

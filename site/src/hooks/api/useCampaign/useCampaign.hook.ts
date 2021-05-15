import { useRequest } from "../useRequest/useRequest.hook";

export const useCampaign = () => {
  const { post } = useRequest("");

  const registerCampaign = async (
    title: string,
    description: string,
    availableDate: Date,
    priority: string,
    typeBlood: string,
    goal: string,
    user_id: string,
    institution_id: string
  ): Promise<any> => {
    const { data, status } = await post("campaign", {
      title: title,
      description: description,
      availableDate: availableDate,
      priority: priority,
      typeBlood: typeBlood,
      goal: parseFloat(goal),
      user_id: user_id,
      institution_id: institution_id,
    });
    return { data, status };
  };

  return {
    registerCampaign,
  };
};

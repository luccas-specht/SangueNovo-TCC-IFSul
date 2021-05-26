import { useRequest } from "../useRequest/useRequest.hook";

export const useDonation = () => {
  const { post } = useRequest("/donation");

  const createAppointment = async (
    appointment: string,
    campaignId: string,
    donatorId: string
  ): Promise<any> => {
    const { data, status } = await post("appointment", {
      appointment: appointment,
      donatorId: donatorId,
      campaignId: campaignId,
    });
    return { data, status };
  };

  return {
    createAppointment,
  };
};

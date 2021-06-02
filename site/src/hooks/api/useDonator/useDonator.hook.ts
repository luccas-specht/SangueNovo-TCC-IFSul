import { useRequest } from "../useRequest/useRequest.hook";

export const useDonator = () => {
  const { get } = useRequest("/donator");

  const listAppointmentByDonatorId = async (
    donatorId: string
  ): Promise<any> => {
    const { data, status } = await get(
      `appointment/me?donator_id=${donatorId}`
    );
    return { data, status };
  };

  const listDonationsByDonatorId = async (donatorId: string): Promise<any> => {
    const { data, status } = await get(`donation/me?donator_id=${donatorId}`);
    return { data, status };
  };

  return {
    listAppointmentByDonatorId,
    listDonationsByDonatorId,
  };
};

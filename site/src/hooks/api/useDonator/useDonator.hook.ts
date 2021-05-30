import { useRequest } from "../useRequest/useRequest.hook";

export const useDonator = () => {
  const { get } = useRequest("/donator");

  const listDonationsByDonatorId = async (donatorId: string): Promise<any> => {
    const { data, status } = await get(`donation/me?donator_id=${donatorId}`);
    return { data, status };
  };

  return {
    listDonationsByDonatorId,
  };
};

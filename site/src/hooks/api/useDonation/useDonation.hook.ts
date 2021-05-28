import { useRequest } from "../useRequest/useRequest.hook";

export const useDonation = () => {
  const { post, get } = useRequest("/donation");

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

  const listAllAppointments = async (
    day: number,
    month: number,
    year: number,
    appointmentStatus: string
  ): Promise<any> => {
    const { data, status } = await get(
      `appointment/me?day=${day}&month=${month}&year=${year}&status=${appointmentStatus}`
    );
    return { data, status };
  };

  return {
    createAppointment,
    listAllAppointments,
  };
};

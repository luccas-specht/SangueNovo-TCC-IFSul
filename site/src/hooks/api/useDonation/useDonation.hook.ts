import { useRequest } from "../useRequest/useRequest.hook";

export const useDonation = () => {
  const { post, get, patch } = useRequest("/donation");

  const createAppointment = async (
    appointment: string,
    campaignId: string,
    donatorId: string,
    institutionId: string
  ): Promise<any> => {
    const { data, status } = await post("appointment", {
      appointment: appointment,
      donatorId: donatorId,
      campaignId: campaignId,
      institutionId: institutionId,
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

  const updateAppointmentStatus = async (
    donatitonId: string,
    donatorId: string,
    donatitonStatus: string
  ): Promise<any> => {
    const { data, status } = await patch("appointment/update/status", {
      donation_id: donatitonId,
      donator_id: donatorId,
      donation_status: donatitonStatus,
    });
    return { data, status };
  };

  return {
    createAppointment,
    listAllAppointments,
    updateAppointmentStatus,
  };
};

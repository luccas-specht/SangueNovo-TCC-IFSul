import { useCallback, useEffect, useState } from "react";
import { BiDonateBlood } from "react-icons/bi";
import {
  RiCalendarEventLine,
  RiMapPinLine,
  RiRoadMapLine,
} from "react-icons/ri";
import { FiCheckCircle, FiHome, FiMapPin } from "react-icons/fi";

import { format, parseISO } from "date-fns";

import { useAuthenticated } from "../../../../hooks";
import { useDonator } from "../../../../hooks/api/useDonator/useDonator.hook";
import { Header, FabButton } from "../../../components";
import { WaitingAnimation } from "../../components";
import defaultCampaignImage from "../../../assets/images/default_campaign_image.png";

import * as S from "./donatorAppointments.style";
import { FaMapMarker, FaMapMarkerAlt } from "react-icons/fa";

interface Appointment {
  status: string;
  appointment_date: string;
  donator: {
    name: string;
  };
  campaign: {
    title: string;
    description: string;
    bloodType: string;
    institution: {
      razao_social: string;
      latitude: number;
      longitude: number;
    };
  };
}

export const DonatorAppointments = () => {
  const [donations, setDonations] = useState<Appointment[]>([]);
  const { listAppointmentByDonatorId } = useDonator();
  const { user } = useAuthenticated();

  useEffect(() => {
    const callApi = async () => {
      const { data, status } = await listAppointmentByDonatorId(user.user.id);
      status === 200
        ? setDonations(data)
        : console.log("erro ao setar os appointments");
    };
    callApi();
  }, []);

  const orderAppointments = useCallback(
    (appointments: Appointment[]) =>
      appointments.sort((app) => (app.status === "Ativo" ? -1 : 1)),
    []
  );

  return (
    <>
      <S.Container>
        {donations.length > 0 ? (
          <S.Main>
            <S.ContentList>
              <S.WrapperCampaings>
                {orderAppointments(donations).map((donation) => (
                  <S.DonationCard isFinished={donation.status === "Finalizado"}>
                    <S.Content>
                      <S.Location
                        isFinished={donation.status === "Finalizado"}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${donation.campaign.institution.latitude}, ${donation.campaign.institution.longitude} `}
                      >
                        <FaMapMarkerAlt size={60} color="#BF0404" />
                      </S.Location>

                      <S.Wrapper>
                        <strong>{donation.campaign.title}</strong>
                        <S.Description>
                          {donation.campaign.description}
                        </S.Description>
                        <S.Details>
                          <S.Info color="#666360">
                            <FiHome size={20} />
                            {donation.campaign.institution.razao_social}
                          </S.Info>
                          <S.Info color="#F9AF42">
                            <RiCalendarEventLine size={20} />
                            {format(
                              parseISO(donation.appointment_date),
                              "dd/MM - HH:mm"
                            )}
                          </S.Info>
                          <S.Info color="#6DBA73">
                            <FiCheckCircle size={20} />
                            {donation.status}
                          </S.Info>
                          <S.Info color="#BF0404">
                            <BiDonateBlood size={20} />
                            {donation.campaign.bloodType}
                          </S.Info>
                        </S.Details>
                      </S.Wrapper>
                    </S.Content>
                  </S.DonationCard>
                ))}
              </S.WrapperCampaings>
            </S.ContentList>
          </S.Main>
        ) : (
          <WaitingAnimation message="Sem agendamentos no momento, espere a instituição responsável aprovar ou solicite um novo agendamento." />
        )}
      </S.Container>
    </>
  );
};

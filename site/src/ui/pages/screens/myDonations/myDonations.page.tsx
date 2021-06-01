import { useEffect, useState } from "react";
import { useAuthenticated } from "../../../../hooks";
import { useDonator } from "../../../../hooks/api/useDonator/useDonator.hook";
import { Header, FabButton } from "../../../components";
import { WaitingAnimation } from "../../components";

import defaultCampaignImage from "../../../assets/images/default_campaign_image.png";

import * as S from "./myDonations.styled";
import { format, parseISO } from "date-fns";
import { BiDonateBlood } from "react-icons/bi";
import { RiCalendarEventLine } from "react-icons/ri";
import { FiCheckCircle, FiHome } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";

interface Donation {
  status: string;
  donator: {
    name: string;
    date_last_donation: string;
  };
  campaign: {
    avatar: string;
    title: string;
    description: string;
    bloodType: string;
    institution: {
      razaoSocial: string;
    };
  };
}

export const MyDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const { listDonationsByDonatorId } = useDonator();
  const { user } = useAuthenticated();

  useEffect(() => {
    const callApi = async () => {
      const { data, status } = await listDonationsByDonatorId(user.user.id);
      status === 200
        ? setDonations(data)
        : console.log("erro ao setar as donations");
    };
    callApi();
  }, []);

  return (
    <>
      <Header />
      <S.Container>
        {donations.length > 0 ? (
          <S.Main>
            <S.ContentList>
              <S.WrapperCampaings>
                {donations.map((donation) => (
                  <S.DonationCard>
                    <S.Content>
                      <img
                        src={donation.campaign.avatar || defaultCampaignImage}
                        alt={donation.campaign.title}
                      />
                      <S.Wrapper>
                        <strong>{donation.campaign.title}</strong>
                        <S.Description>
                          {donation.campaign.description}
                        </S.Description>
                        <S.Details>
                          <S.Info color="#F9AF42">
                            <RiCalendarEventLine size={20} />
                            {format(
                              parseISO(donation.donator.date_last_donation),
                              "dd/MM - HH:mm"
                            )}
                          </S.Info>
                          <S.Info color="#666360">
                            <FiHome size={20} />
                            {donation.campaign.institution.razaoSocial}
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
          <WaitingAnimation
            message={`Parece que você não realizou nenhuma doação procure por campanhas de doações em, Listar Campanhas, selecione alguma para doar e ajude a salvar pessoas!`}
          />
        )}
      </S.Container>
      <FabButton />
    </>
  );
};

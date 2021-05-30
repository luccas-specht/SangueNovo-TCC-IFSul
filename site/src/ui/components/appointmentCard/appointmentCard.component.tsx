import { useCallback } from "react";
import { FiClock } from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";

import imageDefaultProfile from "../../assets/images/default_user_image.png";

import * as S from "./appointmentCard.style";

type Props = {
  id: string;
  hourFormatted: string;
  donator: {
    name: string;
    id: string;
    avatar?: string | null;
  };
  campaign: {
    title: string;
    priority: string;
    bloodType: string;
    avatar: string;
  };
};

export const AppointmentCard = ({
  donator,
  campaign,
  hourFormatted,
  id,
}: Props) => {
  const renderPriority = useCallback(() => {
    const COLOR = {
      Alta: "#BF0404",
      Media: "#FF9000",
      Baixa: "#6DBA73",
    } as any;

    return (
      <S.ContentPriority
        color={COLOR[campaign.priority]}
        high={campaign.priority === "Alta"}
      >
        Urgência:
        <span>
          {campaign.priority}
          {campaign.priority === "Alta" && <IoMdAlert size={22} />}
        </span>
      </S.ContentPriority>
    );
  }, [campaign.priority]);

  return (
    <S.Appointment key={id}>
      <S.Content>
        <div>
          <span>
            <FiClock size={20} width={20} height={20} />
            {hourFormatted}
          </span>
          <S.WrapperImg>
            <img
              src={donator.avatar ?? imageDefaultProfile}
              alt={donator.name}
            />
            <strong>{donator.name}</strong>
          </S.WrapperImg>
        </div>
        <S.WrapperCampaign>
          <S.Title>{campaign.title}</S.Title>
          <S.WrapperInfo>
            <S.BloodType>
              Tipo de Sangue: <span>{campaign.bloodType}</span>
            </S.BloodType>
            {renderPriority()}
          </S.WrapperInfo>
        </S.WrapperCampaign>
      </S.Content>
    </S.Appointment>
  );
};

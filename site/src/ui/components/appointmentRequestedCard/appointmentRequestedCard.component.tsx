import { useCallback, useState } from "react";
import { FiClock } from "react-icons/fi";
import { IoIosArrowDown, IoMdAlert } from "react-icons/io";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import { toastConfig } from "../../../configs";
import { useDonation } from "../../../hooks";

import imageDefaultProfile from "../../assets/images/default_user_image.png";

import * as S from "./appointmentRequestedCard.style";

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

export const AppointmentRequestedCard = ({
  donator,
  campaign,
  hourFormatted,
  id,
}: Props) => {
  const [showButtons, setShowButtons] = useState(false);
  const { updateAppointmentStatus } = useDonation();
  const { push } = useHistory();

  const handleChangeAppointmentStatus = useCallback(
    async (donationStatus: "Recusado" | "Ativo") => {
      const { data, status } = await updateAppointmentStatus(
        id,
        donator.id,
        donationStatus
      );

      if (status === 200) {
        push("/listar-campanhas");
      } else {
        toast.error(`${data.message}`, toastConfig);
      }
    },
    [donator.id, id, push]
  );

  const renderButtons = useCallback(
    () =>
      showButtons && (
        <S.WrapperButtons>
          <S.StyledButton
            color="#FF9000"
            type="submit"
            onClick={() => {
              handleChangeAppointmentStatus("Recusado");
            }}
          >
            Recusar
          </S.StyledButton>
          <S.StyledButton
            color="#6DBA73"
            type="submit"
            onClick={() => {
              handleChangeAppointmentStatus("Ativo");
            }}
          >
            Aceitar
          </S.StyledButton>
        </S.WrapperButtons>
      ),
    [showButtons, handleChangeAppointmentStatus]
  );

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
    <S.Appointment key={id} isOpen={showButtons}>
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

      <S.Footer>
        <S.StyledButtonIcon
          isShowButton={showButtons}
          onClick={() => setShowButtons(!showButtons ?? false)}
        >
          <IoIosArrowDown size={23} />
        </S.StyledButtonIcon>
        {renderButtons()}
      </S.Footer>
    </S.Appointment>
  );
};

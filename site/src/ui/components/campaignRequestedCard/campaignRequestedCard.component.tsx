import { useCallback, useState } from "react";
import { IoMdAlert, IoIosArrowDown } from "react-icons/all";
import { ToastContainer, toast } from "react-toastify";

import { format } from "date-fns";

import { useAuthenticated, useInstitution } from "../../../hooks";
import { toastConfig } from "../../../configs";

import defaultCampaignImage from "../../assets/images/default_campaign_image.png";

import * as S from "./campaignRequestedCard.style";

type Props = {
  id: string;
  title: string;
  avatar: string | null;
  availableDate: string;
  bloodType: string;
  priority: string;
  description: string;
};

export const CampaignRequestedCard = ({
  id,
  title,
  avatar,
  availableDate,
  bloodType,
  priority,
  description,
}: Props) => {
  const [showButtons, setShowButtons] = useState(false);
  const { updateStatusCampaign } = useInstitution();
  const { user } = useAuthenticated();

  const dateFormat = useCallback(
    (date: any) => format(new Date(date), "dd/MM/yyyy"),
    []
  );

  const renderPriority = useCallback(() => {
    const COLOR = {
      Alta: "#BF0404;",
      Media: "#FF9000 ",
      Baixa: "#6DBA73",
    } as any;

    return (
      <S.ContentPriority color={COLOR[priority]} high={priority === "Alta"}>
        <span>
          Urgência: {priority}
          {priority === "Alta" && <IoMdAlert size={22} />}
        </span>
      </S.ContentPriority>
    );
  }, [priority]);

  const handleUpdateCampaignStatus = useCallback(
    async (campaignStatus: "Ativo" | "Recusado") => {
      const { status, data } = await updateStatusCampaign(
        user?.user?.id,
        id,
        campaignStatus
      );
      if (status === 200) {
        console.log("atualizar o pai");
      } else {
        toast.error(`${data?.message}`, toastConfig);
      }
    },
    [id, user?.user?.id, updateStatusCampaign]
  );

  const renderButtons = useCallback(
    () =>
      showButtons ? (
        <S.WrapperButtons>
          <S.StyledButton
            color="#FF9000"
            type="submit"
            onClick={() => handleUpdateCampaignStatus("Recusado")}
          >
            Recusar
          </S.StyledButton>
          <S.StyledButton
            color="#6DBA73"
            type="submit"
            onClick={() => handleUpdateCampaignStatus("Ativo")}
          >
            Aceitar
          </S.StyledButton>
        </S.WrapperButtons>
      ) : null,
    [showButtons, handleUpdateCampaignStatus]
  );

  return (
    <>
      <ToastContainer />
      <S.CardContainer isShowButton={showButtons}>
        <S.Content>
          <S.Left>
            <img src={avatar ?? defaultCampaignImage} alt={title} />
          </S.Left>
          <S.Right>
            <S.Wrapper>
              <S.WrapperContent>
                <div>
                  <S.Title>{title}</S.Title>
                  <S.Description>{description}</S.Description>
                </div>
                <S.CampaignDetails>
                  <div>
                    <S.Date>{dateFormat(availableDate)}</S.Date>
                    Data final
                  </div>
                  {renderPriority()}
                  <S.BloodType>
                    Tipo de Sangue: <span>{bloodType}</span>
                  </S.BloodType>
                </S.CampaignDetails>
              </S.WrapperContent>
            </S.Wrapper>
            <S.Footer>
              <S.StyledButtonIcon
                isShowButton={showButtons}
                onClick={() => setShowButtons(!showButtons ?? false)}
              >
                <IoIosArrowDown size={23} />
              </S.StyledButtonIcon>
              {renderButtons()}
            </S.Footer>
          </S.Right>
        </S.Content>
      </S.CardContainer>
    </>
  );
};

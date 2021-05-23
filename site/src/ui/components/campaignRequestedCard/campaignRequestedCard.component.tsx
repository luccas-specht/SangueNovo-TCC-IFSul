import { useCallback, useState } from "react";
import { IoMdAlert, IoIosArrowDown } from "react-icons/all";

import { format } from "date-fns";

import defaultCampaignImage from "../../assets/images/default_campaign_image.png";

import { Button } from "..";

import * as S from "./campaignRequestedCard.style";

type Props = {
  id: string;
  title: string;
  avatar: string | null;
  availableDate: string;
  bloodType: string;
  priority: string;
};

export const CampaignRequestedCard = ({
  id,
  title,
  avatar,
  availableDate,
  bloodType,
  priority,
}: Props) => {
  const [showButtons, setShowButtons] = useState(false);

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

  const renderButtons = useCallback(
    () => (
      <>
        <button>Recusar</button>
        <button>Aceitar</button>
      </>
    ),
    []
  );

  return (
    <S.CardContainer isShowButton={showButtons}>
      <S.Content>
        <S.Left>
          <img src={avatar ?? defaultCampaignImage} alt={title} />
        </S.Left>
        <S.Right>
          <S.Wrapper>
            <S.WrapperContent>
              <S.Title>{title}</S.Title>
              <S.CampaignDetails>
                <div>
                  <S.Date>{dateFormat(availableDate)}</S.Date>
                  Data final
                </div>
                {renderPriority()}
                <S.BloodType>Tipo de Sangue: {bloodType}</S.BloodType>
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
          </S.Footer>
        </S.Right>
      </S.Content>
    </S.CardContainer>
  );
};

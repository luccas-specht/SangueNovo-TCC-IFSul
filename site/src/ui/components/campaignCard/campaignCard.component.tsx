import { useCallback, useState } from "react";
import { IoMdAlert, IoIosArrowDown } from "react-icons/all";

import { format } from "date-fns";

import defaultCampaignImage from "../../assets/images/default_campaign_image.png";

import { Button } from "..";

import * as S from "./campaignCard.style";

type Props = {
  id: string;
  title: string;
  avatar: string | null;
  currentGoal: string;
  availableDate: string;
  bloodType: string;
  priority: string;
  onClick: () => void;
  buttonName?: string;
};

export const CampaignCard = ({
  id,
  title,
  avatar,
  currentGoal,
  availableDate,
  bloodType,
  priority,
  onClick,
  buttonName = "Quero doar",
}: Props) => {
  const [showButton, setShowButton] = useState(false);

  const dateFormat = useCallback(
    (date: any) => format(new Date(date), "dd/MM/yyyy"),
    []
  );

  const renderPriority = useCallback(() => {
    const colors = {
      Alta: "#BF0404;",
      Média: "#FF9000 ",
      Baixa: "#6DBA73",
    } as any;

    return (
      <S.ContentPriority color={colors[priority]} high={priority === "Alta"}>
        <span>
          Urgência: {priority}
          {priority === "Alta" && <IoMdAlert size={22} />}
        </span>
      </S.ContentPriority>
    );
  }, [priority]);

  const renderProgress = useCallback(
    () => (
      <S.ContentProgress>
        <S.Progress>
          <S.ProgressDone
            style={{
              opacity: 1,
              width: `${currentGoal}%`,
            }}
          >
            {currentGoal !== "0" && currentGoal}
          </S.ProgressDone>
          <span>Porcentagem de doação da campanha</span>
        </S.Progress>
        <S.StyledCurrentGoal>{currentGoal}%</S.StyledCurrentGoal>
      </S.ContentProgress>
    ),
    [currentGoal]
  );

  return (
    <S.CardContainer isShowButton={showButton}>
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
            {renderProgress()}
            <S.StyledButtonIcon
              isShowButton={showButton}
              onClick={() => setShowButton(!showButton ?? false)}
            >
              <IoIosArrowDown size={23} />
            </S.StyledButtonIcon>
            {showButton && <Button title={buttonName} onClick={onClick} />}
          </S.Footer>
        </S.Right>
      </S.Content>
    </S.CardContainer>
  );
};

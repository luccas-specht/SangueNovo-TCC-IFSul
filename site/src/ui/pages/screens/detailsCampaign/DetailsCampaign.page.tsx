import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { IoMdAlert } from "react-icons/all";

import { format } from "date-fns";

import L from "leaflet";

import { useCampaign } from "../../../../hooks";

import { Header, FabButton, Button } from "../../../components";

import mapMarker from "../../../assets/svgs/map_marker.svg";
import defaultCampaignImage from "../../../assets/images/default_campaign_image_details.png";

import * as S from "./DetailsCampaign.style";

export const DetailsCampaign = () => {
  const { campaign_id } = useParams<{ campaign_id: string }>();
  const { getCampaignById } = useCampaign();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [campaign, setCampaign] = useState({
    id: "",
    title: "",
    avatar: null,
    priority: "",
    bloodType: "",
    currentGoal: "",
    description: "",
    availableDate: "",
    institution: {
      id: "",
      razao_social: "",
      address: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const happyMapIcon = L.icon({
    iconUrl: mapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  useEffect(() => {
    setIsLoading(true);
    const getCampaign = async () => {
      const { data, status } = await getCampaignById(campaign_id);
      if (status === 200) {
        setCampaign({
          id: data?.id,
          title: data?.title,
          avatar: data?.avatar,
          priority: data?.priority,
          bloodType: data?.bloodType,
          currentGoal: data?.currentGoal,
          description: data?.description,
          availableDate: data?.availableDate,
          institution: data?.institution,
        });
      }
      setIsLoading(false);
    };
    getCampaign();
  }, []);

  const dateFormat = useCallback(
    () => format(new Date(campaign.availableDate), "dd/MM/yyyy"),
    [campaign.availableDate]
  );

  const renderPriority = useCallback(() => {
    const colors = {
      Alta: "#BF0404;",
      Média: "#FF9000 ",
      Baixa: "#6DBA73",
    } as any;

    return (
      <S.ContentPriority
        color={colors[campaign.priority]}
        high={campaign.priority === "Alta"}
      >
        <span>
          {campaign.priority}
          {campaign.priority === "Alta" && <IoMdAlert size={22} />}
        </span>
      </S.ContentPriority>
    );
  }, [campaign.priority]);

  const renderProgress = useCallback(
    () => (
      <S.ContentProgress>
        <S.Progress>
          <S.ProgressDone
            style={{
              opacity: 1,
              width: `${campaign.currentGoal}%`,
            }}
          >
            {campaign.currentGoal !== "0" && campaign.currentGoal}
          </S.ProgressDone>
          <span>Porcentagem de doação para campanha</span>
        </S.Progress>
        <S.StyledCurrentGoal>{campaign.currentGoal}%</S.StyledCurrentGoal>
      </S.ContentProgress>
    ),
    [campaign.currentGoal]
  );

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.Details>
            <img
              src={campaign.avatar ?? defaultCampaignImage}
              alt="imagem da campanha de doação de sangue"
            />
            <S.MainInformation>
              <S.Title>{campaign.title}</S.Title>
              <S.SubTitle>{campaign.institution?.razao_social}</S.SubTitle>
              <S.Agroup>
                <S.Date>
                  <span>{campaign?.availableDate && dateFormat()}</span>
                  Data final
                </S.Date>
                <S.BloodType>
                  <span>{campaign?.bloodType}</span>
                  Tipo de sangue
                </S.BloodType>
                <div>
                  {renderPriority()}
                  Urgência
                </div>
              </S.Agroup>
            </S.MainInformation>
            <S.Description>
              <strong>{campaign.description}</strong>
            </S.Description>
            {renderProgress()}
            <Button title="Quero Doar" type="button" />
          </S.Details>
        </S.Content>
        <S.Map>
          <MapContainer
            center={[-29.7499565, -51.1049697]}
            zoom={17}
            style={{ width: "100%", height: "100%" }}
            minZoom={7}
          >
            <Marker
              title={"merlin"}
              icon={happyMapIcon}
              position={[-29.7499565, -51.1049697]}
            />
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </MapContainer>
        </S.Map>
      </S.Container>
      <FabButton />
    </>
  );
};
import React from "react";
import * as SC from "./DetailsCaipaign.style";
import { Header } from "../../../components";
import { CampaignInfo } from "../../components/index";
import { MapContainer, TileLayer } from "react-leaflet";

export const DetailsCampaign = () => {
  return (
    <>
      <Header />
      <SC.Container>
        <SC.ContentCampaign>
          <CampaignInfo />
        </SC.ContentCampaign>
        <SC.ContentMap>
          <MapContainer
            center={[-29.8002396, -51.1271811]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </MapContainer>
        </SC.ContentMap>
      </SC.Container>
    </>
  );
};

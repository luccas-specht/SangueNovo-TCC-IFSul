import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

import mapMarker from "../../assets/svgs/map_marker.svg";

import * as S from "./locationMarker.style";

export const LocationMarker = () => {
  const [position, setPosition] = useState<any>(null);

  const happyMapIcon = L.icon({
    iconUrl: mapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [110, 0],
  });

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? (
    <S.Map>
      <Marker position={position} icon={happyMapIcon}>
        <Popup
          closeButton={false}
          minWidth={100}
          maxHeight={240}
          className="map-popup"
        >
          Sua posição
        </Popup>
      </Marker>
    </S.Map>
  ) : (
    <div />
  );
};

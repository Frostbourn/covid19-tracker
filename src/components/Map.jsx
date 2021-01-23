import React from "react";
import { MapContainer, useMap, TileLayer, Marker, Popup } from "react-leaflet";

function SetViewOnClick({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  map.setZoom(zoom);

  return null;
}

function Map({ data }) {
  return data.countryInfo ? (
    <div className="map">
      <MapContainer
        center={[data.countryInfo.lat, data.countryInfo.long]}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnClick
          coords={[data.countryInfo.lat, data.countryInfo.long]}
          zoom={5}
        />
      </MapContainer>
    </div>
  ) : (
    <div className="map">
      <MapContainer center={[52, 20]} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnClick coords={[52, 20]} zoom={3} />
      </MapContainer>
    </div>
  );
}

export default Map;

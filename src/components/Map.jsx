import React, { useEffect, useState } from "react";
import { MapContainer, useMap, TileLayer, Circle, Popup } from "react-leaflet";
import { fetchCountries } from "../api";
import { nFormat } from "../utils";

function SetViewOnClick({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);

  return null;
}

function Map({ data }) {
  const [activeCases, setActiveCases] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const sortedData = await fetchCountries();
      setActiveCases(sortedData);
    };
    fetchAPI();
  }, []);

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
        {activeCases.map((country, i) => (
          <Circle
            center={[country.lat, country.long]}
            fillOpacity={0.4}
            color="red"
            fillColor="red"
            radius={Math.sqrt(country.activeCases) * 300}
          >
            <Popup>
              <div className="info-container">
                <div
                  className="info-flag"
                  style={{ backgroundImage: `url(${country.flag})` }}
                ></div>
                <div className="info-name">
                  <strong>{country.name}</strong>
                </div>
                <div className="info-confirmed">
                  Cases: {nFormat(country.cases)}
                </div>
                <div className="info-recovered">
                  Recovered: {nFormat(country.recovered)}
                </div>
                <div className="info-deaths">
                  Deaths: {nFormat(country.deaths)}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
        <SetViewOnClick
          coords={[data.countryInfo.lat, data.countryInfo.long]}
          zoom={5}
        />
      </MapContainer>
    </div>
  ) : (
    <div className="map">
      <MapContainer center={[34.80746, -40.4796]} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {activeCases.map((country, i) => (
          <Circle
            center={[country.lat, country.long]}
            fillOpacity={0.4}
            color="red"
            fillColor="red"
            radius={Math.sqrt(country.activeCases) * 300}
          >
            <Popup>
              <div className="info-container">
                <div
                  className="info-flag"
                  style={{ backgroundImage: `url(${country.flag})` }}
                ></div>
                <div className="info-name">
                  <strong>{country.name}</strong>
                </div>
                <div className="info-confirmed">
                  Cases: {nFormat(country.cases)}
                </div>
                <div className="info-recovered">
                  Recovered: {nFormat(country.recovered)}
                </div>
                <div className="info-deaths">
                  Deaths: {nFormat(country.deaths)}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
        <SetViewOnClick coords={[34.80746, -40.4796]} zoom={2} />
      </MapContainer>
    </div>
  );
}

export default Map;

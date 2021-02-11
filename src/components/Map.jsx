import React from "react";
import { MapContainer, useMap, TileLayer, Circle, Popup } from "react-leaflet";
import { nFormat } from "../utils";

function SetViewOnClick({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);

  return null;
}
const Map = ({ data, lat, lng, zoom }) => {
  return data ? (
    <div className="map">
      <MapContainer center={[lat, lng]}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data &&
          !!data.length &&
          data.map((country, i) => (
            <Circle
              key={i}
              center={[country.lat, country.lng]}
              fillOpacity={0.4}
              stroke={false}
              fillColor="red"
              radius={Math.sqrt(country.activeCases) * 700}
            >
              <Popup>
                <div className="info-container">
                  <div className="info-name">
                    <img
                      src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${(country.code ||
                      data[0].countryCode
                        ? country.code || data[0].countryCode
                        : ""
                      ).toLowerCase()}.svg`}
                      width="20"
                      style={{ paddingRight: "5px" }}
                      alt="country-flag"
                    />
                    {country.name == null ? country.country : country.name}
                  </div>
                  <div className="info-confirmed">
                    Cases:{" "}
                    {nFormat(
                      country.cases == null
                        ? country.totalConfirmed
                        : country.cases
                    )}
                  </div>
                  <div className="info-recovered">
                    Recovered:{" "}
                    {nFormat(
                      country.recovered == null
                        ? country.totalRecovered
                        : country.recovered
                    )}
                  </div>
                  <div className="info-deaths">
                    Deaths:{" "}
                    {nFormat(
                      country.deaths == null
                        ? country.totalDeaths
                        : country.deaths
                    )}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        <SetViewOnClick coords={[lat, lng]} zoom={zoom} />
      </MapContainer>
    </div>
  ) : null;
};

export default Map;

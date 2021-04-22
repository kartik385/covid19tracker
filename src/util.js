import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "red",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 200,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "pink",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "yellow",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1500,
  },
};
export const showDataOnMap = (data, casesType) => {
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].rgb}
      fillColor={casesTypeColors[casesType].rgb}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};

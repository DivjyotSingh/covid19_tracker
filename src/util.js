import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import React from "react";
const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204,16,52)",
    half_op: "rgba(204,16,52,0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125,215,29)",
    half_op: "rgba(125,215,29,0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251,68,67)",
    half_op: "rgba(125,68,67,0.5)",
    multiplier: 2000,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
export const prettyPrintStat = (stat) =>
  stat
    ? `+${numeral(stat).format("0,0a")}`
    : `+${numeral(stat).format("0,0a")}`;
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info__container">
          <div
            className="info__flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info__name">{country.country}</div>
          <div className="info__confirmed">
            Cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="info__recovered">
            Recovered:{numeral(country.recovered).format("0,0")}
          </div>
          <div className="info__deaths">
            Deaths:{numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

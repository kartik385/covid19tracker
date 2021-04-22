import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import Graph from "./Graph";
import "leaflet/dist/leaflet.css";

//https://disease.sh/v3/covid-19/countries

function App() {
  let [countries, setCountries] = useState([]);
  let [country, setCountry] = useState("worldwide");
  let [countryInfo, setcountryInfo] = useState({});
  let [tableData, setTableData] = useState([]);
  let [caseType, setCaseType] = useState(`cases`);
  let [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 });
  let [mapCountries, setMapCountries] = useState([]);
  let [mapZoom, setMapZoom] = useState(3);
  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => setcountryInfo(data));
  }, []);

  useEffect(() => {
    const searchCountries = async () => {
      await fetch(`https://disease.sh/v3/covid-19/countries`)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          setMapCountries(data);
          setCountries(countries);
          setTableData(data);
        });
    };
    searchCountries();
  }, []);

  let changeCountry = (event) => {
    let countryCode = event.target.value;
    let url =
      countryCode === `worldwide`
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        countryCode === `worldwide`
          ? setMapCenter({ lat: 34.80746, lng: -40.4796 })
          : setMapCenter({
              lat: data.countryInfo.lat,
              lng: data.countryInfo.long,
            });
        setCountry(countryCode);
        setcountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        {/* header starts here */}
        <div className="app_header">
          <h1>Covid 19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={changeCountry}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* header ends here */}

        {/* info boxes stars here */}
        <div className="app_stats">
          <InfoBox
            onClick={(e) => setCaseType("cases")}
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            color="cases"
          />
          <InfoBox
            onClick={(e) => setCaseType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            color="recovered"
          />
          <InfoBox
            onClick={(e) => setCaseType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            color="deaths"
          />
        </div>

        {/* info boxes ends here */}
        <Map
          countries={mapCountries}
          casesType={caseType}
          center={mapCenter}
          zoom={mapZoom}
        />
        {/*map ends here*/}
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>Live cases by country</h2>
          <Table countries={tableData} />
          <h2>
            {countryInfo.country || `worldwide`} new {caseType}
          </h2>
          <Graph caseType={caseType} country={country} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

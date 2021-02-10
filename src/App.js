import React, { Suspense } from "react";

import Cards from "./components/Cards";
//import Chart from "./components/Chart";
import CountryPicker from "./components/CountryPicker";
import Map from "./components/Map";
import Table from "./components/Table";

import { Card, CardContent } from "@material-ui/core";

import "./App.css";
import "leaflet/dist/leaflet.css";

import { fetchCountries } from "./api";

// const Map = React.lazy(() => import("./components/Map"));

class App extends React.Component {
  state = {
    data: {},
    countryCode: "",
    countryName: "",
    dailyNewCases: "",
    totalCases: "",
    dailyNewDeaths: "",
    totalDeaths: "",
    lat: "34.80746",
    lng: "-40.4796",
    zoom: 2
  };

  async componentDidMount() {
    const data = await fetchCountries();

    this.setState({
      data: data[0],
      dailyNewCases: data[1].data.totalNewCases,
      totalCases: data[1].data.totalConfirmed,
      dailyNewDeaths: data[1].data.totalNewDeaths,
      totalDeaths: data[1].data.totalDeaths,
      dailyNewRecovered:
        data[1].data.totalNewCases - data[1].data.totalNewDeaths,
      totalRecovered: data[1].data.totalRecovered
    });
  }

  handleCountryChange = async (countryCode) => {
    const data = await fetchCountries(countryCode);
    this.setState({
      data: countryCode == null ? data[0] : data[2].data,
      dailyNewCases:
        countryCode == null
          ? data[1].data.totalNewCases
          : data[2].data[0].dailyConfirmed,
      totalCases:
        countryCode == null
          ? data[1].data.totalConfirmed
          : data[2].data[0].totalConfirmed,
      dailyNewDeaths:
        countryCode == null
          ? data[1].data.totalNewDeaths
          : data[2].data[0].dailyDeaths,
      totalDeaths:
        countryCode == null
          ? data[1].data.totalDeaths
          : data[2].data[0].totalDeaths,
      dailyNewRecovered:
        countryCode == null
          ? data[1].data.totalNewCases - data[1].data.totalNewDeaths
          : data[2].data[0].dailyConfirmed - data[2].data[0].dailyDeaths,
      totalRecovered:
        countryCode == null
          ? data[1].data.totalRecovered
          : data[2].data[0].totalRecovered,
      countryCode: countryCode == null ? null : countryCode,
      countryName: countryCode == null ? null : data[2].data[0].country,
      lat: countryCode == null ? "34.80746" : data[2].data[0].lat,
      lng: countryCode == null ? "-40.4796" : data[2].data[0].lng,
      zoom: countryCode == null ? 2 : 6
    });
  };

  render() {
    const {
      data,
      dailyNewCases,
      totalCases,
      countryName,
      dailyNewDeaths,
      totalDeaths,
      dailyNewRecovered,
      totalRecovered,
      lat,
      lng,
      zoom
    } = this.state;

    return (
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <div className="app__logo">
              <h1>COVID19 TRACKER</h1>
            </div>
            <CountryPicker handleCountryChange={this.handleCountryChange} />
          </div>
          <div className="app__stats">
            <Cards
              data={data}
              dailyNewCases={dailyNewCases}
              totalCases={totalCases}
              dailyNewDeaths={dailyNewDeaths}
              totalDeaths={totalDeaths}
              dailyNewRecovered={dailyNewRecovered}
              totalRecovered={totalRecovered}
            />
          </div>
        </div>
        <Card className="app__right">
          <Suspense fallback={<h1>Loading profile...</h1>}></Suspense>

          <Map data={data} lat={lat} lng={lng} zoom={zoom} />
          <CardContent>
            <h3>Active cases by country</h3>
            <Table handleCountryChange={this.handleCountryChange} />
            <h3 style={{ paddingTop: "40px" }}>
              {countryName
                ? `Current total state in ${countryName}`
                : `Daily change worldwide`}
            </h3>
            {/* <Chart data={data} country={country} /> */}
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default App;

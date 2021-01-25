import React from "react";

import Cards from "./components/Cards";
import Chart from "./components/Chart";
import CountryPicker from "./components/CountryPicker";
import Map from "./components/Map";
import Table from "./components/Table";

import { Card, CardContent } from "@material-ui/core";

// import mainLogo from "./assets/images/mainLogo.png";

import "./App.css";
import "leaflet/dist/leaflet.css";

import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data: data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({
      data: data,
      country: country,
      zoom: 6
    });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <div className="app__logo">
              {/* <img src={mainLogo} alt="Covid-19 Tracker" width="80" /> */}
              <h1>COVID19 TRACKER</h1>{" "}
              <div className="header_update">
                Last updated: {new Date(data.updated).toDateString()}
              </div>
            </div>
            <CountryPicker handleCountryChange={this.handleCountryChange} />
          </div>
          <div className="app__stats">
            <Cards data={data} />
          </div>
          <Map data={data} />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Active cases by country</h3>
            <Table handleCountryChange={this.handleCountryChange} />
            <h3 style={{ paddingTop: "40px" }}>
              {country
                ? `Current total state in ${country}`
                : `Daily change worldwide`}
            </h3>
            <Chart data={data} country={country} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default App;

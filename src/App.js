import React from "react";

import Cards from "./components/Cards";
import Chart from "./components/Chart";
import CountryPicker from "./components/CountryPicker";
import Map from "./components/Map";
import Table from "./components/Table";

import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import styles from "./App.css";
import { fetchData, fetchDailyData } from "./api";

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

    this.setState({ data: data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className="app">
        <div className="app_left">
          <div className="app__header">
            <div className="app__logo">
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
          <Map />
        </div>
        <Card className="app_right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table />
            <h3>Daily change</h3>
            <Chart data={data} country={country} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default App;

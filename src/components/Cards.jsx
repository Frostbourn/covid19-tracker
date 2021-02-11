import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import { fetchCountries } from "../api";
import { nFormat } from "../utils";

const Cards = ({
  dailyNewCases,
  totalCases,
  dailyNewDeaths,
  totalDeaths,
  dailyNewRecovered,
  totalRecovered
}) => {
  const [globalData, setGlobalData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchCountries().then((response) => {
        setGlobalData(response[1].data);
      });
    };
    fetchAPI();
  }, [setGlobalData]);

  // if (!globalData.totalNewCases) {
  //   return <Spinner />;
  // }
  return (
    <Grid container justify="center" spacing={5}>
      <Grid item xs={10} md={4}>
        <Card className="infected">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Cases
            </Typography>
            <Typography variant="h5">
              +
              <CountUp
                start={0}
                end={dailyNewCases}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              {nFormat(totalCases)} total
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} md={4}>
        <Card className="recovered">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              +
              <CountUp
                start={0}
                end={dailyNewRecovered}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              {nFormat(totalRecovered)} total
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} md={4}>
        <Card className="deaths">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              +
              <CountUp
                start={0}
                end={dailyNewDeaths}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              {nFormat(totalDeaths)} total
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

const Cards = ({
  data: {
    cases,
    todayCases,
    recovered,
    todayRecovered,
    deaths,
    todayDeaths,
    updated
  }
}) => {
  if (!cases) {
    return "Loading...";
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Infected today
          </Typography>
          <Typography variant="h4">
            <CountUp start={0} end={todayCases} duration={2.5} separator="." />
          </Typography>
          <Typography color="textSecondary">
            <CountUp start={0} end={cases} duration={2.5} separator="." /> Total
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Recovered today
          </Typography>
          <Typography variant="h4">
            <CountUp
              start={0}
              end={todayRecovered}
              duration={2.5}
              separator="."
            />
          </Typography>
          <Typography color="textSecondary">
            <CountUp start={0} end={recovered} duration={2.5} separator="." />{" "}
            Total
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Deaths today
          </Typography>
          <Typography variant="h4">
            <CountUp start={0} end={todayDeaths} duration={2.5} separator="." />
          </Typography>
          <Typography color="textSecondary">
            <CountUp start={0} end={deaths} duration={2.5} separator="." />{" "}
            Total
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Cards;

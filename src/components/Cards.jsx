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
    <Grid container justify="center" spacing={3}>
      <Grid item xs={10} md={4}>
        <Card style={{ backgroundColor: "#EC407A" }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected today
            </Typography>
            <Typography variant="h4">
              <CountUp
                start={0}
                end={todayCases}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              <CountUp start={0} end={cases} duration={2.5} separator="." />{" "}
              Total
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} md={4}>
        <Card style={{ backgroundColor: "#009688" }}>
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
      </Grid>
      <Grid item xs={10} md={4}>
        <Card style={{ backgroundColor: "#9C27B0" }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths today
            </Typography>
            <Typography variant="h4">
              <CountUp
                start={0}
                end={todayDeaths}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              <CountUp start={0} end={deaths} duration={2.5} separator="." />{" "}
              Total
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;

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
    <Grid container justify="center" spacing={5}>
      <Grid item xs={10} md={4}>
        <Card className="infected">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
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
        <Card className="recovered">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
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
        <Card className="deaths">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
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

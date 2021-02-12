import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Line, Pie } from "react-chartjs-2";

import { fetchCountries } from "../api";
import { nFormat } from "../utils";

const Chart = ({ totalCases, totalDeaths, totalRecovered, countryCode }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchCountries());
    };

    fetchAPI();
  }, []);

  const lineChart =
    dailyData[3] && !!dailyData[3].data.length ? (
      <Line
        data={{
          labels: dailyData[3].data.map((data) => data.lastUpdated),
          datasets: [
            {
              label: "Total Confirmed",
              data: dailyData[3].data.map((data) => data.totalConfirmed),
              borderColor: "rgb(22 133 255)",
              backgroundColor: "transparent",
              pointBackgroundColor: "rgb(22 133 255)",
              pointBorderColor: "rgb(22 133 255)"
            },

            {
              label: "Total Recovered",
              data: dailyData[3].data.map((data) => data.totalRecovered),
              borderColor: "rgb(87 213 151)",
              backgroundColor: "transparent",
              pointBackgroundColor: "rgb(87 213 151)",
              pointBorderColor: "rgb(87 213 151)"
            },
            {
              label: "Total Deaths",
              data: dailyData[3].data.map((data) => data.totalDeaths),
              borderColor: "rgb(255 65 105)",
              backgroundColor: "transparent",
              pointBackgroundColor: "rgb(255 65 105)",
              pointBorderColor: "rgb(255 65 105)"
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            point: {
              radius: 5
            }
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return tooltipItem.yLabel.toLocaleString();
              }
            }
          },
          legend: {
            display: true,
            labels: {
              usePointStyle: true
            }
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "month",
                  displayFormats: {
                    quarter: "MMM YYYY"
                  }
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  min: 0,
                  max: 160000000,
                  stepSize: 40000000,
                  callback: function (value, index, values) {
                    if (value >= 1000) {
                      return nFormat(value);
                    } else {
                      return value;
                    }
                  }
                }
              }
            ]
          }
        }}
      />
    ) : null;

  const pieChart = totalCases ? (
    <Pie
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#1685FF", "#57D597", "#FF4169"],
            data: [totalCases, totalRecovered, totalDeaths]
          }
        ]
      }}
      options={{
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }}
    />
  ) : null;
  if (!dailyData[3]) {
    return "";
  }
  return (
    <Card className="app__charts" justify="center">
      <CardContent>{countryCode == null ? lineChart : pieChart}</CardContent>
    </Card>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";

import Spinner from "./Spinner";
import { fetchCountries } from "../api";

const Chart = ({ data: { cases, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchCountries());
    };

    fetchAPI();
  }, []);
  console.log(dailyData[3]);
  const lineChart =
    dailyData[3] && !!dailyData[3].data.length ? (
      <Line
        data={{
          labels: dailyData[3].data.map((data) => data.lastUpdated),
          datasets: [
            {
              label: "Cases",
              data: dailyData[3].data.map((data) => data.totalConfirmed),
              borderColor: "rgb(22 133 255)",
              backgroundColor: "transparent",
              pointBackgroundColor: "rgb(22 133 255)",
              pointBorderColor: "rgb(22 133 255)"
            },

            {
              label: "Recovered",
              data: dailyData[3].data.map((data) => data.totalRecovered),
              borderColor: "rgb(87 213 151)",
              backgroundColor: "transparent",
              pointBackgroundColor: "rgb(87 213 151)",
              pointBorderColor: "rgb(87 213 151)"
            },
            {
              label: "Deaths",
              data: dailyData[3].data.map((data) => data.totalDeaths),
              borderColor: "rgb(255 65 105)",
              backgroundColor: "transparent",
              pointBackgroundColor: "rgb(255 65 105)",
              pointBorderColor: "rgb(255 65 105)"
            }
          ]
        }}
        options={{
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
                  stepSize: 40000000
                }
              }
            ]
          }
        }}
      />
    ) : null;

  const barChart = cases ? (
    <Pie
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#1685FF", "#57D597", "#FF4169"],
            data: [cases, recovered, deaths]
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
    return <Spinner />;
  }
  return <div className="app__chart">{country ? barChart : lineChart}</div>;
};

export default Chart;

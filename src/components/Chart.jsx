import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { nFormat } from "../utils";
import { fetchDailyData } from "../api";

const Chart = ({
  data: {
    cases,
    todayCases,
    recovered,
    todayRecovered,
    deaths,
    todayDeaths,
    updated
  },
  country
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ dailyConfirmed }) => dailyConfirmed),
            borderColor: "#CC1034",
            backgroundColor: "rgba(204, 16, 62, 0.5)"
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
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return nFormat(tooltipItem.yLabel);
            }
          }
        },
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ],
          yAxes: [
            {
              grindLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1000,
                userCallback: function (value, index, values) {
                  return nFormat(value);
                }
              }
            }
          ]
        }
      }}
    />
  ) : null;

  const barChart = cases ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgb(0, 143, 251)",
              "rgb(0, 227, 150)",
              "rgb(254, 176, 25)"
            ],
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
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return nFormat(tooltipItem.yLabel);
            }
          }
        },
        title: { display: true, text: `Current state in ${country}` },
        scales: {
          yAxes: [
            {
              display: false
            }
          ]
        }
      }}
    />
  ) : null;

  return <div className="app__chart">{country ? barChart : lineChart}</div>;
};

export default Chart;

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
            borderColor: "#1685FF",
            backgroundColor: "rgba(22, 135, 255, 0.452)"
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
              display: false
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
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return nFormat(tooltipItem.yLabel);
            }
          }
        },
        //title: { display: true, text: `Current state in ${country}` },
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

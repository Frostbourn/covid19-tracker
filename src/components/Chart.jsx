import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";

import { fetchDailyData } from "../api";

const Chart = ({ data: { cases, recovered, deaths }, country }) => {
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
        labels: dailyData
          .slice(Math.max(dailyData.length - 120, 0))
          .map(({ date }) => date),
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
            radius: 3
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
                max: 150000,
                stepSize: 10000
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

  return <div className="app__chart">{country ? barChart : lineChart}</div>;
};

export default Chart;

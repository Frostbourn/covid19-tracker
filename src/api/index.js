import axios from "axios";

const url = "https://api.coronatracker.com/v3/stats/worldometer";

// export const fetchData = async (country) => {
//   let changableUrl = url;

//   if (country) {
//     changableUrl = `${url}/country?countryCode=${country}`;
//   } else {
//     changableUrl = `${url}/global`;
//   }

//   try {
//     const {
//       data: {
//         totalConfirmed,
//         totalDeaths,
//         totalRecovered,
//         totalNewCases,
//         totalNewDeaths,
//         totalActiveCases,
//         created
//       }
//     } = await axios.get(changableUrl);

//     const defaultData = {
//       totalConfirmed,
//       totalDeaths,
//       totalRecovered,
//       totalNewCases,
//       totalNewDeaths,
//       totalActiveCases,
//       created
//     };
//     return defaultData;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);

//     const modifiedDailyData = data.map((dailyData) => ({
//       confirmed: dailyData.confirmed.total,
//       dailyConfirmed: dailyData.deltaConfirmed,
//       deaths: dailyData.deaths.total,
//       date: dailyData.reportDate
//     }));
//     return modifiedDailyData;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchCountries = async (countryCode, countryName) => {
  try {
    const [global, topCountries, country, dailyData, news] = await axios.all([
      axios.get(`${url}/global`),
      axios.get(`${url}/topCountry`),
      axios.get(`${url}/country?countryCode=${countryCode}`),
      axios.get(`${url}/totalTrendingCases?limit=100`),
      axios.get(
        `https://api.coronatracker.com/news/trending?limit=5&offset=45&country=${
          countryName ? countryName : "USA"
        }`
      )
    ]);

    const countriesData = topCountries.data
      .filter((x) => x)
      .map((data) => ({
        name: data.country,
        code: data.countryCode,
        activeCases: data.activeCases,
        cases: data.totalConfirmed,
        recovered: data.totalRecovered,
        deaths: data.totalDeaths,
        lat: data.lat != null ? data.lat : 0,
        lng: data.lng != null ? data.lng : 0,
        confirm: data.confirm
      }));

    return [countriesData, global, country, dailyData, news];
  } catch (error) {
    console.log(error);
  }
};

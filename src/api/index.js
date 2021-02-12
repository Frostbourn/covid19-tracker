import axios from "axios";

const url = "https://api.coronatracker.com/v3/stats/worldometer";

export const fetchCountries = async (countryCode, countryName) => {
  try {
    const [global, topCountries, country, dailyData, news] = await axios.all([
      axios.get(`${url}/global`),
      axios.get(`${url}/topCountry`),
      axios.get(`${url}/country?countryCode=${countryCode}`),
      axios.get(`${url}/totalTrendingCases?limit=100`),
      axios.get(
        `https://api.coronatracker.com/news/trending?limit=5&&offset=0&countryCode=${countryCode}&country=${
          countryName ? countryName : "United+States"
        }&language=en`
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

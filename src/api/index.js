import axios from "axios";

const url = "https://disease.sh/v3/covid-19";

export const fetchData = async (country) => {
  let changableUrl = url;

  if (country) {
    changableUrl = `${url}/countries/${country}`;
  } else {
    changableUrl = `${url}/all`;
  }

  try {
    const {
      data: {
        countryInfo,
        cases,
        todayCases,
        recovered,
        todayRecovered,
        deaths,
        todayDeaths,
        updated
      }
    } = await axios.get(changableUrl);

    const defaultData = {
      countryInfo,
      cases,
      todayCases,
      recovered,
      todayRecovered,
      deaths,
      todayDeaths,
      updated
    };

    return defaultData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);

    const modifiedDailyData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      dailyConfirmed: dailyData.deltaConfirmed,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));
    return modifiedDailyData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async (country) => {
  try {
    const { data } = await axios.get(
      `https://disease.sh/v3/covid-19/countries`
    );

    const modifiedCountryData = data.map((countriesData) => ({
      name: countriesData.country,
      activeCases: countriesData.active,
      lat: countriesData.countryInfo.lat,
      long: countriesData.countryInfo.long
    }));

    return modifiedCountryData;
  } catch (error) {
    console.log(error);
  }
};

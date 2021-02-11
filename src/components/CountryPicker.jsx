import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { fetchCountries } from "../api";
import { sortAlph } from "../utils";

const CountryPicker = ({ handleCountryChange, countryName }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchCountries().then((response) => {
        const sortedData = sortAlph(response[0]);
        setFetchedCountries(sortedData);
      });
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={fetchedCountries}
      autoHighlight
      value={countryName}
      getOptionLabel={(option) => (countryName ? countryName : option.name)}
      getOptionSelected={(option, value) => option.name === value.name}
      onChange={(event, value) =>
        value
          ? handleCountryChange(value.code)
          : handleCountryChange(event.target.value)
      }
      renderOption={(option) => <>{option.name}</>}
      renderInput={(params) => (
        <TextField {...params} label="Choose a country" variant="outlined" />
      )}
    />
  );
};

export default CountryPicker;

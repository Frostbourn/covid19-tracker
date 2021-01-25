import React, { useState, useEffect } from "react";

import { fetchCountries } from "../api";
import { sortData } from "../utils";

function Table({ handleCountryChange }) {
  const [activeCases, setActiveCases] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const sortedData = sortData(await fetchCountries());
      setActiveCases(sortedData);
    };
    fetchAPI();
  }, []);

  return (
    <div className="table">
      {activeCases.map((country, i) => (
        <tr key={i} onClick={() => handleCountryChange(country.name)}>
          <td>
            <img
              src={country.flag}
              width="20"
              style={{ paddingRight: "5px" }}
              alt="country-flag"
            />
            {country.name}
          </td>
          <td>
            <strong>{country.activeCases.toLocaleString()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;

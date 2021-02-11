import React, { useState, useEffect } from "react";

import { fetchCountries } from "../api";
import { sortDesc } from "../utils";

function Table({ handleCountryChange }) {
  const [activeCases, setActiveCases] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchCountries([0]).then((response) => {
        const sortedData = sortDesc(response[0]);
        setActiveCases(sortedData);
      });
    };
    fetchAPI();
  }, []);

  return (
    <div className="table">
      <table>
        <tbody>
          {activeCases.map((country, i) => (
            <tr
              key={i}
              onClick={() => handleCountryChange(country.code, country.name)}
            >
              <td>
                <img
                  src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${(country.code
                    ? country.code
                    : ""
                  ).toLowerCase()}.svg`}
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
        </tbody>
      </table>
    </div>
  );
}

export default Table;

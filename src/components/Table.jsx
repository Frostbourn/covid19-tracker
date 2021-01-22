import React, { useState, useEffect } from "react";

import { fetchCountries } from "../api";
import { sortData, nFormat } from "../utils";

function Table() {
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
        <tr key={i}>
          <td>{country.name}</td>
          <td>
            <strong>{nFormat(country.activeCases)}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;

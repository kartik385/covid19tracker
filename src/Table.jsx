import React from "react";
import "./Table.css";
import numeral from "numeral";
function Table({ countries }) {
  countries.sort((a, b) => b.cases - a.cases);
  return (
    <div className="table">
      {countries.map(({ country, cases }) => {
        return (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        );
      })}
    </div>
  );
}

export default Table;

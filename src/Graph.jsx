import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";
import "./Graph.css";
import numeral from "numeral";
defaults.global.tooltips.enabled = false;
defaults.global.legend.position = "bottom";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
function generateData(data, caseType) {
  try {
    let result = [];
    let intialValue;
    for (let date in data[caseType]) {
      if (intialValue) {
        let dataObj = {
          x: date,
          y: data[caseType][date] - intialValue,
        };
        result.push(dataObj);

        intialValue = data[caseType][date];
      } else {
        intialValue = data[caseType][date];
      }
    }
    return result;
  } catch (e) {
    return [];
  }
}

function Graph({ caseType, country }) {
  let [data, setData] = useState([]);
  let [color, setColor] = useState();

  function set(caseType) {
    if (caseType === `cases`) setColor("yellow");
    else if (caseType === `deaths`) setColor("red");
    else setColor("green");
  }

  useEffect(() => {
    console.log(caseType);
    let url =
      country === `worldwide`
        ? `https://disease.sh/v3/covid-19/historical/all?lastdays=120`
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let result =
          country !== `worldwide`
            ? generateData(data.timeline, caseType)
            : generateData(data, caseType);
        set(caseType);
        setData(result);
      });
  }, [caseType, country]);

  return (
    <div className="graph">
      <Line
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: color,
              borderColor: "#CC1034",
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

export default Graph;

const chart = document.getElementById("myChart");
const emptyChart = chart.toDataURL();

export const displayChart = ({
  selectedContinent,
  statistic,
  selectedCountry,
}) => {
  chart.innerText = "";

  let labels = [];
  let data = [];
  let type = "line";
  let options = {};
  let statisticToLoad = "confirmed";
  if (!selectedCountry) {
    if (statistic !== undefined) statisticToLoad = statistic;
    for (const country of selectedContinent) {
      labels.push(country.name);
      data.push(country.latest_data[statisticToLoad]);
    }
  } else {
    console.log(selectedCountry.today);
    type = "bar";
    labels = [
      "Total Cases",
      "New Cases",
      "Total Deaths",
      "New Deaths",
      "Total Recovered",
      "In Critical Condition",
    ];
    // labels.pop();

    for (const label of labels) {
      console.log(selectedCountry);
      switch (label) {
        case "Total Cases":
          data.push(selectedCountry.latest_data["confirmed"]);
          break;
        case "New Cases":
          data.push(selectedCountry.today["confirmed"]);
          break;
        case "Total Deaths":
          data.push(selectedCountry.latest_data["deaths"]);
          break;
        case "New Deaths":
          data.push(selectedCountry.today["deaths"]);
          break;
        case "Total Recovered":
          data.push(selectedCountry.latest_data["recovered"]);
          break;
        case "In Critical Condition":
          data.push(selectedCountry.latest_data["critical"]);
          break;
        default:
          break;
      }
    }
    // data = Object.values(selectedCountry.latest_data);
    // data.pop();

    options = {
      plugins: {
        datalabels: {
          color: "#000",
          font: {
            weight: "bold",
            size: "14",
          },

          align: "top",
          textAlign: "center",
          formatter: function (value, context) {
            return `${
              context.chart.data.labels[context.dataIndex]
            }:\n  ${value}`;
          },
        },
      },
    };
  }

  const dataLoad = {
    labels,
    datasets: [
      {
        label: statisticToLoad,
        backgroundColor: ["#F66B0E", "#0AA1DD", "#F8CB2E"],
        borderColor: "#205375",
        data,
      },
    ],
  };
  const config = {
    type,
    data: dataLoad,
    options: options,
    plugins: type === "bar" ? [ChartDataLabels] : null,
  };

  if (chart.toDataURL() != emptyChart) {
    destroyChart();
  }
  window.myChart = new Chart(chart, config);
};

export function destroyChart() {
  window.myChart.destroy();
}

const chart = document.getElementById("myChart");
const emptyChart = chart.toDataURL();

export const displayChart = ({
  selectedContinent,
  continentChosenName,
  statistic,
}) => {
  chart.innerText = "";

  const labels = [];
  const data = [];

  let statisticToLoad = "confirmed";
  if (statistic !== undefined) statisticToLoad = statistic;
  for (const country of selectedContinent) {
    labels.push(country.name);
    data.push(country.latest_data[statisticToLoad]);
  }
  const dataLoad = {
    labels,
    datasets: [
      {
        label: continentChosenName,
        backgroundColor: "#F66B0E",
        borderColor: "#205375",
        data,
      },
    ],
  };

  const config = {
    type: "line",
    data: dataLoad,
    options: {},
  };
  console.log(config);
  if (chart.toDataURL() != emptyChart) destroyChart();
  window.myChart = new Chart(chart, config);
  function destroyChart() {
    window.myChart.destroy();
  }
};

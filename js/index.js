import { getWorldwideCovidData, getCountries } from "./fetch.js";
import {
  saveIntoLocalStorage,
  getDataFromLocalStorage,
  ifExistsInLocalStorage,
} from "./localStorage.js";

import { displayChart, destroyChart } from "./chart.js";
const state = {};
const continents = {};
const countriesWrap = document.createElement("select");
const container = document.getElementById("container");
const buttons = document.querySelector(".buttons");
const chartWrap = document.getElementById("chart-wrap");
countriesWrap.addEventListener("change", (e) => {
  const selectedCountry = state.selectedContinent.find((country) => {
    return country.name === e.target.value;
  });
  state.selectedCountry = selectedCountry;

  displayChart(state);
  state.selectedCountry = "";
});
export async function initApp() {
  //To sperate to 2 function

  if (!ifExistsInLocalStorage("covidCountriesStatistics")) {
    const covidCountriesStatistics = await getWorldwideCovidData();
    console.log(covidCountriesStatistics);
    saveIntoLocalStorage(covidCountriesStatistics, "covidCountriesStatistics");
    state.covidCountriesStatistics = covidCountriesStatistics;
  } else
    state.covidCountriesStatistics = getDataFromLocalStorage(
      "covidCountriesStatistics"
    );
  if (!ifExistsInLocalStorage("countries")) {
    const countries = await getCountries();
    saveIntoLocalStorage(countries, "countries");
    state.countries = countries;
  } else state.countries = getDataFromLocalStorage("countries");

  combinedCountriesWithContinent();
}

const handleCovidStatsBtn = (e) => {
  if (e.target.localName === "button") {
    state.statistic = e.target.innerText;
    displayChart(state);
  }
};

const createStatsButtons = () => {
  if (buttons.children.length <= 1) {
    const div = document.createElement("div");

    const statusButtons = Object.keys(
      state.covidCountriesStatistics[0].latest_data
    );

    for (const statusBtn of statusButtons) {
      if (statusBtn !== "calculated") {
        const btn = document.createElement("button");
        btn.innerText = statusBtn;
        div.appendChild(btn);
      }
    }
    div.addEventListener("click", handleCovidStatsBtn);

    buttons.prepend(div);
  }
};
function handleContinentBtnClick(e) {
  if (e.target.localName === "button") {
    createStatsButtons();
    state.continentChosenName = e.target.innerText;
    const countriesInContinent = continents[e.target.innerText];
    state.selectedContinent = countriesInContinent;
    const input = document.createElement("input");
    // input.list = "select";
    countriesWrap.innerText = "";
    countriesWrap.appendChild(input);
    for (const country of countriesInContinent) {
      const option = document.createElement("option");
      option.innerText = `${country.name}`;
      option.value = country.name;
      countriesWrap.appendChild(option);
    }
    countriesWrap.classList.add("countries-list");
    // container.appendChild(countriesWrap);
    chartWrap.appendChild(countriesWrap);
    displayChart(state);
  }
}

function createButtons() {
  const continentDiv = document.createElement("div");

  for (const continent of Object.keys(continents)) {
    const btn = document.createElement("button");

    btn.innerText = continent;

    continentDiv.appendChild(btn);
  }
  continentDiv.addEventListener("click", handleContinentBtnClick);
  buttons.appendChild(continentDiv);
}

function combinedCountriesWithContinent() {
  state.countries.forEach(({ region }) => {
    region ? (continents[region] = []) : null;
  });

  state.covidCountriesStatistics.forEach((country) => {
    state.countries.forEach(({ name: { common }, region }) => {
      if (common === country.name && region) {
        continents[region].push(country);
      }
    });
  });

  createButtons();
}

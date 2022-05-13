import { getWorldwideCovidData, getCountries } from "./fetch.js";
import {
  saveIntoLocalStorage,
  getDataFromLocalStorage,
  ifExistsInLocalStorage,
} from "./localStorage.js";

const state = {};
const continents = {};

export async function initApp() {
  //To sperate to 2 function

  if (!ifExistsInLocalStorage("covidCountriesStatistics")) {
    const covidCountriesStatistics = await getWorldwideCovidData();
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
}

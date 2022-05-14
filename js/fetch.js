const proxy = "https://cors-anywhere.herokuapp.com/";

export async function getWorldwideCovidData() {
  try {
    const { data } = await axios.get(`${proxy}http://corona-api.com/countries`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getCountries() {
  try {
    const { data } = await axios.get(
      `${proxy}https://restcountries.herokuapp.com/api/v1`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// const proxy = "";

// export async function getWorldwideCovidData() {
//   try {
//     const { data } = await axios.get(`${proxy}http://corona-api.com/countries`);
//     return data.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
// export async function getCountries() {
//   try {
//     const { data } = await axios.get(
//       `${proxy}https://restcountries.herokuapp.com/api/v1`
//     );
//     return data;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

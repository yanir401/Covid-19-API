const proxy = "https://cors-anywhere.herokuapp.com/";

export async function getWorldwideCovidData() {
  try {
    const { data } = await axios.get(`${proxy}http://corona-api.com/countries`);
    console.log("http://corona-api.com/countries");
    console.log(data);
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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// const proxy = "";

// export async function getWorldwideCovidData() {
//   try {
//     const { data } = await axios.get(`${proxy}http://corona-api.com/countries`);
//     console.log(data);
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
//     console.log(data);

//     return data;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

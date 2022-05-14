const proxy = "http://api.allorigins.win/get?url=";

export async function getWorldwideCovidData() {
  // try {
  //   const { data } = await axios.get(`${proxy}http://corona-api.com/countries`);
  //   console.log("http://corona-api.com/countries");
  //   console.log(data);
  //   return data.data;
  // } catch (error) {
  //   console.error(error);
  // }
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "http://corona-api.com/countries"
    )}`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      return JSON.parse(data.contents);
    });
  console.log(res);
  return res.data;
}

export async function getCountries() {
  // try {
  //   const { data } = await axios.get(`${proxy}http://corona-api.com/countries`);
  //   console.log("http://corona-api.com/countries");
  //   console.log(data);
  //   return data.data;
  // } catch (error) {
  //   console.error(error);
  // }
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://restcountries.herokuapp.com/api/v1"
    )}`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      return JSON.parse(data.contents);
    });
  console.log(res);
  return res;
}
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

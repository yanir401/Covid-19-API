const proxy = "https://api.allorigins.win/get?url=";

export async function getWorldwideCovidData() {
  const res = await fetch(
    `${proxy}${encodeURIComponent("http://corona-api.com/countries")}`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      return JSON.parse(data.contents);
    });
  return res.data;
}

export async function getCountries() {
  const res = await fetch(
    `${proxy}${encodeURIComponent(
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

  return res;
}

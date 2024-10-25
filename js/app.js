"use strict";

const capitalizeFirstLetter = (sentence) => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};
let valueSearch = document.querySelector("#valueSearch");
let city = document.querySelector("#city");
let flag = document.querySelector("#flag");
let temperature = document.querySelector("#temperature");
let description = document.querySelector(".description");
let clouds = document.querySelector("#clouds");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let form = document.querySelector("form");

let id = "8ec85e82a3e1b87e3fe0cb82dc7482dc";
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${id}&q=`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (valueSearch.value !== "") {
    searchWeather();
  }
});

const searchWeather = async () => {
  try {
    const response = await fetch(url + valueSearch.value);
    if (!response.ok) {
      city.textContent = "Not found";
      throw new Error("Not found");
    }

    const data = await response.json();
    console.log(data);
    //dom manipulation
    if (data.cod === 200) {
      city.textContent = data.name;

      flag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;

      temperature.querySelector(
        "img"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      temperature.querySelector("figcaption span").textContent = Math.round(
        data.main.temp
      );

      description.textContent = capitalizeFirstLetter(
        data.weather[0].description
      );

      clouds.textContent = data.clouds.all;

      humidity.textContent = data.main.humidity;

      pressure.textContent = data.main.pressure;
    }
  } catch (error) {
    console.log(error);
  }
};

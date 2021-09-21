import { getLocationCoords, getWeatherData } from "./fetchData";
import {
  displayCurrentForecast,
  displayHourlyForecast,
  displayDailyForecast,
  clearCurrentForecast,
  clearSwiper,
} from "./domFunctions";

const form = document.querySelector("form");
const unitsBtn = document.querySelectorAll(".units .btn");
const dailyHourlyBtn = document.querySelectorAll(".daily-hourly-btns .btn");
let cityCountry = "New York, US";
let currentForecast;
let hourlyForecast;
let dailyForecast;
let units = "metric";

form.addEventListener("submit", fetchWeatherData);

unitsBtn.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    if (e.target.innerText == "°C") {
      units = "metric";
    } else {
      units = "imperial";
    }
    clearCurrentForecast();
    clearSwiper();
    displayCurrentForecast(cityCountry, currentForecast, units);
    displayHourlyForecast(hourlyForecast, units);
  })
);

dailyHourlyBtn.forEach((btn) =>
  btn.addEventListener("click", async function (e) {
    clearSwiper();

    if (e.target.innerText == "Hourly") {
      displayHourlyForecast(hourlyForecast, units);
    } else {
      displayDailyForecast(dailyForecast, units);
    }
  })
);

window.addEventListener("load", loadDefaultWeather);

function displayWeatherData() {
  clearCurrentForecast();
  clearSwiper();
  displayCurrentForecast(cityCountry, currentForecast, units);
  displayHourlyForecast(hourlyForecast, units);
}

async function loadDefaultWeather(e) {
  e.preventDefault();

  try {
    const coordinates = await getLocationCoords(cityCountry);
    const weatherData = await getWeatherData(
      coordinates.lat,
      coordinates.lon,
      units
    );

    cityCountry = coordinates.location;
    currentForecast = weatherData.currentWeatherObj;
    hourlyForecast = weatherData.hourlyWeatherArray;
    dailyForecast = weatherData.dailyWeatherArray;
    displayWeatherData();
  } catch {
    alert(
      "Something went wrong. Open Weather services might be down. Try again later"
    );
  }
}

async function fetchWeatherData(e) {
  e.preventDefault();
  const locationValue = document.querySelector("#location").value;

  if (!locationValue) {
    return;
  }

  try {
    const coordinates = await getLocationCoords(locationValue);
    const weatherData = await getWeatherData(
      coordinates.lat,
      coordinates.lon,
      units
    );
    cityCountry = coordinates.location;
    currentForecast = weatherData.currentWeatherObj;
    hourlyForecast = weatherData.hourlyWeatherArray;
    dailyForecast = weatherData.dailyWeatherArray;
    displayWeatherData();
  } catch {
    const error = document.querySelector("#error");
    error.style.display = "inline";
  }
}
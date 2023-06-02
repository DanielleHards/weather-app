function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2"
        <ul class="weather-forecast-day">  
            <li><span class="weather-forecast-date" id="day-1-name">${formatDay(
              forecastDay.time
            )}</span></li>
            <li><span id="day-1-icon"><img
          src=${forecastDay.condition.icon_url}
          alt=""
          width="42"
        /></li>
            <li> <span class="highTemp" id="high-temp">${Math.round(
              forecastDay.temperature.maximum
            )}°</span> <span class="lowTemp" id="low-temp"> | ${Math.round(
          forecastDay.temperature.minimum
        )}°</span></li>
        </ul>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fTemp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#day");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  fTemp = response.data.temperature.current;
  imperialSpeed = response.data.wind.speed;
}

function getForecast(city) {
  let apiKey = "b99atfd426b3cde797eo6c02fa816d9b";
  let units = "imperial";
  let apiURLForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  console.log(apiURLForecast);
  axios.get(apiURLForecast).then(displayForecast);
}
function search(city) {
  let apiKey = "b99atfd426b3cde797eo6c02fa816d9b";
  let units = "imperial";
  let apiURLCurrentWeather = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiURLCurrentWeather).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput = cityInput.value;
  search(cityInput);
}

let apiKey = "b99atfd426b3cde797eo6c02fa816d9b";
let units = "imperial";
let city = "London";
let apiURLCurrentWeather = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
axios.get(apiURLCurrentWeather).then(displayTemperature);

function convertToMetric(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let metricTemperature = Math.round(((fTemp - 32) * 5) / 9);
  temperatureElement.innerHTML = metricTemperature;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(imperialSpeed * 1.609);
  let speedUnit = document.querySelector("#speed-unit");
  speedUnit.innerHTML = "kph";
}
function convertToImperial(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fTemp);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(imperialSpeed);
}
let fTemp = null;
let imperialSpeed = null;

let form = document.querySelector("#submit-city");
form.addEventListener("submit", handleSubmit);

let convertC = document.querySelector("#convertC");
convertC.addEventListener("click", convertToMetric);

let convertF = document.querySelector("#convertF");
convertF.addEventListener("click", convertToImperial);

search("London");
displayForecast();

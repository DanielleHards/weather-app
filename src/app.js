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
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
    <img
      src="${forecastDay.condition.icon_url}"
      alt=""
      width="42"
      />
      <div class="weather-forecast-temperatures">
      <span class="highTemp">${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
      <span class="lowTemp"> | ${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
      </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;
  fTemp = response.data.temperature.current;
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
  imperialSpeed = response.data.wind.speed;

  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "b99atfd426b3cde797eo6c02fa816d9b";
  let units = "imperial";
  let apiURLForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
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

let fTemp = null;
let imperialSpeed = null;

let form = document.querySelector("#submit-city");
form.addEventListener("submit", handleSubmit);

search("London");

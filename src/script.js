let date = new Date();
let now = document.querySelector("#datetime");
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

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

now.innerHTML = `${day} ${hours}:${minutes}`;

let celsiusTemperature = null;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col" id="weatherForecast">
          <p><img class="iconForecast" id="icon" src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="60"></p>
               <div id="weatherForecast">  
                  <span class="temperature" id="forecastTemperature">${Math.round(
                    forecastDay.temp.day
                  )}°C</span>
                    <div id="dayForecast"><em>${formatDay(
                      forecastDay.dt
                    )}</em></div>
                  </div>              
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  console.log(response.data);
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "ac8953c5828dcc35be83ca782e677826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "ac8953c5828dcc35be83ca782e677826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "ac8953c5828dcc35be83ca782e677826";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  search(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

// Current position data
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ac8953c5828dcc35be83ca782e677826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

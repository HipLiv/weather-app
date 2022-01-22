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

function showWeather(response) {
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(city) {
  let apiKey = "ac8953c5828dcc35be83ca782e677826";
  let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

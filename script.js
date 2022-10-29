let now = new Date();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let p = document.querySelector("#current-date");
p.innerHTML = ` ${day} ${date} ${hour} : ${minutes}`;

function displayWeatherConditions(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#degree-value").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "289728c771e0a38a967162ab64f6f9f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&inits=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "289728c771e0a38a967162ab64f6f9f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#city-input");
searchForm.addEventListener("submit", handleSubmit);
searchCity("New York");

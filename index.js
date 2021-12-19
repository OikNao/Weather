const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}:${seconds}`;
}
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector("#temp-high").innerHTML =
    "High: " + Math.round(response.data.main.temp_max) + "°C";
  document.querySelector("#temp-low").innerHTML =
    "Low: " + Math.round(response.data.main.temp_min) + "°C";
}
function search(event) {
  event.preventDefault();
  let apiKey = "9faa788ddbc6b64ff4c8d17ad14685a1";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  if (cityInput.value === undefined || cityInput.value.trim() === "") {
    alert("Type in a city please");
    return;
  }
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
}
let dateElement = document.querySelector("#date-time");

let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

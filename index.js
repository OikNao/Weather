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

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thur", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
      <div class="weather-forecast-day"> ${day} </div>
      <img
      src="https://j.theweathernetwork.com/wx_icons/v1/9.png"
      alt="" 
      width=40
      />
      
      <div class="weather-forecast-temperature">
      <span class="weather-forecast-temp-high"> 22°</span>
      <span class="weather-forecast-temp-low"> 18° </span>
      </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-high").innerHTML =
    "High: " + Math.round(response.data.main.temp_max) + "°C";
  document.querySelector("#temp-low").innerHTML =
    "Low: " + Math.round(response.data.main.temp_min) + "°C";
}
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let celsiusTemp = document.querySelector("#temperature").innerHTML;
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("actiive");
  let celsiusTemp = document.querySelector("#temperature").innerHTML;
  temperatureElement.innerHTML = celsiusTemp;
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

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

displayForecast();

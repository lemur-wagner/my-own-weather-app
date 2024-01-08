let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", displayCity);

function displayCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");

  searchCity(searchFormInput.value);
}

function searchCity(city) {
  apiKey = "fc033e4428deacf92tb6o5f960d83508";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let date = new Date(response.data.time * 1000);
  let time = document.querySelector("#time");
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let icon = document.querySelector("#icon");
  let iconImage = `  <img src="${response.data.condition.icon_url}"class="weather-app-temperature-icon"/>`;

  icon.innerHTML = iconImage;
  time.innerHTML = `${
    days[date.getDay()]
  } ${date.getHours()}:${date.getMinutes()}`;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  getForecastData(response.data.city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecastData(city) {
  let apiKey = "fc033e4428deacf92tb6o5f960d83508";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6)
      forecastHtml =
        forecastHtml +
        `
          <div class="column-1">
            <div class="forecast-weekdays">${formatDay(day.time)}</div>
           <img src= "${day.condition.icon_url}" class="forecast-icon" />
            <br />
            <div class="forecast-temperatures">
              <div class="forecast-temperature"><strong>
              ${Math.round(day.temperature.maximum)}</strong></div>
              <div class="forecast-temperature">
              ${Math.round(day.temperature.minimum)}</div>
            </div>
          </div>
        `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

searchCity("Warsaw");

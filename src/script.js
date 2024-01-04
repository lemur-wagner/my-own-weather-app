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
  if (minutes > 10) {
    minutes = `0${minutes};`;
  }

  time.innerHTML = `${
    days[date.getDay()]
  } ${date.getHours()}:${date.getMinutes()}`;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

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
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");

  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

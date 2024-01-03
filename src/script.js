function displayCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchFormInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", displayCity);

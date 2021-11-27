let now = new Date();

let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();

let minutes = now.getMinutes();
minutes = minutes.toString().padStart(2, "0");

function formatDate() {
  return `${day} ${hours}:${minutes}`;
}

let datetime = document.querySelector("#date-time");
datetime.innerHTML = formatDate();

function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#fake-temp");
  newTemp.innerHTML = `${currentTemp}°C | `;
}

function showTempLocation(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#fake-temp");
  newTemp.innerHTML = `${currentTemp}°C | `;
  let searchCountry = document.querySelector("#search-country");
  searchCountry.innerHTML = response.data.sys.country;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let searchCountry = document.querySelector("#search-country");
  searchCountry.innerHTML = searchInput.value;
  let apiKey = "d7c41983f20408f75c3e01482243112d";
  let units = "metric";
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d7c41983f20408f75c3e01482243112d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTempLocation);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let button = document.querySelector("#search-location");
button.addEventListener("click", getCurrentPosition);

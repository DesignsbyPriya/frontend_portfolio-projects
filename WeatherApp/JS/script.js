// Open Weather API 
const API = CONFIG.WEATHER_API_KEY;

// Get Elements
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temperature = document.getElementById("Temperature");
const humidity = document.getElementById("Humidity");
const windSpeed = document.getElementById("Wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const errorMessage = document.getElementById("error");

// Get weather data based on user's location
document.addEventListener("DOMContentLoaded", () => {
    getUserLocation();
});

// Get weather function
async function getWeather(city = "Delhi"){
    if(cityName !== ""){
        city = cityInput.value.trim();
    }

    if(city === ""){
      showError("Please enter a city!");  
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${India}&appid=${API}&units=metric`;

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();

        if(response.ok){
            displayWeather(data);
        }else{
            showError("city not found. Please try again.");
          }
        } catch(error){
         showError("An error occurred. Please try again.");
    }
}

// Display weather data
function displayWeather(data){
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  description.textContent = capitalizeWords(data.weather[0].description);
  temperature.innerHTML = `${data.main.temp.toFixed(1)}°C`; 
  humidity.innerHTML = `${data.main.humidity}% Humidity`;
  windSpeed.innerHTML = `${data.wind.speed} m/s Wind Speed`;

  // Set Weather Icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  // change background based on weather
  changeBackground(data.weather[0].main);
  
  // show weather info and hide
  weatherInfo.classList.remove("hidden");
  errorMessage.classList.add("hidden");  
}

// Show error message
function showError(message){
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
}

// Capitalize Words
function capitalizeWords(str){
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
}

// Change background based on Weather
function changeBackground(weather){
    let background = "#56CCF2";
    switch(weather.toLowerCase()){
      case "clear":
        background = "#FFDD44";
        break;
      case "clouds":
        background = "#B0BEC5";
        break;
      case "rain":
      case "drizzle":  
        background = "#76C7C0";
        break;
      case "thunderstorm":
        background = "#4C4C6D";
        break;
      case "snow":
        background = "#E0F7FA";
        break;
      default: 
        background = "#56CCF2";
                   
    }
    document.body.style.background = `linear-gradient(to right, ${background}, #2f80ed)`;
}

// Get user location & fetch weather
function getUserLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              await getWeatherByCoords(lat, lon);
            },
            () => {
               getWeather();  
            }
        );
    }else {
        getWeather();
    }
}

// Get weather by Latitude and Longitude
async function getWeatherByCoords(lat, lon){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if(response.ok){
            displayWeather(data);
        } else{
            showError("Unable to get weather data for your location.");
        }
    }catch(error){
        showError("An error occurred while fetching your location data.");
    }
   
}
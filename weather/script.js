const apiKey = `9bec3ce2e63ae4027c86a1cb5b22a175`;
// const city = "gujarat";

async function fetchWeatherData(city){
    try {
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
       if(!response.ok){
           throw new Error("Unable to fetch weather data");
       }
       const data =  await response.json();
       console.log(data);
       // console.log(data.main.temp);
       // console.log(data.name)
       // console.log(data.wind.speed);
       // console.log(data.main.humidity)
       // console.log(data.visibility)
       updateWeatherUI(data);
    }
    catch(error){
        console.error(error);
    }
}

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-display");

const discriptionText = document.querySelector(".discription-text");
const date = document.querySelector(".date")
const descriptionIcon = document.querySelector(".discription i");

// fetchWeatherData();

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent =`${data.wind.speed} KM/H`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility/1000} KM/H`;
    discriptionText.textContent = data.weather[0].description;

    const currentdate = new Date();
    date.textContent = currentdate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main)
    descriptionIcon.innerHTML =  `<i class="material-icons">${weatherIconName}</i>`
}

const formElement = document.querySelector(".search-icon");
const inputElement = document.querySelector(".city-input")

formElement.addEventListener('submit',function(e){
    e.preventDefault();

    const city = inputElement.value;
    if(city !== ''){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition]  || "help"
}
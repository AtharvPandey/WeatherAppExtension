const apiKey = "8d9366a77a9847fa92470c2e4af23ea1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

if (typeof document !== 'undefined') {
    
    const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (city.trim() === "") {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.body.style.width = "280px";
        document.body.style.height = "90px";
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.body.style.width = "280px";
        document.body.style.height = "65px";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.body.style.width = "";
        document.body.style.height = "";
        document.querySelector(".error").style.display = "none";
        
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
}



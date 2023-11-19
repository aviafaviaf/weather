"use strict"

// "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=b410477dcd9e8cba71bc0a5ab84f3f50"
fetch("https://api.open-meteo.com/v1/forecast?latitude=55.7522&longitude=37.6156&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&past_days=14&forecast_days=16")
    .then(function (resp) { return resp.json() })
    .then(function (data) {
    console.log(data);
})
    .catch(function () {

});
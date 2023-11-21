"use strict"

fetch("https://api.open-meteo.com/v1/forecast?latitude=55.7522&longitude=37.6156&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&past_days=14&forecast_days=16")
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data);
        fillCurrentWeather(data, "Москве");
        fillForecast(data);
})
    .catch(function () {
});

function fillCurrentWeather(data, city) {
    document.getElementById("date").textContent = "Сейчас в " + city + " " + transformDate(data["current"]["time"]);
    document.getElementById("temperature").textContent = "Температура: " + data["current"]["temperature_2m"] + "℃ (Ощущается как " + data["current"]["apparent_temperature"] + "℃)";
    document.getElementById("humidity").textContent = "Влажность: " + data["current"]["relative_humidity_2m"] + "%";
    document.getElementById("wind").textContent = "Ветер: " + Math.round(data["current"]["wind_speed_10m"] / 0.36) / 10 + " м/с";
    let wc = document.getElementById("weather_code");
    let wci = document.getElementById("weather_code_icon");
    let wi = document.getElementById("weather_image");
    switch (data["current"]["weather_code"]) {
        case 0:
        case 1:
            wc.textContent = "На улице ясно, осадков нет";
            wci.className = "fa-solid fa-sun";
            if (data["current"]["is_day"])
                wi.src = "../../images/sun.png";
            else
                wi.src = "../../images/moon.png";
            break;
        case 2:
        case 48:
            wc.textContent = "Переменная облачность, осадков нет";
            if (data["current"]["is_day"])
                wi.src = "../../images/cloudy.png";
            else
                wi.src = "../../images/moon-cloudy.png";
            wci.className = "fa-solid fa-cloud-sun";
            break;
        case 3:
            wc.textContent = "Пасмурно, без осадков";
            wci.className = "fa-solid fa-cloud";
            if (data["current"]["is_day"])
                wi.src = "../../images/cloud.png";
            else
                wi.src = "../../images/moon-cloudy.png";
            break;
        case 45:
            wc.textContent = "На улице туман";
            wci.className = "fa-solid fa-smog";
            wi.src = "../../images/fog.png";
            break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            wc.textContent = "На улице морось";
            wci.className = "fa-solid fa-cloud-rain";
            wi.src = "../../images/raining.png";
            break;
        case 61:
            wc.textContent = "На улице небольшой дождь";
            wci.className = "fa-solid fa-cloud-rain";
            wi.src = "../../images/raining.png";
            break;
        case 63:
        case 66:
        case 67:
            wc.textContent = "На улице дождь";
            wci.className = "fa-solid fa-cloud-rain";
            wi.src = "../../images/raining.png";
            break;
        case 65:
            wc.textContent = "На улице сильный дождь";
            wci.className = "fa-solid fa-cloud-showers-heavy";
            wi.src = "../../images/raining.png";
            break;
        case 80:
        case 81:
        case 82:
            wc.textContent = "На улице ливень";
            wci.className = "fa-solid fa-cloud-showers-heavy";
            wi.src = "../../images/raining.png";
            break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            wc.textContent = "На улице идёт снег";
            wci.className = "fa-solid fa-snowflake";
            wi.src = "../../images/snow.png";
            break;
        case 95:
        case 96:
        case 99:
            wc.textContent = "На улице гроза";
            wci.className = "fa-solid fa-cloud-bolt";
            wi.src = "../../images/thunder.png";
            break;
    }
}

function transformDate(date) {
    let result = date.slice(0, date.indexOf("-"));
    date = date.slice(date.indexOf("-") + 1);
    let month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    result = month[Number(date.slice(0, date.indexOf("-"))) - 1] + " " + result + " ";
    date = date.slice(date.indexOf("-") + 1);
    result = date.slice(0, date.indexOf("T")) + "-ое " + result + date.slice(date.indexOf("T") + 1);
    return result;
}

function getWeekDay(date) {
    let year = date.slice(0, date.indexOf("-"));
    date = date.slice(date.indexOf("-") + 1);
    let month = date.slice(0, date.indexOf("-"));
    date = date.slice(date.indexOf("-") + 1);
    let d = new Date(year, month - 1, date.slice(0, date.indexOf("T")));
    return d.getDay();
}

function fillForecast(data) {
    let weekDay = getWeekDay(data["current"]["time"]);
    for (let i = 15 - weekDay; i < 30; i++) {
        let element = document.createElement("div");
        element.textContent = data["daily"]["time"][i];
        document.getElementById("grid").append(element);
    }
}
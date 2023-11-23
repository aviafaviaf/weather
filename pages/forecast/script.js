"use strict"
import cities from './russian-cities.json' assert {type: 'json'};
function getData(city, link) {
    fetch(link)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log(data);
            fillCurrentWeather(data, city);
            fillForecast(data);
            switchButtonPastDays(data);
        })
        .catch(function () {
        });
}

function fillCitySelect() {
    let option = document.createElement("option");
    option.value = "Москва" + " " + "55.7522" + "|" + "37.6156";
    option.textContent = "Москва";
    document.getElementById("city").append(option);
    for (let city of cities) {
        if (city.name === "Москва")
            continue
        option = document.createElement("option");
        option.value = city["name"] + " " + city["coords"]["lat"] + "|" + city["coords"]["lon"];
        option.textContent = city["name"];
        document.getElementById("city").append(option);
    }

}

document.getElementById("city").onchange = function () {
    while (document.getElementById("grid").childElementCount !== 2) {
        document.getElementById("grid").removeChild(document.getElementById("grid").lastChild);
    }
    let city = document.getElementById("city").value;
    let lat = city.slice(city.indexOf(" ") + 1, city.indexOf("|"));
    let lon = city.slice(city.indexOf("|") + 1);
    let name = city.slice(0, city.indexOf(" "));
    getData(name,`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&past_days=14&forecast_days=16`);
}

document.getElementById("city-search").oninput = function () {
    let value = document.getElementById("city-search").value;
    for (let option of document.querySelectorAll("#city > option")) {
        option.style.display = (option.textContent.toLowerCase().startsWith(value.toLowerCase())) ? "block" : "none";
    }
}

function switchButtonPastDays(data) {
    document.getElementById("showPastDays").onclick = function() {
        while (document.getElementById("grid").childElementCount !== 2) {
            document.getElementById("grid").removeChild(document.getElementById("grid").lastChild);
        }
        let button = document.getElementById("showPastDays");
        if (button.textContent.slice(0, button.textContent.indexOf(" ")) === "Показать") {
            button.textContent = "Скрыть" + button.textContent.slice(button.textContent.indexOf(" "));
            fillFull(data);
        }
        else {
            button.textContent = "Показать" + button.textContent.slice(button.textContent.indexOf(" "));
            fillForecast(data);
        }
    };
}
function fillCurrentWeather(data, city) {
    document.getElementById("date").textContent = "Сейчас в городе " + city + " " + transformDate(data["current"]["time"]);
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
    result = date.slice(0, date.indexOf("T")) + " " + result + date.slice(date.indexOf("T") + 1);
    return result;
}

function getDate(date) {
    let year = date.slice(0, date.indexOf("-"));
    date = date.slice(date.indexOf("-") + 1);
    let month = date.slice(0, date.indexOf("-"));
    date = date.slice(date.indexOf("-") + 1);
    date = (date.indexOf("T") !== -1) ? date.slice(0, date.indexOf("T")) : date;
    return new Date(year, month - 1, date);
}

function fillFull(data) {
    let month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    let fill = false;
    let skipCount = 0;
    for (let i = 0; i < 30; i++) {
        let date = getDate(data["daily"]["time"][i]);
        if (!fill) {
            if (date.getDay() === 0)
                fill = true;
            else {
                skipCount++;
                continue;
            }
        }
        let element = document.createElement("div");
        let div = document.createElement("div");
        let dateText = document.createElement("span");
        let weekText = document.createElement("span");
        let maxTemp = document.createElement("span");
        let minTemp = document.createElement("span");
        let wci = document.createElement("img");
        element.style.position = "relative";
        div.style.display = "grid";
        div.style.gridTemplateColumns = "1fr 1fr";
        div.style.gridTemplateRows = "40px 60px 35px 35px";
        div.style.margin = "20px";
        if (i === 13)
            element.style.background = "#b3deff";
        if (i === 14)
            element.style.background = "#C4E2FB";
        wci.src = "../../images/sun.png";
        wci.style.width = "100%";
        wci.style.aspectRatio = "1 / 1";
        wci.style.gridColumn = "2";
        wci.style.gridRow = "span 2";
        maxTemp.textContent = Math.floor(data["daily"]["temperature_2m_max"][i]) + " ℃";
        maxTemp.style.whiteSpace = "nowrap"
        maxTemp.style.fontSize = "24px";
        maxTemp.style.textAlign = "center";
        minTemp.textContent = Math.floor(data["daily"]["temperature_2m_min"][i]) + " ℃";
        minTemp.style.fontSize = "20px";
        minTemp.style.color = "grey";
        minTemp.style.gridRow = "2";
        minTemp.style.textAlign = "center";
        dateText.textContent = date.getDate() + " " + month[date.getMonth()];
        dateText.style.fontSize = "24px";
        dateText.style.gridRow = "3";
        dateText.style.gridColumn = "span 2";
        weekText.textContent = week[date.getDay()];
        weekText.style.fontSize = "20px";
        weekText.style.gridRow = "4";
        weekText.style.gridColumn = "span 2";
        dateText.style.whiteSpace = "nowrap";
        if (date.getDay() >= 5)
            weekText.style.color = "#fc2f21";
        else
            weekText.style.color = "grey";
        switch (data["daily"]["weather_code"][i]) {
            case 0:
            case 1:
                wci.src = "../../images/sun.png";
                break;
            case 2:
            case 48:
                wci.src = "../../images/cloudy.png";
                break;
            case 3:
                wci.src = "../../images/cloud.png";;
                break;
            case 45:
                wci.src = "../../images/cloudy.png";
                break;
            case 51:
                wci.src = "../../images/cloudy.png";
                break;
            case 53:
            case 55:
            case 56:
            case 57:
                wci.src = "../../images/raining.png";
                break;
            case 61:
                wci.src = "../../images/raining.png";
                break;
            case 63:
            case 66:
            case 67:
                wci.src = "../../images/raining.png";
                break;
            case 65:
                wci.src = "../../images/raining.png";
                break;
            case 80:
            case 81:
            case 82:
                wci.src = "../../images/raining.png";
                break;
            case 71:
                wci.src = "../../images/light-snow.png";
                break;
            case 73:
            case 75:
            case 77:
            case 85:
            case 86:
                wci.src = "../../images/snow.png";
                break;
            case 95:
            case 96:
            case 99:
                wci.src = "../../images/thunder.png";
                break;
        }
        div.append(maxTemp, minTemp, wci, dateText, weekText);
        element.append(div);
        document.getElementById("grid").append(element);
        if ((i + 1) % 7 === skipCount) {
            let voidElement = document.createElement("div");
            voidElement.className = "void";
            document.getElementById("grid").append(voidElement);
        }
    }
}
function fillForecast(data) {
    let weekDay = getDate(data["current"]["time"]).getDay() + 1;
    let month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    for (let i = 15 - weekDay; i < 30; i++) {
        let element = document.createElement("div");
        let div = document.createElement("div");
        let date = getDate(data["daily"]["time"][i]);
        let dateText = document.createElement("span");
        let weekText = document.createElement("span");
        let maxTemp = document.createElement("span");
        let minTemp = document.createElement("span");
        let wci = document.createElement("img");
        element.style.position = "relative";
        div.style.display = "grid";
        div.style.gridTemplateColumns = "1fr 1fr";
        div.style.gridTemplateRows = "40px 60px 35px 35px";
        div.style.margin = "20px";
        if (i < 13) {
            let overlap = document.createElement("div");
            overlap.style.position = "absolute";
            overlap.style.width = "100%";
            overlap.style.height = "100%";
            overlap.style.background = "lightgrey";
            element.style.filter = "blur(2px)";
            overlap.style.opacity = "0.5";
            element.append(overlap);
        }
        if (i === 13) {
            element.style.background = "#b3deff";
        }
        if (i === 14)
            element.style.background = "#C4E2FB";
        wci.src = "../../images/sun.png";
        wci.style.width = "100%";
        wci.style.aspectRatio = "1 / 1";
        wci.style.gridColumn = "2";
        wci.style.gridRow = "span 2";
        maxTemp.textContent = Math.floor(data["daily"]["temperature_2m_max"][i]) + " ℃";
        maxTemp.style.whiteSpace = "nowrap"
        maxTemp.style.fontSize = "24px";
        maxTemp.style.textAlign = "center";
        minTemp.textContent = Math.floor(data["daily"]["temperature_2m_min"][i]) + " ℃";
        minTemp.style.fontSize = "20px";
        minTemp.style.color = "grey";
        minTemp.style.gridRow = "2";
        minTemp.style.textAlign = "center";
        dateText.textContent = date.getDate() + " " + month[date.getMonth()];
        dateText.style.fontSize = "20px";
        dateText.style.gridRow = "3";
        dateText.style.gridColumn = "span 2";
        weekText.textContent = week[date.getDay()];
        weekText.style.fontSize = "20px";
        weekText.style.gridRow = "4";
        weekText.style.gridColumn = "span 2";
        dateText.style.whiteSpace = "nowrap";
        if (date.getDay() >= 5)
            weekText.style.color = "#fc2f21";
        else
            weekText.style.color = "grey";
        switch (data["daily"]["weather_code"][i]) {
            case 0:
            case 1:
                wci.src = "../../images/sun.png";
                break;
            case 2:
            case 48:
                wci.src = "../../images/cloudy.png";
                break;
            case 3:
                wci.src = "../../images/cloud.png";;
                break;
            case 45:
                wci.src = "../../images/cloudy.png";
                break;
            case 51:
                wci.src = "../../images/cloudy.png";
                break;
            case 53:
            case 55:
            case 56:
            case 57:
                wci.src = "../../images/raining.png";
                break;
            case 61:
                wci.src = "../../images/raining.png";
                break;
            case 63:
            case 66:
            case 67:
                wci.src = "../../images/raining.png";
                break;
            case 65:
                wci.src = "../../images/raining.png";
                break;
            case 80:
            case 81:
            case 82:
                wci.src = "../../images/raining.png";
                break;
            case 71:
                wci.src = "../../images/light-snow.png";
                break;
            case 73:
            case 75:
            case 77:
            case 85:
            case 86:
                wci.src = "../../images/snow.png";
                break;
            case 95:
            case 96:
            case 99:
                wci.src = "../../images/thunder.png";
                break;
        }
        div.append(maxTemp, minTemp, wci, dateText, weekText);
        element.append(div);
        document.getElementById("grid").append(element);
        if ((i + 1) % 7 === (15 - weekDay) % 7) {
            let voidElement = document.createElement("div");
            voidElement.className = "void";
            document.getElementById("grid").append(voidElement);
        }
    }
}

getData("Москва","https://api.open-meteo.com/v1/forecast?latitude=55.7522&longitude=37.6156&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&past_days=14&forecast_days=16");
fillCitySelect();
"use strict"
import cities from './russian-cities.json' assert {type: 'json'};

function fillCitySelect() {
    let li = document.createElement("li");
    li.textContent = "Москва";
    document.getElementById("city").append(li);
    for (let city of cities) {
        if (city.name === "Москва")
            continue
        li = document.createElement("li");
        li.dataset["city"] = city["coords"]["lat"] + "|" + city["coords"]["lon"];
        li.textContent = city["name"];
        document.getElementById("city").append(li);
    }
}

document.getElementById("city-search").oninput = function () {
    let value = document.getElementById("city-search").value;
    for (let option of document.querySelectorAll("#city > li")) {
        option.style.display = (option.textContent.toLowerCase().startsWith(value.toLowerCase())) ? "block" : "none";
    }
}

fillCitySelect();
for (let li of document.querySelectorAll("#city li")) {
    li.onclick = function () {
        for (let li of document.querySelectorAll("#city li")) {
            li.style.background = "#f5f5d0";
        }
        li.style.background = "lightblue";
    }
}


document.querySelector("#switchLogin u").onclick = function () {
    document.getElementById("login").style.display = "flex";
    document.getElementById("registration").style.display = "none";
}
document.querySelector("#switchRegistration u").onclick = function () {
    document.getElementById("login").style.display = "none";
    document.getElementById("registration").style.display = "block";
}
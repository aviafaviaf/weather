"use strict"


document.getElementById("reg_question_form").onsubmit = function() {
    let input = document.getElementById("reg-question").value;
    if (input === "Да") {
        document.getElementById("reg-question-label").textContent = "Круто!";
    }
    else if (input === "2") {
        askLogin();
    }
    else {
        document.getElementById("reg-question-label").textContent = "Попробуй ещё раз";
    }
}

function askLogin() {
    let input = prompt("Введите логин");
    if (input === "Админ")
        askPassword();
    else if (input === null)
        alert("Отменено");
    else
        alert("Я вас не знаю");
}

function askPassword() {
    let input = prompt("Введите пароль");
    if (input === "Я главный")
        alert("Здравствуйте");
    else if (input === null)
        alert("Отменено");
    else
        alert("Неверный пароль");
}

let heartsSpawn = false;

for (let button of document.getElementsByClassName("like")) {
    button.onclick = function () {
        changeButtonColor(button);
        window.onclick = switchHeartsSpawn;
    }
}

function switchHeartsSpawn() {
    if (!heartsSpawn) {
        heartsSpawn = true;
        window.onmousemove = (e) => spawnHeart(e);
    }
    else {
        heartsSpawn = false;
        window.onclick = null;
        window.onmousemove = null;
    }
}

function spawnHeart(e) {
    let heart = document.createElement("span");
    heart.style.position = "absolute";
    heart.style.left = e.pageX.toString() + "px";
    heart.style.top = e.pageY.toString() + "px";
    heart.textContent = "❤";
    heart.style.zIndex = "20";
    document.body.appendChild(heart);
}



function changeButtonColor (button) {
    if (button.style.background === "ghostwhite" || !button.style.background)
        button.style.background = "#DE3163";
    else
        button.style.background = "ghostwhite";
}


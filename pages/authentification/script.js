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

function isEmpty(object) {
    return Object.keys(object).length === 0;
}

let captcha = {
    value: "",
    form: document.getElementById("captcha"),
    input: document.getElementById("captcha_input"),
    label: document.getElementById("captcha_label"),
    create() {
        this.value = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 8; i++) {
            this.value += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        this.label.textContent = this.value;
    },
    check() {
        if (isEmpty(this.input.value)) {
            return;
        }
        if (this.input.value === this.value.toString()) {
            this.close();
        }
        else {
            if (!Number.isInteger(this.value)) {
                this.setExpressionValue();
            }
            else {
                this.label.textContent = "Ошибка";
                this.input.style.visibility = "hidden";
            }
        }
    },
    close() {
        this.form.style.visibility = "hidden";
    },
    setExpressionValue() {
        let x =  Math.floor(Math.random() * 100);
        let y =  Math.floor(Math.random() * 100);
        this.value = x + y;
        this.label.textContent = x + " + " + y;
    }
};
captcha.create();

document.getElementById("captcha").onsubmit = function(){
    captcha.check();
}

function Accumulator(startingValue) {
    setTrashValue(startingValue);
    return {
        value: startingValue,
        read() {
            this.value += Number(prompt("Введите число, которое необходимо добавить"));
            setTrashValue(this.value);
        }
    }
}

let accumulator = Accumulator(8);
document.getElementById("trash").onclick = function () {
    accumulator.read();
}

function setTrashValue(value) {
    document.getElementById("trash").textContent = "Корзина: " + value;
}

function truncate(str, maxlength) {
    return (str.length <= maxlength) ? str : str.slice(0, maxlength - 3) + "...";
}

for (let card of document.querySelectorAll("#cards > div > div > div > p")) {
    card.textContent = truncate(card.textContent, 140);
}

function addNotification(text) {
    let notification = document.createElement("li");
    let notification_a = document.createElement("a");
    let button = document.createElement("button");
    button.className = "delete-notification";
    button.textContent = "✕";
    notification_a.textContent = text;
    notification.append(notification_a);
    notification.append(button);
    document.getElementById("ol-notifications").append(notification);
}


let notificationSpawn;
function startNotificationSpawn() {
    notificationSpawn =  setInterval(addNotification, 3000, "Завтра будет идти снег!");
}

startNotificationSpawn();

function delay(func, time) {
    return function () {
        setTimeout(() => func.apply(this, arguments), time);
    };
}

let notificationSpawnDelay = delay(startNotificationSpawn, 10000);

function delayNotificationSpawn() {
    if (notificationSpawn !== null) {
        clearInterval(notificationSpawn);
        notificationSpawnDelay();
        notificationSpawn = null;
    }
}

document.getElementById("delay_notifications").onclick = function () {
    delayNotificationSpawn();
}

document.getElementById("add_in_ul_list").onclick = function () {
    let list = document.getElementById("ul_list");
    let text = prompt("Введите текст");
    while (text) {
        let li = document.createElement("li");
        li.textContent = text;
        list.append(li);
        text = prompt("Введите текст");
    }
}

document.getElementById("add_notification").onclick = function () {
    let text = prompt("Введите текст");
    showNotification(text);
}


function showNotification(options) {
    let notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = options;
    setTimeout(function () {
        notification.style.display = "none";
    }, 3000);
    document.body.append(notification);
}

function placeImageInCenter() {
    let image = document.getElementById("img-center");
    let div = document.getElementById("center");
    div.style.left = (document.body.clientWidth - div.offsetWidth) / 2 + "px";
    image.style.left = (div.clientWidth - image.offsetWidth ) / 2 + "px";
    image.style.top = (div.clientHeight - image.offsetHeight) / 2 + "px";
}

placeImageInCenter();
window.onresize = placeImageInCenter;

window.onclick = function (e) {
    if (e.clientX < 1500)
        alert("x: " + e.clientX + ", y: " + e.clientY);
}
document.getElementById("ol-notifications").onclick = function (event) {
    if (event.target.tagName !== "BUTTON")
        return;
    event.target.parentNode.style.display = "none";
}

window.addEventListener("scroll", function () {
    document.body.style.backgroundPosition = "center " + (window.scrollY * 0.3) + "px";
});

window.addEventListener("scroll", function () {
    for (let element of document.querySelectorAll(".in-grid")) {
        if (scrollY > element.getBoundingClientRect().y  + scrollY)
            element.style.background = "#fae9c2";
        else element.style.background = "#ededff";
    }
});
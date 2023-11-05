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
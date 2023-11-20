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

function Product(name, price, productElement, buttonAdd, buttonDelete) {
    this.name = name;
    this.price = price;
    this.productElement = productElement;
    this.buttonAdd = buttonAdd;
    this.buttonDelete = buttonDelete;
    this.count = 1;
    this.addCount = function () {
        this.count += 1;
        this.productElement.firstChild.textContent = "x" + this.count + this.productElement.firstChild.textContent.slice(this.productElement.textContent.indexOf(" "), this.productElement.textContent.indexOf("|") + 2) + this.price * this.count + "₽";
        updateCart(cart);
    }
}

let cart = [];
for (let button of document.getElementsByClassName("shop")) {
    button.onclick = function () {
        let buttonAdd = document.createElement("button");
        buttonAdd.textContent = "+";
        buttonAdd.className = "addProduct";
        let buttonDelete = document.createElement("button");
        buttonAdd.style.margin = "0 10px 0 10px";
        buttonDelete.textContent = "🗑️";
        buttonDelete.className = "deleteProduct";
        buttonDelete.onclick = function () {
            deleteProduct(buttonDelete);
        };
        let text = document.createElement("span");
        text.textContent = "x1 " + button.textContent;
        let productElement = document.createElement("div");
        productElement.appendChild(text);
        productElement.appendChild(buttonAdd);
        productElement.appendChild(buttonDelete);
        let product = new Product( button.textContent.slice(0, button.textContent.indexOf("|") - 1), Number(button.textContent.slice(button.textContent.indexOf("|") + 2, button.textContent.indexOf("₽") - 1)), productElement, buttonAdd, buttonDelete )
        buttonAdd.onclick = function () {
            product.addCount();
        }
        cart.push(product);
        updateCart(cart);
    }
}

document.getElementById("clear-cart").onclick = function() {
    cart = [];
    updateCart(cart);
}
function updateCart(arr) {
    let cartElement = document.getElementById("cart");
    let price = 0;
    cartElement.innerHTML = '';
    for (let product of arr) {
        cartElement.appendChild(product.productElement);
        price += product.price * product.count;
    }
    document.getElementById("price").textContent = document.getElementById("price").textContent.slice(0, 6) + price + " ₽";
}

function deleteProduct(buttonDelete) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].buttonDelete === buttonDelete) {
            cart.splice(i, 1);
            updateCart(cart);
            break;
        }
    }
}

function filter(cart, botPrice, topPrice) {
    let newCart = [];
    if (!botPrice)
        botPrice = 0;
    if (!topPrice)
        topPrice = 100000;
    for (let product of cart) {
        if (!(product.price < botPrice || product.price >= topPrice))
            newCart.push(product);
    }
    return newCart;
}

document.getElementById("price-filter").onsubmit = function () {
    let filteredCart = filter(cart, document.getElementById("bottom-price").value, document.getElementById("top-price").value);
    updateCart(filteredCart);
}

document.getElementById("sort-ascending").onclick = function () {
    cart.sort(function(a, b) {
        return a.price - b.price;
    });
    updateCart(cart);
}

document.getElementById("sort-descending").onclick = function () {
    cart.sort(function(a, b) {
        return a.price - b.price;
    });
    cart.reverse();
    updateCart(cart);
}

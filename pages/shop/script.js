"use strict"
import products from './products.json' assert {type: 'json'};

function updateProducts(arr) {
    let productsElement = document.getElementById("products");
    productsElement.innerHTML = '';
    for (let prod of arr) {
        productsElement.appendChild(prod.productElement);
    }
}

function Product(name, price, productElement, productElementInCart, buttonAdd, buttonDelete) {
    this.name = name;
    this.price = price;
    this.productElement = productElement;
    this.productElementInCart = productElementInCart;
    this.buttonAdd = buttonAdd;
    this.buttonDelete = buttonDelete;
    this.count = 1;
    this.addCount = function () {
        this.count += 1;
        this.productElementInCart.firstChild.textContent = "x" + this.count + this.productElementInCart.firstChild.textContent.slice(this.productElementInCart.textContent.indexOf(" "), this.productElementInCart.textContent.indexOf("|") + 2) + this.price * this.count + "₽";
        updateCart(cart);
    }
}

let cart = [];
let prods = [];
for (let prod of products) {
    // в товарах
    let productElement = document.createElement("div");
    let productImage = document.createElement("img");
    let productButton = document.createElement("button");
    productImage.src = prod.image;
    productButton.textContent = prod.name + " | " + prod.price + " ₽";
    productButton.className = "shop btn-one";
    productElement.append(productImage);
    productElement.append(productButton);
    productElement.className = "product-div";
    // в корзине
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
    text.textContent = "x1 " + prod.name + " | " + prod.price + " ₽";
    let productCartElement = document.createElement("div");
    productCartElement.appendChild(text);
    productCartElement.appendChild(buttonAdd);
    productCartElement.appendChild(buttonDelete);
    let product = new Product(prod.name, prod.price, productElement, productCartElement, buttonAdd, buttonDelete);
    buttonAdd.onclick = function () {
        product.addCount();
    }
    prods.push(product);
}
updateProducts(prods);

for (let productElement of document.getElementsByClassName("product-div")) {
    productElement.onclick = function () {
        let button = productElement.lastChild;
        if (button.textContent === "В корзине") {
            document.getElementById("cart").scrollIntoView();
        }
        else {
            for (let prod of prods) {
                if (prod.productElement === productElement) {
                    prod.productElementInCart.firstChild.textContent = "x1 " + prod.name + " | " + prod.price + " ₽";
                    addProductInCart(prod);
                }
            }
            button.textContent = "В корзине";
            productElement.style.background = "lightblue";
        }

    }
}

function addProductInCart(product) {
    cart.push(product);
    updateCart(cart);
}

document.getElementById("clear-cart").onclick = function() {
    for (let i = 0; i < cart.length; i++) {
        cart[i].productElement.style.background = "#ededff";
        cart[i].productElement.lastChild.textContent = cart[i].name + " | " + cart[i].price + " ₽";
    }
    cart = [];
    updateCart(cart);
}
function updateCart(arr) {
    let cartElement = document.getElementById("cart");
    let price = 0;
    cartElement.innerHTML = '';
    for (let product of arr) {
        cartElement.appendChild(product.productElementInCart);
        price += product.price * product.count;
    }
    document.getElementById("price").textContent = document.getElementById("price").textContent.slice(0, 6) + price + " ₽";
}

function deleteProduct(buttonDelete) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].buttonDelete === buttonDelete) {
            cart[i].productElement.lastChild.textContent = cart[i].name + " | " + cart[i].price + " ₽";
            cart[i].productElement.style.background = "#ededff";
            cart[i].count = 1;
            cart.splice(i, 1);
            updateCart(cart);
            break;
        }
    }
}

document.getElementById("price-filter").onsubmit = function () {
    let filteredProds = prods.filter(function(product) {
        let bot = document.getElementById("bottom-price").value;
        let top = document.getElementById("top-price").value;
        bot = (bot) ? bot : 0;
        top = (top) ? top : 100000;
        if (!(product.price < bot || product.price >= top))
            return true;
    });
    updateProducts(filteredProds);
}

document.getElementById("sort-ascending").onclick = function () {
    prods.sort(function(a, b) {
        return a.price - b.price;
    });
    updateProducts(prods);
}

document.getElementById("sort-descending").onclick = function () {
    prods.sort(function(a, b) {
        return b.price - a.price;
    });
    updateProducts(prods);
}

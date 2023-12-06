"use strict"

for (let button of document.getElementsByClassName("like")) {
    button.onclick = function () {
        if (button.style.background === "ghostwhite" || !button.style.background) {
            button.style.background = "#DE3163";
            button.className = "like liked";
        }
        else {
            button.style.background = "ghostwhite";
            button.className = "like";
        }
    }
}
let images = [];
for (let image of document.getElementsByClassName("img_gallery")) {
    images.push(image);
}
document.getElementById("show-liked").onclick = function () {
    let button = document.getElementById("show-liked");
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    if (button.textContent.endsWith("понравившиеся")) {
        button.textContent = "Показать все";
        for (let image of images) {
            if (image.firstElementChild.className === "like liked") {
                gallery.appendChild(image);
            }
        }
    }
    else {
        button.textContent = "Показать понравившиеся";
        gallery.innerHTML = "";
        for (let image of images) {
            gallery.appendChild(image);
        }
    }
}
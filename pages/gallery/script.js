

for (let button of document.getElementsByClassName("like")) {
    button.onclick = function () {
        changeButtonColor(button);
    }
}

function changeButtonColor (button) {
    if (button.style.background === "ghostwhite" || !button.style.background)
        button.style.background = "#DE3163";
    else
        button.style.background = "ghostwhite";
}
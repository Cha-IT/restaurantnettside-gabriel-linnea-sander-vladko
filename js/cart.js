const cartAlert = document.querySelector("#shoppingcartAlert");
const cartCounter = document.querySelector("#CartNumber");

if(cartCounter.textContent == 0 || cartCounter.textContent == "" || cartCounter.textContent == "0") {
    cartAlert.style.visibility = "hidden";
    cartCounter.style.visibility = "hidden";
} else {
    cartAlert.style.visibility = "visible";
    cartCounter.style.visibility = "visible";
}
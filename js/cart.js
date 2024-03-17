const ProduktBakgrunn = document.querySelector("#shoppingcartAlert");
const antallProdukter = document.querySelector("#CartNumber");
const HandlekurvEl = document.querySelector("#ShoppingCart");

HandlekurvEl.addEventListener("click", VisHandlekurv);

let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || []; 

if (!cartItems.length) {
    nullstillHandlekurv();
}

if(antallProdukter.textContent == 0 || antallProdukter.textContent == "" || antallProdukter.textContent == "0") {
    ProduktBakgrunn.style.visibility = "hidden";
    antallProdukter.style.visibility = "hidden";
} else {
    ProduktBakgrunn.style.visibility = "visible";
    antallProdukter.style.visibility = "visible";
}

function LeggtilProdukt(p) {
    const produkt = p.target.closest(".Produkt-Container")
    const produktInfo = {
        navn: produkt.querySelector(".ProduktTittel").textContent,
        beskrivelse: produkt.querySelector(".Produkt_Informasjon").textContent,
        pris: produkt.querySelector(".Prislapp").textContent,
        bilde: produkt.querySelector("img").src,
    }
    cartItems.push(produktInfo);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    oppdaterHandlekurv()
}

function oppdaterHandlekurv() {
    antallProdukter.textContent = cartItems.length;
    if (cartItems.length > 0) {
        ProduktBakgrunn.style.visibility = "visible";
        antallProdukter.style.visibility = "visible";
    } else {
        ProduktBakgrunn.style.visibility = "hidden";
        antallProdukter.style.visibility = "hidden";
    }
}

function nullstillHandlekurv() {
    cartItems = [];
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    oppdaterHandlekurv();
}

function VisHandlekurv(){
    
}
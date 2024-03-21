const ProduktBakgrunn = document.querySelector("#shoppingcartAlert");
const antallProdukter = document.querySelector("#CartNumber");
const HandlekurvBtn = document.querySelector("#ShoppingCart");
const HandlekurvEl = document.querySelector("#ShoppingCart_Items")

HandlekurvBtn.addEventListener("click", VisHandlekurv);

let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

if (!cartItems.length) {
  nullstillHandlekurv();
}

if (
  antallProdukter.textContent == 0 ||
  antallProdukter.textContent == "" ||
  antallProdukter.textContent == "0"
) {
  ProduktBakgrunn.style.visibility = "hidden";
  antallProdukter.style.visibility = "hidden";
} else {
  ProduktBakgrunn.style.visibility = "visible";
  antallProdukter.style.visibility = "visible";
}

window.addEventListener("load", () => {
  oppdaterHandlekurv();
})

function LeggtilProdukt(p) {
  const produkt = p.target.closest(".Produkt-Container");
  const produktInfo = {
    navn: produkt.querySelector(".ProduktTittel").textContent,
    beskrivelse: produkt.querySelector(".Produkt_Informasjon").textContent,
    pris: produkt.querySelector(".Prislapp").textContent,
    bilde: produkt.querySelector("img").src,
    antall: 1,
  };

  let produktEksisterer = false;

  for(let i = 0; i < cartItems.length; i++) {
    if(cartItems[i].navn === produktInfo.navn) {
      cartItems[i].antall++;
      produktEksisterer = true;
      break;
    }
  }

  if(!produktEksisterer) {
    cartItems.push(produktInfo);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  oppdaterHandlekurv();
}

function oppdaterHandlekurv() {
  let ProduktTall = 0;

  cartItems.forEach(produkt => {
    ProduktTall += produkt.antall;
  });

  antallProdukter.textContent = ProduktTall;

  if (ProduktTall > 0) {
    ProduktBakgrunn.style.visibility = "visible";
    antallProdukter.style.visibility = "visible";
  } else {
    ProduktBakgrunn.style.visibility = "hidden";
    antallProdukter.style.visibility = "hidden";
  }

  if(ProduktTall >= 10) {
    antallProdukter.style.left = "5.5px"
  }
  if(ProduktTall >= 20) {
    antallProdukter.style.left = "4px"
  }
}

function nullstillHandlekurv() {
  cartItems = [];
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  oppdaterHandlekurv();
}

function VisHandlekurv() {
  HandlekurvBtn.removeEventListener("click", VisHandlekurv);
  HandlekurvBtn.addEventListener("click", LukkHandleKurv);

  HandlekurvEl.innerHTML = ''
  cartItems.forEach(produkt => {
    new CartProdukt(produkt, oppdaterHandlekurv, LukkHandleKurv);
  });

  const betalBtn = document.createElement("button");
  betalBtn.textContent = "Gå til handlekurv";
  betalBtn.classList.add("BetalBtn");

  if(cartItems.length >= 1) {
    HandlekurvEl.appendChild(betalBtn);
    HandlekurvEl.style.visibility = "visible";
  }

  function LukkHandleKurv() {
    HandlekurvEl.style.visibility = "hidden";
    HandlekurvBtn.removeEventListener("click", LukkHandleKurv);
    HandlekurvBtn.addEventListener("click", VisHandlekurv);
  }
}

class CartProdukt {
  constructor(produktInfo) {
    this.produktnavn = produktInfo.navn;
    this.bilde = produktInfo.bilde;
    this.antallProdukt = produktInfo.antall;
    this.oppdaterHandlekurv = oppdaterHandlekurv;
    this.LukkHandleKurv();
    this.opprettHandlekurvProdukt();
    this.appendProdukter();
  }

  opprettHandlekurvProdukt() {
    this.container = document.createElement("div");
    this.container.classList.add("ShoppingCart_Item");

    this.CartProduct = document.createElement("div");
    this.CartProduct.classList.add("CartProduct-Container");
    this.CartProduct.style.zIndex = "1";

    this.ProduktBilde = document.createElement("img");
    this.ProduktBilde.src = this.bilde;

    this.TekstContainer = document.createElement("div");
    this.Navn = document.createElement("p");
    this.Navn.textContent = this.produktnavn;

    this.Antall = document.createElement("p");
    this.Antall.style.fontFamily = "Poppins", "sans-serif"
    this.Antall.style.fontSize = "15px"
    this.Antall.textContent = "Antall: " +  this.antallProdukt;

    this.fjern = document.createElement("p");
    this.fjern.textContent = "Fjern";
    this.fjern.style.cursor = "pointer";
    this.fjern.style.width = "40px";
    this.fjern.addEventListener("click", () => {
      this.container.remove();
      cartItems = cartItems.filter(item => item.navn !== this.produktnavn);
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      oppdaterHandlekurv();

      if(cartItems.length <= 0) {
        this.LukkHandleKurv();
      }
    })
  }

  appendProdukter() {
    this.TekstContainer.append(this.Navn, this.Antall, this.fjern)
    this.CartProduct.append(this.ProduktBilde, this.TekstContainer)
    this.container.appendChild(this.CartProduct)
    HandlekurvEl.append(this.container)
  }

  LukkHandleKurv() {
    HandlekurvEl.style.visibility = "hidden";
    HandlekurvBtn.removeEventListener("click", this.LukkHandleKurv);
    HandlekurvBtn.addEventListener("click", VisHandlekurv);
  }
}

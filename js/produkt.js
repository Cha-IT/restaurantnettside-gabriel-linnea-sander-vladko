const menyEl = document.querySelector("#Meny-Container")

class Produkt {
    constructor(meny) {
        this.meny = meny;
        this.navn = this.meny.ProduktNavn;
        this.beskrivelse = this.meny.ProduktBeskrivelse;
        this.pris = this.meny.ProduktPris;
        this.bilde = this.meny.Bilde
        this.opprettProdukt();
    }

    opprettProdukt() {
        this.container = document.createElement("div");
        this.container.classList.add("Produkt-Container")

        this.Bildecontainer = document.createElement("div");
        this.Bildecontainer.classList.add("ProduktBilde-Container");

        this.Produktbilde = document.createElement("img");
        this.Produktbilde.src = this.bilde;
        this.Produktbilde.style.width = "200px"


        this.TekstContainer = document.createElement("div");
        this.TekstContainer.classList.add("Tekst-Container")
        
        this.tittel = document.createElement("p");
        this.tittel.textContent = this.navn;
        this.tittel.classList.add("ProduktTittel")

        this.forklaring = document.createElement("p");
        this.forklaring.textContent = this.beskrivelse;

        this.betalingContainer = document.createElement("div");        
        this.price = document.createElement("p");
        this.price.textContent = this.pris;
        this.price.classList.add("Prislapp")
        this.shoppi


        this.Bildecontainer.appendChild(this.Produktbilde)
        this.TekstContainer.append(this.tittel, this.forklaring, this.price)
        this.container.append(this.Bildecontainer, this.TekstContainer);
        menyEl.appendChild(this.container)
    }
}

fetch("/js/json/meny.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((meny) => new Produkt(meny));
    })
    .catch((error) => {
        console.error("Feil ved innhenting av JSON Data: ", error)
    })
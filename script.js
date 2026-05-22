"use strict";
//Her starter fjerde commit som er js af produktkortet så det gør de forskellige knapper klikbare

/* Denne kode opretter et dataobjekt med alle produktfarver og deres tilhørende billeder, så galleriet kan skifte indhold alt efter hvilken farve brugeren vælger. */
  const productData = {
    dustyRose: {
        name: "DUSTY ROSE",
      images: [
        "img/dusty-rose-1.png",
        "img/dusty-rose-2.png",
        "img/dusty-rose-3.png",
        "img/dusty-rose-4.png"
      ]
    },
    sageGreen: {
      name: "Sage Green",
      images: [
        "img/sage-green-1.png",
        "img/sage-green-2.png",
        "img/sage-green-3.png",
        "img/sage-green-4.png"
      ]
    },
    moonlightWhite: {
      name: "Moonlight White",
      images: [
        "img/moonlight-white-1.png",
        "img/moonlight-white-2.png",
        "img/moonlight-white-3.png",
        "img/moonlight-white-4.png"
      ]
    },
    lavenderMist: {
      name: "LAVENDER MIST",
      images: [
        "img/lavender-mist-1.png",
        "img/lavender-mist-2.png",
        "img/lavender-mist-3.png",
        "img/lavender-mist-4.png"
      ]
    }
  };
/* Disse variabler gemmer den aktuelle tilstand for produktvisningen: hvilken farve der er valgt, hvilket billede der vises, og hvor mange produkter brugeren vil købe. */
  let currentColor = "dustyRose";
  let currentImageIndex = 0;
  let quantity = 1;

  /* Her hentes de HTML-elementer, som JavaScript skal opdatere eller lytte på, fx hovedbillede, thumbnails, farveknapper og antal. */
  const mainImage = document.getElementById("mainProductImage");
  const thumbnailRow = document.getElementById("thumbnailRow");
  const colorName = document.getElementById("selectedColorName");
  const colorDots = document.querySelectorAll(".color-dot");
  const quantityElement = document.getElementById("quantity");

  /* Denne funktion opdaterer hele galleriet ud fra den valgte farve og det aktuelle billede, så både hovedbillede, farvenavn, thumbnails og aktiv farve vises korrekt. */
  function renderGallery() {
    const images = productData[currentColor].images;

    mainImage.src = images[currentImageIndex];
    colorName.textContent = productData[currentColor].name;

    thumbnailRow.innerHTML = "";

    images.forEach((image, index) => {
      const thumb = document.createElement("img");
      thumb.src = image;
      thumb.alt = `Produktbillede ${index + 1}`;
      thumb.className = "thumbnail";

      if (index === currentImageIndex) {
        thumb.classList.add("active");
      }

      thumb.addEventListener("click", () => {
        currentImageIndex = index;
        renderGallery();
      });

      thumbnailRow.appendChild(thumb);
    });

    colorDots.forEach(dot => {
      dot.classList.toggle("active", dot.dataset.color === currentColor);
    });
  }
/* Denne klikfunktion skifter til det forrige billede i galleriet og starter forfra når brugeren er nået til første billede. */
  document.getElementById("prevImage").addEventListener("click", () => {
    const images = productData[currentColor].images;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    renderGallery();
  });
/* Denne klikfunktion skifter til det næste billede i galleriet og går tilbage til starten når sidste billede er nået. */
  document.getElementById("nextImage").addEventListener("click", () => {
    const images = productData[currentColor].images;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    renderGallery();
  });
/* Denne kode gør farveknapperne klikbare, så den valgte farve ændrer både farvenavn og billedserie i galleriet. */
  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentColor = dot.dataset.color;
      currentImageIndex = 0;
      renderGallery();
    });
  });

/* Disse to klikfunktioner styrer antalvælgeren, så brugeren kan øge eller mindske antallet af produkter uden at komme under 1. */
  document.getElementById("increaseQty").addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
  });

  document.getElementById("decreaseQty").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
    }
  });

/* Her kaldes funktionen første gang, så galleriet bliver vist korrekt allerede når siden loader. */
  renderGallery();


/* Denne kode henter de elementer, som bruges til popupen når et produkt bliver lagt i kurven. */
const addToCartBtn = document.getElementById("addToCartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closePopup = document.getElementById("closePopup");
const continueShopping = document.getElementById("continueShopping");
const cartCount = document.getElementById("cartCount");

/* Når brugeren klikker på købsknappen, kopieres det valgte antal over i popupen, og overlayet bliver synligt. */
addToCartBtn.addEventListener("click", () => {
  cartCount.textContent = quantityElement.textContent;
  cartOverlay.classList.add("active");
});

/* Denne klikfunktion lukker popupen når brugeren trykker på krydset. */
closePopup.addEventListener("click", () => {
  cartOverlay.classList.remove("active");
});

continueShopping.addEventListener("click", () => {
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", (event) => {
  if (event.target === cartOverlay) {
    cartOverlay.classList.remove("active");
  }
});
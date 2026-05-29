"use strict";

const mainImage = document.getElementById('mainImage');// det store produktbillede fra HTML'en. Det er dette billede, der skifter, når man klikker på pile eller thumbnails.
const thumbnailsContainer = document.getElementById('thumbnails'); // containeren, hvor alle de små thumbnail-billeder skal ligge.
const leftArrow = document.querySelector('.arrow.left'); // venstre pil i karusellen.
const rightArrow = document.querySelector('.arrow.right'); // højre pil i karusellen.
const productName = document.getElementById('productName'); // produktets navn fra HTML'en.
const productDescription = document.getElementById('productDescription'); //produktbeskrivelsen fra HTML'en.
const productPrice = document.getElementById('productPrice'); //produktets pris fra HTML'en.
const quantityInput = document.getElementById('quantity'); //inputfeltet, hvor brugeren vælger antal.
const variantSelect = document.getElementById('variant'); // dropdown-menuen, hvor brugeren vælger variant/farve.
const addToCartButton = document.getElementById('addToCart'); // knappen, som bruges til at lægge produktet i kurven.
const confirmationMessage = document.getElementById('confirmationMessage'); // beskeden, der vises, når produktet er lagt i kurven.

// Objekt med alle informationer om produktet.
const product = {
    name: 'LUMINA One',
    description: 'LUMINA One er en bærbar højttaler skabt til sociale øjeblikke. Den kombinerer kraftfuld lyd med et nordisk, æstetisk design, der passer naturligt ind i både hjemmet og udendørslivet.',
    price: " 1499.00",
     // Et array med stier til produktbillederne.
    images: [
        'img/dusty-rose-1.png',
        'img/sage-green-1.png',
        'img/moonlight-white-1.png',
        'img/lavender-mist-1.png'
    ],
     // Et array med produktets forskellige varianter/farver.
    variants: [
        {
            name: 'Dusty Rose'
        },
        {
            name: 'Sage Green'
        },
        {
            name: 'Moonlight White'
        },
        {
            name: 'Lavender Mist'
        }
    ]
};

let images = product.images;//produktets billeder i en variabel så jeg nemt kan bruge billederne i resten af koden.
let currentIndex = 0; // currentIndex holder styr på, hvilket billede der vises lige nu.

// Denne funktion indlæser produktets data på siden.
const loadProductData = () => {
    productName.textContent = product.name; // Sætter produktnavnet i h1-elementet.
    productDescription.textContent = product.description; // Sætter produktbeskrivelsen ind i beskrivelsesfeltet.
    productPrice.textContent = `${product.price} kr.`; // Sætter prisen ind og tilføjer "kr." efter beløbet.

    populateVariants(); // Kalder funktionen, der laver dropdown-menuen med varianter.
    populateCarousel(); // Kalder funktionen, der laver billedkarusellen.
};

const populateVariants = () => { // Denne funktion opretter alle valgmulighederne i dropdown-menuen.
    variantSelect.innerHTML = ''; // Tømmer dropdown-menuen, så der ikke ligger gamle options.
    product.variants.forEach((variant, index) => { // Går igennem hver variant i product.variants.
        const option = document.createElement('option'); // Opretter et nyt option-element til dropdown-menuen.
        option.value = variant.name; // Sætter optionens value til variantens navn.
        option.textContent = variant.name; // Sætter den tekst, brugeren kan se i dropdown-menuen.
        variantSelect.appendChild(option); // Tilføjer option-elementet til dropdown-menuen.
    });
};

const populateCarousel = () => { // Denne funktion opbygger billedkarusellen. Den sætter det første billede som hovedbillede og laver thumbnails.
    if (!images.length) return; // Hvis der ikke findes nogen billeder, stopper funktionen her.

    mainImage.src = images[0]; // Sætter hovedbilledet til det første billede i images-arrayet.
    currentIndex = 0; // Sætter currentIndex tilbage til 0, så første billede er aktivt.

    thumbnailsContainer.innerHTML = '';  // Tømmer thumbnails-containeren, så der ikke kommer dubletter.

    images.forEach((src, index) => { // Går igennem hvert billede i images-arrayet.
        const thumbnailDiv = document.createElement('div'); // Opretter en div, som skal indeholde thumbnail-billedet.
        thumbnailDiv.className = `thumbnail ${index === 0 ? 'active' : ''}`; // Giver div'en klassen "thumbnail".  Hvis det er det første billede, får den også klassen "active".
        thumbnailDiv.dataset.index = index; // Gemmer billedets index som data på thumbnail-div'en.

        const imgElement = document.createElement('img'); // Opretter selve img-elementet inde i thumbnailen.
        imgElement.src = src; // Sætter billedets src til den aktuelle billedsti.
        imgElement.alt = `${product.name} billede ${index + 1}`; // Sætter en alt-tekst, som er god for tilgængelighed.

        thumbnailDiv.appendChild(imgElement);  // Lægger img-elementet ind i thumbnail-div'en.
        thumbnailsContainer.appendChild(thumbnailDiv); // Lægger thumbnail-div'en ind i thumbnails-containeren på siden.

        thumbnailDiv.addEventListener('click', () => { // Tilføjer en click-event til thumbnailen. Når brugeren klikker på en thumbnail, skifter hovedbilledet.
            updateMainImage(index);
        });
    });
};

const updateMainImage = (index) => { // Denne funktion skifter hovedbilledet. Den tager et index som parameter, så den ved hvilket billede der skal vises.
    currentIndex = index; // Opdaterer currentIndex til det billede, brugeren har valgt.
    mainImage.src = images[currentIndex]; // Skifter hovedbilledets src til billedet på det valgte index.

    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {  // Finder alle thumbnails på siden.
        thumb.classList.toggle('active', i === index); // Tilføjer klassen "active" til den thumbnail, der matcher index. Fjerner samtidig "active" fra de andre thumbnails.
    });
};

variantSelect.addEventListener('change', () => { // Her tilføjer jeg en change-event til dropdown-menuen. Den kører, når brugeren vælger en anden variant/farve.
    const selectedOption = variantSelect.options[variantSelect.selectedIndex]; // Finder den option, der er valgt i dropdown-menuen.
    const selectedImage = selectedOption.dataset.image; // Henter billedet fra optionens data-image-attribut.

    const imageIndex = images.indexOf(selectedImage); // Finder indexet for det valgte billede i images-arrayet.

    if (imageIndex !== -1) { // Hvis billedet findes i arrayet, skifter vi hovedbilledet.
        updateMainImage(imageIndex);
    }
});

const validateQuantity = () => { //Denne funktion tjekker, om antallet er gyldigt. Knappen deaktiveres, hvis antallet er tomt, ikke et tal eller mindre end 1.
    const quantityValue = parseInt(quantityInput.value); // Laver inputværdien om til et heltal.
    addToCartButton.disabled = isNaN(quantityValue) || quantityValue < 1; //Hvis værdien ikke er et tal eller er under 1, bliver "Læg i kurv"-knappen disabled.
};

leftArrow.addEventListener('click', () => { // Her tilføjer vi en click-event til venstre pil.
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Går ét billede tilbage. Modulo (%) gør, at karusellen går rundt i ring. Hvis man står på første billede, går den til sidste billede.
    updateMainImage(currentIndex); // Opdaterer hovedbilledet.
});

rightArrow.addEventListener('click', () => { // Her tilføjer vi en click-event til højre pil. Samme princip som ovenover
    currentIndex = (currentIndex + 1) % images.length;
    updateMainImage(currentIndex);
});

quantityInput.addEventListener('input', validateQuantity); // Denne event kører, hver gang brugeren ændrer antal-feltet. Den bruges til at validere, om brugeren har skrevet et gyldigt antal.

addToCartButton.addEventListener('click', () => { //Her tilføjer vi en click-event til "Læg i kurv"-knappen.
    const selectedOption = variantSelect.options[variantSelect.selectedIndex]; // Finder den variant/farve, som brugeren har valgt.

    const selectedProduct = { // Opretter et objekt med det produkt, brugeren vil lægge i kurven.
        name: productName.textContent, // Produktets detaljer hentes direkte fra HTML'en.
        description: productDescription.textContent,
        price: productPrice.textContent,
        quantity: quantityInput.value,
        variant: selectedOption.value,
    };

    console.log(selectedProduct); // Skriver produktet i konsollen. Det er nyttigt til test, så man kan se, hvad der ville blive lagt i kurven.

    confirmationMessage.textContent = 'Produktet er lagt i kurven!'; // Ændrer teksten i confirmationMessage.
    confirmationMessage.classList.remove('hidden'); // Fjerner klassen "hidden", så beskeden bliver synlig.
    confirmationMessage.classList.add('toast'); // Tilføjer klassen "toast", så beskeden kan styles som en popup/besked.

    setTimeout(() => confirmationMessage.classList.add('hidden'), 3000); // Efter 3 sekunder bliver beskeden skjult igen.
});

// Til sidst kaldes loadProductData.
// Det starter hele siden op ved at indsætte produktdata,
// lave dropdown-menuen og opbygge billedkarusellen.
loadProductData();
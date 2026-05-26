"use strict";

const mainImage = document.getElementById('mainImage');
const thumbnailsContainer = document.getElementById('thumbnails');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');
const quantityInput = document.getElementById('quantity');
const variantSelect = document.getElementById('variant');
const addToCartButton = document.getElementById('addToCart');
const confirmationMessage = document.getElementById('confirmationMessage');

const product = {
    name: 'LUMINA One',
    description: 'LUMINA One er en bærbar højttaler skabt til sociale øjeblikke. Den kombinerer kraftfuld lyd med et nordisk, æstetisk design, der passer naturligt ind i både hjemmet og udendørslivet.',
    price: " 1499.00",
    images: [
        'img/dusty-rose-1.png',
        'img/sage-green-1.png',
        'img/moonlight-white-1.png',
        'img/lavender-mist-1.png'
    ],
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

let images = product.images;
let currentIndex = 0;

const loadProductData = () => {
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    productPrice.textContent = `${product.price} kr.`;

    populateVariants();
    populateCarousel();
};

const populateVariants = () => {
    variantSelect.innerHTML = '';

    product.variants.forEach((variant, index) => {
        const option = document.createElement('option');
        option.value = variant.name;
        option.textContent = variant.name;
        option.dataset.image = variant.image;
        option.dataset.color = variant.color;

        variantSelect.appendChild(option);
    });
};

const populateCarousel = () => {
    if (!images.length) return;

    mainImage.src = images[0];
    currentIndex = 0;

    thumbnailsContainer.innerHTML = '';

    images.forEach((src, index) => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnailDiv.dataset.index = index;

        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = `${product.name} billede ${index + 1}`;

        thumbnailDiv.appendChild(imgElement);
        thumbnailsContainer.appendChild(thumbnailDiv);

        thumbnailDiv.addEventListener('click', () => {
            updateMainImage(index);
        });
    });
};

const updateMainImage = (index) => {
    currentIndex = index;
    mainImage.src = images[currentIndex];

    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
};

variantSelect.addEventListener('change', () => {
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const selectedImage = selectedOption.dataset.image;

    const imageIndex = images.indexOf(selectedImage);

    if (imageIndex !== -1) {
        updateMainImage(imageIndex);
    }
});

const validateQuantity = () => {
    const quantityValue = parseInt(quantityInput.value);
    addToCartButton.disabled = isNaN(quantityValue) || quantityValue < 1;
};

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateMainImage(currentIndex);
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateMainImage(currentIndex);
});

quantityInput.addEventListener('input', validateQuantity);

addToCartButton.addEventListener('click', () => {
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];

    const selectedProduct = {
        name: productName.textContent,
        description: productDescription.textContent,
        price: productPrice.textContent,
        quantity: quantityInput.value,
        variant: selectedOption.value,
        color: selectedOption.dataset.color
    };

    console.log(selectedProduct);

    confirmationMessage.textContent = 'Produktet er lagt i kurven!';
    confirmationMessage.classList.remove('hidden');
    confirmationMessage.classList.add('toast');

    setTimeout(() => confirmationMessage.classList.add('hidden'), 3000);
});

loadProductData();
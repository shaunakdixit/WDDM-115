const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

let products = [];
let chosenProduct;

function fetchData() {
  fetch('https://raw.githubusercontent.com/shaunakdixit/WDDM-115/main/products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      if(products.length > 0) {
        chosenProduct = products[0];
        updateProductDisplay(chosenProduct);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}  

fetchData();

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

function updateProductDisplay(product) {
    currentProductTitle.textContent = product.title;
    currentProductPrice.textContent = `$${product.price}`;
    currentProductImg.src = product.colors[0].img;
}

function updateColorSelection(colorIndex) {
    currentProductImg.src = chosenProduct.colors[colorIndex].img;
}

let selectedSizeElement = null;

function updateSizeSelection(selectedSize) {
  if (selectedSizeElement) {
    selectedSizeElement.style.backgroundColor = "white";
    selectedSizeElement.style.color = "black";
  }
  selectedSizeElement = selectedSize;
  selectedSizeElement.style.backgroundColor = "black";
  selectedSizeElement.style.color = "white";
}

function addEventListeners(elements, eventType, handler) {
  elements.forEach(element => {
    element.addEventListener(eventType, handler);
  });
}

addEventListeners(menuItems, 'click', (event) => {
  const index = Array.from(menuItems).indexOf(event.target);
  wrapper.style.transform = `translateX(${-100 * index}vw)`;
  chosenProduct = products[index];
  updateProductDisplay(chosenProduct);
});

addEventListeners(currentProductColors, 'click', (event) => {
  const index = Array.from(currentProductColors).indexOf(event.target);
  updateColorSelection(index);
});

addEventListeners(currentProductSizes, 'click', (event) => {
  updateSizeSelection(event.target);
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

addEventListeners(currentProductColors, 'mouseover', (event) => {
  event.target.style.border = "10px solid white";
});

addEventListeners(currentProductColors, 'mouseout', (event) => {
  event.target.style.border = "none";
});

addEventListeners([currentProductImg], 'mouseenter', () => {
  currentProductImg.style.border = '2px solid red';
});

addEventListeners([currentProductImg], 'mouseleave', () => {
  currentProductImg.style.border = 'none';
});

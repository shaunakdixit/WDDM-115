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

function updateSizeSelection(selectedSize) {
    currentProductSizes.forEach(size => {
        size.style.backgroundColor = "white";
        size.style.color = "black";
    });
    selectedSize.style.backgroundColor = "black";
    selectedSize.style.color = "white";
}

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
        chosenProduct = products[index];
        updateProductDisplay(chosenProduct);
    });
});

currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        updateColorSelection(index);
    });
});

currentProductSizes.forEach(size => {
    size.addEventListener("click", () => {
        updateSizeSelection(size);
    });
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

currentProductColors.forEach((color, index) => {
  color.addEventListener("mouseover", () => {
    color.style.border = "10px solid white";
  });

  color.addEventListener("mouseout", () => {
    color.style.border = "none";
  });
});

currentProductImg.addEventListener("mouseenter", () => {
  currentProductImg.style.border = "2px solid red";
});

currentProductImg.addEventListener("mouseleave", () => {
  currentProductImg.style.border = "none";
});

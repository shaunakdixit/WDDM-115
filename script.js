// Selecting elements from the DOM
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

// Product data
const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  // ... (similar data for other products)
];

// Initial selected product
let choosenProduct = products[0];

// DOM elements for displaying current product information
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

// Event listener for menu items
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Change the chosen product
    choosenProduct = products[index];

    // Update texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    // Assign new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

// Event listener for color selection
currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

// Event listener for size selection
currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    // Reset styles for all sizes
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });

    // Apply selected styles
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

// Event listener for displaying payment modal
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

// Event listener for closing payment modal
close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Event listeners for color hover effects
currentProductColors.forEach((color, index) => {
  color.addEventListener("mouseover", () => {
    color.style.border = "10px solid white"; // Change border on hover
  });

  color.addEventListener("mouseout", () => {
    color.style.border = "none"; // Revert border on mouseout
  });
});

// Event listeners for image hover effects
currentProductImg.addEventListener("mouseenter", () => {
  currentProductImg.style.border = "2px solid red"; // Change border on mouseenter
});

currentProductImg.addEventListener("mouseleave", () => {
  currentProductImg.style.border = "none"; // Revert border on mouseleave
});

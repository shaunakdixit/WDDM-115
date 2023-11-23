const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
let products = []

function fetchData() {

  fetch('https://raw.githubusercontent.com/shaunakdixit/WDDM-115/main/products.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      products = data;
    })
    .catch(error => console.error('Error fetching data:', error));
}  

fetchData();

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");


menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
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
    color.style.border = "10px solid white"; // Change border on hover
  });

  color.addEventListener("mouseout", () => {
    color.style.border = "none"; // Revert border on mouseout
  });
});


currentProductImg.addEventListener("mouseenter", () => {
  currentProductImg.style.border = "2px solid red"; // Change border on mouseenter
});

currentProductImg.addEventListener("mouseleave", () => {
  currentProductImg.style.border = "none"; // Revert border on mouseleave
});


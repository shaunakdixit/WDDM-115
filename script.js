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
          for(let i=0; i<products.length;i++){
              console.log("Data Stored in local storage")
              localStorage.setItem(`product_${i}`, JSON.stringify(products[i]))
          }
        chosenProduct = getProductFromLocalStorage(0);
        updateProductDisplay(chosenProduct);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}
// Function to get a product from local storage by index
function getProductFromLocalStorage(index) {
    const product = localStorage.getItem(`product_${index}`);
    console.log("Data Fetched from local storage: ",{product})
    return JSON.parse(product);
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

// addEventListeners([currentProductImg], 'mouseenter', () => {
//   currentProductImg.style.border = '2px solid red';
// });

addEventListeners([currentProductImg], 'mouseleave', () => {
  currentProductImg.style.border = 'none';
});


$(document).ready(function() {

    // Slide-in Animation for Menu Items
    $('.menuItem').hover(function() {
        $(this).animate({ marginLeft: "10px" }, 200);
    }, function() {
        $(this).animate({ marginLeft: "0px" }, 200);
    });

    // Bouncing Effect on Product Images
    $('.productImg').on('click', function() {
        $(this).effect("bounce", { times: 2.5 }, 700);
    });

    // Initially hide the product details
    $('.productDetails').hide();

    // Fade in the product details on click
    $('.product').on('click', function() {
        $(this).find('.productDetails').fadeIn();
    });

    // Zoom Effect on Hovering Over Product Images
    $('.productImg').hover(function() {
        $(this).animate({ width: "70%" });
    }, function() {
        $(this).animate({ width: "55%" });
    });

    // Pulse Effect on 'Buy Now' Buttons
    $('.buyButton').hover(function() {
        $(this).effect("pulsate", { times: 1 }, 900);
    });

    // Applying Ken Burns effect
    $('.sliderImg').css({ 'transform-origin': 'center center', scale: '1.0' }).animate({
        scale: '1.1'
    }, {
        duration: 10000, // Duration of the animation
        step: function(now, fx) {
            $(this).css('transform', `scale(${now})`);
        },
        complete: function() {
            // Animation complete. You can add more actions here if needed.
        }
    });

    // Subtle Rotation on Gallery Images
    $('.galleryImg').hover(function() {
        $(this).toggleClass('rotate-img');
    });

    // Expand/Collapse Description
    $('.product-description-toggle').click(function() {
        $(this).next('.product-description').slideToggle();
    });

    // Shake Effect
    $('.fListItem').hover(function() {
        $(this).effect("shake", { distance: 5 }, 500);
    });

    // Expand Width on Focus
    $('.searchInput').on('focus', function() {
        $(this).animate({ width: '+=20px' }, 300);
    }).on('blur', function() {
        $(this).animate({ width: '-=20px' }, 300);
    });

    // Glow Effect on Hover
    $('.searchInput').hover(function() {
        $(this).css('box-shadow', '0 0 8px #FFF');
    }, function() {
        $(this).css('box-shadow', 'none');
    });


    // Hover Effect on Winter Sale Section
    $('.nsImg').hover(function() {
        $(this).animate({ 'zoom': 1.05 }, 400);
    }, function() {
        $(this).animate({ 'zoom': 1 }, 400);
    });

    // Newsletter Animation
    $('#newsletter-submit').on('click', function(e) {
        e.preventDefault();
        $(this).animate({
            width: '+=10px' // Slightly increase the width
        }, {
            duration: 1000, // Duration of the animation
            easing: 'easeOutElastic', // Apply the easeOutElastic effect
            complete: function() {
                $(this).animate({ width: '-=10px' }, 1000); // Return to original width
            }
        });
    });

    $(document).ready(function() {
        // Event listener for the Checkout button
        console.log("Card data getting stored")
        $('.payButton').click(function() {
            // Capture card data
            var name = $('input[placeholder="John Doe"]').val();
            var phone = $('input[placeholder="+1 234 5678"]').val();
            var address = $('input[placeholder="Elton St 21 22-145"]').val();
            var cardNumber = $('input[placeholder="Card Number"]').val();
            var expMonth = $('input[placeholder="mm"]').val();
            var expYear = $('input[placeholder="yyyy"]').val();
            var cvv = $('input[placeholder="cvv"]').val();

            // Create an object to store
            var cardData = {
                name: name,
                phone: phone,
                address: address,
                cardNumber: cardNumber,
                expMonth: expMonth,
                expYear: expYear,
                cvv: cvv
            };
            console.log("card data getting stores: ",{cardData})

            // Save to local storage
            localStorage.setItem('cardData', JSON.stringify(cardData));
            $('.payment').hide();
        });
    });



});

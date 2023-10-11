const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;

productImages.forEach((item, i) => {
  item.addEventListener("click", () => {
    productImages[activeImageSlide].classList.remove("active");
    item.classList.add("active");
    productImageSlide.style.backgroundImage = `url('${item.src}')`;
    activeImageSlide = i;
  });
});

//toggle size buttons

const sizeBtns = document.querySelectorAll(".size-radio-btn");
let checkdBtn = 0;

sizeBtns.forEach((item, i) => {
  item.addEventListener("click", () => {
    sizeBtns[checkdBtn].classList.remove("check");
    item.classList.add("check");
    checkdBtn = i;
  });
});

// JavaScript code to handle quantity controls
document.addEventListener("DOMContentLoaded", function () {
  const quantityContainer = document.querySelector(".quantity");
  const quantityInput = quantityContainer.querySelector("input");
  const quantityMinus = quantityContainer.querySelector(".quantity-minus");
  const quantityPlus = quantityContainer.querySelector(".quantity-plus");

  quantityMinus.addEventListener("click", function () {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 0) {
      quantityInput.value = currentValue - 1;
    }
  });

  quantityPlus.addEventListener("click", function () {
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
});

let checkdBtn = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchId = urlParams.get('ID');

window.onload = function () {
  products = JSON.parse(localStorage.getItem("product")) || [];
  productInCart = JSON.parse(localStorage.getItem("productInCart")) || [];
}
// size do
window.addEventListener('load', function() {
  if (products.length > 1) {

    searchProduct();

    sizeBtns = document.querySelectorAll(".size-radio-btn");
    sizeBtns.forEach((item, i) => {
      item.addEventListener("click", () => {
        sizeBtns[checkdBtn].classList.remove("check");
        item.classList.add("check");
        checkdBtn = i;
      });
    });
  }
});




function searchProduct() {
  if (products !== undefined) {
      products.forEach(item => {
          if (item.ID.toString()=== searchId) {
              addProduct(item);
          }
      });
  }
}

//


function addProduct(item){
  const addproduct = document.querySelector(".product-details");
  addproduct.innerHTML=`
  <div class="image-slider">
    <img src="${item.img}" alt="">
  </div>

  <div class="details">
    <h2 class="product-brand">${item.brand}</h2>
    <p class="product-short-des">${item.name}</p>
    <span class="product-price">${item.price}</span>

    <p class="product-sub-headding">Chọn kích thước</p>

    <input type="radio" name="size" value="s" checked hidden id="s-size">
    <label for="s-size" class="size-radio-btn check">s</label>
    <input type="radio" name="size" value="m" hidden id="m-size">
    <label for="s-size" class="size-radio-btn">m</label>
    <input type="radio" name="size" value="l" hidden id="l-size">
    <label for="s-size" class="size-radio-btn">l</label>
    <input type="radio" name="size" value="xl" hidden id="xl-size">
    <label for="s-size" class="size-radio-btn">xl</label>
    <input type="radio" name="size" value="xxl" hidden id="xxl-size">
    <label for="s-size" class="size-radio-btn">xxl</label>

    <div class="btn-group">
        <br>
        <buttom  onclick='addToCart(${item.ID})' class="btn">Thêm vào vỏ hàng</buttom>
    </div>
  </div>
  
  `;
}
// Khai báo mảng productInCart để lưu trữ sản phẩm trong giỏ hàng
var productInCart = [];

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(ID) {
  let checkProduct = productInCart.some(value => value.ID === ID);

  if (!checkProduct) {
      let product = products.find(value => value.ID === ID);
      productInCart.unshift({
          ...product,
          quantity: 1
      });
  } else {
      let product = productInCart.find(value => value.ID === ID);
      let getIndex = productInCart.findIndex(value => value.ID === ID);
      productInCart[getIndex] = {
          ...product,
          quantity: ++product.quantity
      };
  }

  // Lưu mảng productInCart vào localStorage sau khi thêm sản phẩm
  localStorage.setItem('productInCart', JSON.stringify(productInCart));
}





document.getElementById("nike").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=nike";
});

document.getElementById("adidas").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=adidas";
});

document.getElementById("gucci").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=gucci";
});

document.getElementById("chanel").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=chanel";
});

document.getElementById("louisvuitton").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=louisvuitton";
});


const sizeBtns = document.querySelectorAll(".size-radio-btn");
let checkdBtn = 0;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchId = urlParams.get('query');

window.onload = function () {
  products = JSON.parse(localStorage.getItem("product")) || [];
}
// size do
sizeBtns.forEach((item, i) => {
  item.addEventListener("click", () => {
    sizeBtns[checkdBtn].classList.remove("check");
    item.classList.add("check");
    checkdBtn = i;
  });
});

function searchProduct(searchId){
  foundItems = [];
  if(products !== undefined)
  products.forEach(item => {
      if(item.id===searchId){
        addProduct(item);
      }
  });
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
    <p class="product-short-des">write-here</p>
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
        <button class="btn cart-btn">Thêm vào danh sách</button>
        <buttom class="btn">Thêm vào vỏ hàng</buttom>
    </div>
  </div>
  
  `;
}
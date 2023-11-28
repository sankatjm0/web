let checkdBtn = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchId = urlParams.get('ID');

products = JSON.parse(localStorage.getItem("product")) || [];

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

function searchProduct() {
  if (products !== undefined) {
    products.forEach(item => {
      if (item.ID.toString() === searchId) {
        addProduct(item);
      }
    });
  }
}

function addProduct(item) {
  const addproduct = document.querySelector(".product-details");
  addproduct.innerHTML = `
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
    <label for="m-size" class="size-radio-btn">m</label>
    <input type="radio" name="size" value="l" hidden id="l-size">
    <label for="l-size" class="size-radio-btn">l</label>
    <input type="radio" name="size" value="xl" hidden id="xl-size">
    <label for="xl-size" class="size-radio-btn">xl</label>
    <input type="radio" name="size" value="xxl" hidden id="xxl-size">
    <label for="xxl-size" class="size-radio-btn">xxl</label>
    <br>
    <br>
    <div class="qlt">
        <button onclick="decreaseQuantity(${item.ID})">-</button>
        <span id="quantity-${item.ID}" class="quantity-display">1</span>
        <button onclick="increaseQuantity(${item.ID})">+</button>
    </div>
    <br>

    <div class="btn-group">
      <br>
      <button onclick='addToCart(${item.ID})' class="btn">Thêm vào giỏ hàng</button>
    </div>
  </div>
</div>
`;}

  function increaseQuantity(ID) {
    const quantityElement = document.getElementById(`quantity-${ID}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;

    updateCartQuantity(ID, quantity);
  }

  function decreaseQuantity(ID) {
    const quantityElement = document.getElementById(`quantity-${ID}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity -= 1;
      quantityElement.textContent = quantity;

      updateCartQuantity(ID, quantity);
    }
  }

  function updateCartQuantity(ID, newQuantity) {
    checklog();

    const selectedSize = document.querySelector('.size-radio-btn.check').innerText;
    const index = cart.findIndex(value => value.ID === ID && value.size === selectedSize);

    if (index !== -1) {
      cart[index].quantity = newQuantity;

      // Lưu mảng cart vào localStorage sau khi thêm sản phẩm
      for (let i = 0; i < user.length; i++) {
        if (user[i].username === current.username) {
          user[i].cart = cart;
        }
      }
      current.cart = cart;
      sessionStorage.setItem('current', JSON.stringify(current));
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  function checklog() {
    if (current == null) {
      alert("Vui lòng đăng nhập để mua hàng.");
    } else cart = current.cart;
  }

  function addToCart(ID) {
    checklog();
    const selectedSize = document.querySelector('.size-radio-btn.check').innerText;

    let checkProduct = cart.some(value => value.ID === ID && value.size === selectedSize);

    if (!checkProduct) {
      let product = products.find(value => value.ID === ID);
      cart.push({
        ...product,
        quantity: 1,
        // time: getCurrentTime(),
        // status: "Chưa xử lí",
        size: selectedSize
      });
    } else {
      let product = cart.find(value => value.ID === ID && value.size === selectedSize);
      let getIndex = cart.findIndex(value => value.ID === ID && value.size === selectedSize);
      cart[getIndex] = {
        ...product,
        quantity: ++product.quantity,
        // time: getCurrentTime(),
        // status: "Chưa xử lí",
        size: selectedSize
      };
    }

    // Lưu mảng cart vào localStorage sau khi thêm sản phẩm
    for (let i = 0; i < user.length; i++) {
      if (user[i].username == current.username) {
        user[i].cart = cart;
      }
    }
    current.cart = cart;
    sessionStorage.setItem('current', JSON.stringify(current));
    localStorage.setItem('user', JSON.stringify(user));
  }

  // function getCurrentTime() {
  //   const currentTime = new Date();
  //   return currentTime.toLocaleString();
  // }

  document.getElementById("nike").addEventListener("click", function () {
    window.location.href = "index-user.html?nav=nike";
  });

  document.getElementById("adidas").addEventListener("click", function () {
    window.location.href = "index-user.html?nav=adidas";
  });

  document.getElementById("gucci").addEventListener("click", function () {
    window.location.href = "index-user.html?nav=gucci";
  });

  document.getElementById("chanel").addEventListener("click", function () {
    window.location.href = "index-user.html?nav=chanel";
  });

  document.getElementById("louisvuitton").addEventListener("click", function () {
    window.location.href = "index-user.html?nav=louisvuitton";
  });

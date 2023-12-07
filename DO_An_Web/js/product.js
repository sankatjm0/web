products = JSON.parse(localStorage.getItem("product"));
document.getElementById("nike").addEventListener("click", function () {
  pd("nike");
});

document.getElementById("louisvuitton").addEventListener("click", function () {
  pd("louisvuitton");
});

document.getElementById("chanel").addEventListener("click", function () {
  pd("chanel");
});

document.getElementById("adidas").addEventListener("click", function () {
  pd("adidas");
});

document.getElementById("gucci").addEventListener("click", function () {
  pd("gucci");
});

document.getElementById("h2-brand").addEventListener("click", function () {
  pd("new");
});
// queryStrings = window.location.search;
// urlParamss = new URLSearchParams(queryStrings);
// searchIds = urlParamss.get("nav");

// if (searchIds === "nike") {
//   nike();
// }

function pd(namePd) {
  var itemsPerPage = 8;
  var v = [];
  var t = 0;
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (namePd == "new") {
      var totalPages = Math.ceil(12 / itemsPerPage);
      for (var j = 0; j < 12; j++) {
        var x = JSON.parse(localStorage.getItem("product"));
        v[j] = x[Math.floor(Math.random() * products.length)];
      }
    } else {
      if (product.brand === namePd) {
        document.getElementById("content").innerHTML = ` <section id="header">
  <section id="product1" class="section-p1">
      <h2 id="h2-brand" style="autocapitalize=on;">${
        namePd.charAt(0).toUpperCase() + namePd.slice(1)
      }</h2>
      <div class="pro-container" id="product-container"></div>
      <div id="pagination"></div>
  </section>
</section>`;
        v[t] = product;
        t++;
        var totalPages = Math.ceil(v.length / itemsPerPage);
      }
    }
  }
  // Tính tổng số trang

  // Hiển thị sản phẩm trên trang được chỉ định
  function displayProducts(page) {
    var container = document.getElementById("product-container");
    container.innerHTML = "";

    // Tính chỉ số bắt đầu và kết thúc của sản phẩm trên trang
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    for (var i = startIndex; i < endIndex; i++) {
      if (i >= v.length) {
        // Nếu vượt quá số lượng sản phẩm, thoát khỏi vòng lặp
        break;
      }
      var product = v[i]; // Lấy sản phẩm tại chỉ số i từ mảng products

      // Chỉ xử lý sản phẩm với brand là "nike"

      // Tạo phần tử sản phẩm và các phần tử con
      var productElement = document.createElement("div");
      productElement.className = "pro";
      productElement.setAttribute("data-id", product.ID);

      var imgElement = document.createElement("img");
      imgElement.src = product.img;
      productElement.appendChild(imgElement);

      var desElement = document.createElement("div");
      desElement.className = "des";

      var brandElement = document.createElement("span");
      brandElement.innerText = product.brand;
      desElement.appendChild(brandElement);

      var nameElement = document.createElement("h5");
      nameElement.innerText = product.name;
      desElement.appendChild(nameElement);

      var priceElement = document.createElement("h4");
      priceElement.innerText = product.price + " VND";
      desElement.appendChild(priceElement);

      productElement.appendChild(desElement);

      container.appendChild(productElement);
    }
  }

  // Hiển thị các nút phân trang
  function displayPagination() {
    var paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (var i = 1; i <= totalPages; i++) {
      var pageLink = document.createElement("a");
      pageLink.href = "javascript:void(0);";
      pageLink.innerText = i;
      pageLink.dataset.page = i;
      pageLink.addEventListener("click", function () {
        var page = parseInt(this.dataset.page);
        displayProducts(page);
        redirectToProductDetails();
      });

      paginationContainer.appendChild(pageLink);
    }
  }

  function redirectToProductDetails() {
    document.querySelectorAll(".pro").forEach((card) => {
      card.addEventListener("click", function () {
        if (document.querySelector("#content") != null)
          document.querySelector(
            "#content"
          ).innerHTML = `<section class="product-details">
       
  </section>`;
        const productId = this.getAttribute("data-id");
        // console.log("Clicked product with ID:", productId);
        // console.log("Current URL:", window.location.href);
        // window.location.href =
        //   "index-user.html?ID=" + encodeURIComponent(productId);
        let checkdBtn = 0;
        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const searchId = urlParams.get('ID');

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
            products.forEach((item) => {
              if (item.ID == productId) {
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
        <button onclick="decreaseQuantity2(${item.ID})">-</button>
        <span id="quantity-${item.ID}" class="quantity-display">1</span>
        <button onclick="increaseQuantity2(${item.ID})">+</button>
    </div>
    <br>

    <div class="btn-group">
      <br>
      <button onclick='addToCart(${item.ID})' class="btn">Thêm vào giỏ hàng</button>
    </div>
  </div>
</div>
`;
        }

        // function getCurrentTime() {
        //   const currentTime = new Date();
        //   return currentTime.toLocaleString();
        // }
      });
    });
  }

  // Mặc định hiển thị trang đầu tiên
  displayProducts(1);
  displayPagination();
  redirectToProductDetails();
}



function checklog() {
  if (current == null) {
    alert("Vui lòng đăng nhập để mua hàng.");
  } else cart = current.cart;
}

function addToCart(ID) {
  checklog();
  const selectedSize = document.querySelector(
    ".size-radio-btn.check"
  ).innerText;

  let checkProduct = cart.some(
    (value) => value.ID === ID && value.size === selectedSize
  );

  if (!checkProduct) {
    let product = products.find((value) => value.ID === ID);
    cart.push({
      ...product,
      quantity: 1,
      size: selectedSize,
    });
    alert("Sản phẩm đã được thêm vào giỏ hàng.");
  } else {
    let product = cart.find(
      (value) => value.ID === ID && value.size === selectedSize
    );
    let getIndex = cart.findIndex(
      (value) => value.ID === ID && value.size === selectedSize
    );
    cart[getIndex] = {
      ...product,
      quantity: ++product.quantity,
      size: selectedSize,
    };
    alert("Sản phẩm đã được thêm vào giỏ hàng.");
  }

  // Lưu mảng cart vào localStorage sau khi thêm sản phẩm
  for (let i = 0; i < user.length; i++) {
    if (user[i].username == current.username) {
      user[i].cart = cart;
    }
  }
  current.cart = cart;
  sessionStorage.setItem("current", JSON.stringify(current));
  localStorage.setItem("user", JSON.stringify(user));
}
pd("new");
function increaseQuantity2(ID) {
  const quantityElement = document.getElementById(`quantity-${ID}`);
  let quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;

  updateCartQuantity(ID, quantity);
}

function decreaseQuantity2(ID) {
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

  const selectedSize = document.querySelector(
    ".size-radio-btn.check"
  ).innerText;
  const index = cart.findIndex(
    (value) => value.ID === ID && value.size === selectedSize
  );

  if (index !== -1) {
    cart[index].quantity = newQuantity;

    // Lưu mảng cart vào localStorage sau khi thêm sản phẩm
    for (let i = 0; i < user.length; i++) {
      if (user[i].username === current.username) {
        user[i].cart = cart;
      }
    }
    current.cart = cart;
    sessionStorage.setItem("current", JSON.stringify(current));
    localStorage.setItem("user", JSON.stringify(user));
  }
}
// document.getElementById("nike").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=nike";
// });

// document.getElementById("adidas").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=adidas";
// });

// document.getElementById("gucci").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=gucci";
// });

// document.getElementById("chanel").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=chanel";
// });

// document.getElementById("louisvuitton").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=louisvuitton";
// });

// Số sản phẩm trên mỗi trang

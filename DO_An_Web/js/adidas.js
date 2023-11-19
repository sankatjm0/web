products = JSON.parse(localStorage.getItem("product")) || [];
document.getElementById("adidas").addEventListener("click", function () {
  document.getElementById("content").innerHTML = ` <section id="header">
  <section id="product1" class="section-p1">
      <h2 id="h2-brand">Adidas</h2>
      <p>Bộ sưu tập mùa hè Thiết kế hiện đại mới</p>
      <div class="pro-container" id="product-container"></div>
      <div id="pagination"></div>
  </section>
</section>`;
  var itemsPerPage = 8;
  var nike = [];
  var t = 0;
  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    if (product.brand === "adidas") {
      nike[t] = product;
      t++;
    }
  }
  // Tính tổng số trang
  var totalPages = Math.ceil(nike.length / itemsPerPage);

  // Hiển thị sản phẩm trên trang được chỉ định
  function displayProducts(page) {
    var container = document.getElementById("product-container");
    container.innerHTML = "";

    // Tính chỉ số bắt đầu và kết thúc của sản phẩm trên trang
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    for (var i = startIndex; i < endIndex; i++) {
      if (i >= nike.length) {
        // Nếu vượt quá số lượng sản phẩm, thoát khỏi vòng lặp
        break;
      }
      var product = nike[i]; // Lấy sản phẩm tại chỉ số i từ mảng products

      // Chỉ xử lý sản phẩm với brand là "nike"

      // Tạo phần tử sản phẩm và các phần tử con
      var productElement = document.createElement("div");
      productElement.className = "pro";

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
      priceElement.innerText = product.price;
      desElement.appendChild(priceElement);

      productElement.appendChild(desElement);

      var cartLink = document.createElement("a");
      cartLink.href = ""; // Đặt đường dẫn tới trang mua hàng tại đây
      var cartIcon = document.createElement("i");
      cartIcon.className = "fal fa-shopping-cart cart";
      cartLink.appendChild(cartIcon);
      productElement.appendChild(cartLink);

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
      });

      paginationContainer.appendChild(pageLink);
    }
  }

  // Mặc định hiển thị trang đầu tiên
  displayProducts(1);
  displayPagination();
});
// Số sản phẩm trên mỗi trang

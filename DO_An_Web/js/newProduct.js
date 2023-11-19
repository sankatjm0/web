products = JSON.parse(localStorage.getItem("product")) || [];
// Số sản phẩm trên mỗi trang
var itemsPerPage = 8;

// Tính tổng số trang
var totalPages = Math.ceil(12 / itemsPerPage);

// Hiển thị sản phẩm trên trang được chỉ định
function displayProducts(page) {
  var container = document.getElementById("product-container");
  container.innerHTML = "";

  // Tính chỉ số bắt đầu và kết thúc của sản phẩm trên trang
  var startIndex = (page - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;

  for (var i = startIndex; i < endIndex; i++) {
      if (i >= products.length) {
          // Nếu vượt quá số lượng sản phẩm, thoát khỏi vòng lặp
          break;
      }

      var product = products[i];

      // Tạo phần tử sản phẩm
      var productElement = document.createElement("div");
      productElement.className = "pro";

      // Thêm hình ảnh sản phẩm
      var imgElement = document.createElement("img");
      imgElement.src = product.img;
      productElement.appendChild(imgElement);

      // Thêm thông tin sản phẩm
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

      // Thêm nút mua hàng
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
      pageLink.addEventListener("click", function() {
          var page = parseInt(this.dataset.page);
          displayProducts(page);
      });

      paginationContainer.appendChild(pageLink);
  }
}


// Mặc định hiển thị trang đầu tiên
displayProducts(1);
displayPagination();
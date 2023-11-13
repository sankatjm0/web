const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimenstions = item.getBoundingClientRect();
  let containerWidth = containerDimenstions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });
  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

document
  .querySelector(".scrollTopButton")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });

  if (close) {
    close.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }
}

 // Danh sách sản phẩm
 var products = [
  {
    imgSrc: "https://i.postimg.cc/hG1hqqK6/n1.jpg",
    brand: "adidas",
    name: "Carton Astronault Tshirts",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/BZkSkvxt/n2.jpg",
    brand: "adidas",
    name: "Carton Leave Tshirts",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/KYjcC3sk/n3.jpg",
    brand: "adidas",
    name: "Rose Multicolor Tshirts",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/vHvQBtJx/n4.jpg",
    brand: "adidas",
    name: "Pink Flower Tshirts",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/908J8S4q/n5.jpg",
    brand: "adidas",
    name: "Purple Flowering Tshirts",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/X7r8NsGQ/n7.jpg",
    brand: "adidas",
    name: "Short Knicker",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/JhrH0hYM/n8.jpg",
    brand: "Adidas",
    name: "2 in 1 Double Routed",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/2Sq4mytJ/f8.jpg",
    brand: "adidas",
    name: "Ash Short",
    rating: 5,
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/908J8S4q/n5.jpg",
    brand: "adidas",
    name: "Purple Flowering Tshirts",
    rating: [
      "fas fa-star",
      "fas fa-star",
      "fas fa-star",
      "fas fa-star",
      "fas fa-star"
    ],
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/X7r8NsGQ/n7.jpg",
    brand: "adidas",
    name: "Short Knicker",
    rating: [
      "fas fa-star",
      "fas fa-star",
      "fas fa-star",
      "fas fa-star",
      "fas fa-star"
    ],
    price: "$78"
  },
  {
    imgSrc: "https://i.postimg.cc/JhrH0hYM/n8.jpg",
    brand: "Adidas",
    name: "2 in 1 Double Routed",
    price: ""
  },
  {
    imgSrc: "https://i.postimg.cc/2Sq4mytJ/f8.jpg",
    brand: "adidas",
    name: "Ash Short",
    rating: [
      "fas fa-star",
      "fas fa-star",
      "fas fa-star",
      "fas fa-star",
      "fas fa-star"
    ],
    price: "$78"
  }
];

// Số sản phẩm trên mỗi trang
var itemsPerPage = 8;

// Tính tổng số trang
var totalPages = Math.ceil(products.length / itemsPerPage);

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
      imgElement.src = product.imgSrc;
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

      var ratingElement = document.createElement("div");
      ratingElement.className = "star";
      for (var j = 0; j < product.rating; j++) {
          var starIcon = document.createElement("i");
          starIcon.className = "fas fa-star";
          ratingElement.appendChild(starIcon);
      }
      desElement.appendChild(ratingElement);

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

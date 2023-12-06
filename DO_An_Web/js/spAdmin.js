// Lấy danh sách sản phẩm từ localStorage hoặc khởi tạo một mảng rỗng
const products = JSON.parse(localStorage.getItem("product")) || [];

// Lấy tham chiếu đến các phần tử trên trang
let productForm;
let productTable;

// Gắn sự kiện click cho nút "Quản lý sản phẩm"
document
  .getElementById("products-admin")
  .addEventListener("click", function () {
    // Thay đổi nội dung của phần tử có id "content"
    document.getElementById("content").innerHTML = `
    <div class="filter-container">
      <div class="search">
        <input type="text" placeholder="Tìm sản phẩm" class="tim_spadmin" />
        <button class="spadmin-search">Tìm</button>
        <img onclick="reload2()" class="reload" src="./img/OIP.jpg">

      </div>
    </div>


    <div style="margin:10px">
    <h2 style="font-size: 38px; text-align: center;">Quản lý sản phẩm<br></h2>
  <form id="productForm" class="card">
    <div>

<br>
    <div style="font-size:20px">
    <label for="prod-img" style="display: block; margin-bottom: 5px; top: 5px;">Chọn ảnh</br>
        <input id="prod-img" name="prod-img" value="" type="file" accept="image/*" onchange="updateFileName()" style="display: none;" />
        <img id="preview" src=""style="width:100%" >
    </label>
    <div><img id="preview" style="width:300px;" src=""></div>
    </div>
    
</div>


        <select id="brand" style="border:1px solid black; border-radius:5px; font-size:22px; width:204px" value="" required>
          <option value="nike">Nike</option>
          <option value="louisvuitton">Louis Vuitton</option>
          <option value="gucci">Gucci</option>
          <option value="chanel">Chanel</option>
          <option value="adidas">Adidas</option>
        </select>
        </h1>
      
    <p>
        <input type="text" id="name" placeholder="Tên" required></h1>

        <p>
        <input type="number" class="price" id="price"placeholder="Giá" required ></p>
        <p><button id="submit">Thêm sản phẩm </button></p>
    </div>
   

   
  </form>

    <br><br>

    <table style=" width: 100%; border-collapse: collapse; text-align: center" id="productTable">
      <tr style="border: 1px solid black">
        <th>STT</th>
        <th>Hãng</th>
        <th>Tên sản phẩm</th>
        <th>Hình ảnh</th>
        <th>Giá</th>
        <th>Chỉnh sửa</th>
      </tr>
    </table></div>`;

    // Xác định sự kiện change cho input chọn ảnh
    document.getElementById("prod-img").onchange = function () {
      let img = URL.createObjectURL(this.files[0]);
      document.getElementById("preview").src = img;
    };
    productForm = document.getElementById("productForm");
    productTable = document.getElementById("productTable");

    // Xử lý sự kiện submit của form
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const product = {}; // Create a new product object

      // Cập nhật thông tin sản phẩm
      product.brand = document.getElementById("brand").value;
      product.name = document.getElementById("name").value;
      product.price = document.getElementById("price").value;
      product.img = document.getElementById("prod-img").src;

      products.push(product); // Add the new product to the products array

      // Lưu danh sách sản phẩm vào localStorage
      localStorage.setItem("product", JSON.stringify(products));
      var p = JSON.parse(localStorage.getItem("product")) || [];
      // Hiển thị lại bảng sản phẩm
      displayProducts(products);

      // Đặt giá trị các trường dữ liệu về rỗng
      document.getElementById("brand").value = "";
      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("prod-img").value = "";
      document.getElementById("preview").src = "";
      for (let i = 0; i < p.length; i++) {
        for (let j = 0; j < p.length; j++) {
          if (
            p[i].brand === p[j].brand &&
            p[i].name === p[j].name &&
            p[i].price === p[j].price &&
            p[i].img === p[j].img
          ) {
            deleteProduct1(i);
            return;
          }
        }
      }
    });

    displayProducts(products);
    filterspad(products);
  });

function filterspad(products) {
  document
    .querySelector(".spadmin-search")
    .addEventListener("click", function () {
      product_temp = [];
      let tenhang = document.querySelector(".tim_spadmin");
      let tenhangvalue = tenhang.value.trim();
      let f = false;
      products.forEach((product) => {
        if (product.name.toLowerCase().includes(tenhangvalue.toLowerCase())) {
          product_temp.push(product);
          f = true;
        }
      });
      if (f === false) {
        alert("Không tìm thấy sản phẩm");
        document.querySelector(".tim_spadmin").value = "";
        displayProducts(products);
        return;
      }
      displayProducts(product_temp);
    });
}
// Hàm hiển thị bảng sản phẩm
function displayProducts(products) {
  productTable.innerHTML = `
    <tr>
      <th>STT</th>
      <th>Hãng</th>
      <th>Tên sản phẩm</th>
      <th>Giá</th>
      <th>Hình ảnh</th>
      <th>Chỉnh sửa</th>
    </tr>`;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${product.brand}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td><img src="${product.img}" width="50px"></td>
      <td>
        <button onclick="editProduct(${i})">Chỉnh sửa</button>
        <button onclick="deleteProduct(${i})">Xóa</button>
      </td>`;

    productTable.appendChild(row);
  }
}

// Hàm xóa sản phẩm
function deleteProduct1(index) {
  products.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(products));
  displayProducts(products);
}
// Hàm xóa sản phẩm
function deleteProduct(index) {
  // Hiển thị thông báo xác nhận
  const confirmation = confirm("Bạn có muốn xóa sản phẩm?");

  if (confirmation) {
    products.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(products));
    displayProducts(products);
  }
}

// Hàm sửa sản phẩm

function editProduct(index) {
  const product = products[index];
  document.getElementById("brand").value = product.brand;
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("prod-img").src = product.img;
  document.getElementById("preview").src = product.img;
}

// Hàm khởi chạy khi trang được tải

displayProducts(products);

function isNumeric(str) {
  if (typeof str == "string") return false;
}

function reload2() {
  displayProducts(products);
}
// Lấy danh sách sản phẩm từ localStorage hoặc khởi tạo một mảng rỗng
const products = JSON.parse(localStorage.getItem("product")) || [];

// Lấy tham chiếu đến các phần tử trên trang
var productForm;
var productTable;

// Gắn sự kiện click cho nút "Quản lý sản phẩm"
document
  .getElementById("products-admin")
  .addEventListener("click", function () {
    // Thay đổi nội dung của phần tử có id "content"
    document.getElementById("content").innerHTML = `
    <div style="margin:10px">
    <h2 style="font-size: 38px; text-align: center;">Quản lý sản phẩm<br></h2>
    <form id="productForm">
    <div style="display:"flex">
        <label id="sp" for="brand">Nhãn hàng</label>
        <select style="border:1px solid black;padding:5px;border-radius:5px; font-size:5px" id="brand" required>
          <option value="nike">Nike</option>
          <option value="lv">Louis Vuitton</option>
          <option value="gucci">Gucci</option>
          <option value="chanel">Chanel</option>
          <option value="adidas">Adidas</option>
        </select>
      
      <label for="name">Tên sản phẩm:</label>
      <input type="text" id="name" required>

      <label for="price">Giá:</label>
      <input type="number" id="price" required>
      </div>
      <div>
  <label style="font-size:20px" for="prod-img">Chọn ảnh sản phẩm</label><br>
  <input id="prod-img" name="prod-img" value="" type="file" accept="image/*" onchange="updateFileName()" /><br>
  <div id="add-img">
    <img id="preview" src="" width="20%">
    <input id="settle" type="submit" value="" />
  </div>
  <small id="file-name"></small>
</div>

      <button style="background-color: #4CAF50; color: white; padding: 10px 20px;
       font-size: 16px; border: none; border-radius: 4px; cursor: pointer;" type="submit">
        Thêm sản phẩm
      </button>
    </form>

    <br><br>

    <table style="width: 100%; border: 1px solid black; text-align: center" id="productTable">
      <tr style="border: 1px solid black">
        <th>Số Lượng</th>
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

      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const brand = document.getElementById("brand").value;
      const pic = document.getElementById("prod-img");
      const reader = new FileReader();

      pic.addEventListener("change", function () {
        reader.addEventListener("load", function () {
          products.push({
            img: reader.result,
            brand: brand,
            name: name,
            price: price,
          });
        });

        reader.readAsDataURL(this.files[0]);
      });

      localStorage.setItem("product", JSON.stringify(products));

      displayProducts();

      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("prod-img").value = "";
      document.getElementById("preview").src = "";
    });

    displayProducts();
  });

// Hàm hiển thị bảng sản phẩm
function displayProducts() {
  productTable.innerHTML = `
    <tr>
      <th>Số Lượng</th>
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
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(products));
  displayProducts();
}

// Hàm sửa sản phẩm
function editProduct(index) {
  const product = products[index];
  document.getElementById("brand").value = product.brand;
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("preview").src = product.img;

  document
    .getElementById("productForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      product.brand = document.getElementById("brand").value;
      product.name = document.getElementById("name").value;
      product.price = document.getElementById("price").value;
      product.img = document.getElementById("preview").src;

      localStorage.setItem("product", JSON.stringify(products));
      displayProducts();

      document.getElementById("brand").value = "";
      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("prod-img").value = "";
      document.getElementById("preview").src = "";
    });
}
function updateFileName() {
  const fileInput = document.getElementById('prod-img');
  const fileNameContainer = document.getElementById('file-name');

  if (fileInput.files.length > 0) {
    fileNameContainer.textContent = fileInput.files[0].name;
  } else {
    fileNameContainer.textContent = '';
  }
}

// Hàm khởi chạy khi trang được tải
function init() {
  displayProducts();
}

init();

let products;

window.onload = function () {
  products = JSON.parse(localStorage.getItem("product")) || [];

  document
    .getElementById("products-admin")
    .addEventListener("click", function () {
      document.getElementById("content").innerHTML = `
      <br>
<h2 style=" font-size: 30px; text-align: center;">Quản lý sản phẩm<br><br></h2>
<form id="productForm" >
  <label for="brand">Tên hãng:</label>
  <input type="text" id="brand" required>

  <label for="name">Tên sản phẩm:</label>
  <input type="text" id="name" required>

  <label for="price">Giá:</label>
  <input type="number" id="price" required>

  <label for="image">Hình ảnh:</label>
  <input type="file" id="img" accept="" required>
  <br><br>
  <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <button style="background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 16px; border: none; border-radius: 4px; cursor: pointer;" type="submit">
  Thêm sản phẩm</button>
</div>
<br><br>
  
</form>
<table style="width: 100%; border: 1px solid black;text-align: center" id="productTable">
  <tr style="border: 1px solid black>
      <th>Số Lượng</th>
      <th>Hãng</th>
      <th>Tên sản phẩm</th>
      <th>Hình ảnh</th>
      <th>Giá</th>
      <th>Chỉnh sửa</th>
  </tr>
</table>
`;

      // Lấy tham chiếu đến form và bảng
      const productForm = document.getElementById("productForm");
      const productTable = document.getElementById("productTable");

      // Xử lý sự kiện khi form được gửi đi
      productForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn chặn chuyển hướng trang sau khi gửi form

        // Lấy giá trị từ các trường input
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const img = document.getElementById("img").value;
        const brand = document.getElementById("brand").value;

        products.push({
          brand: brand,
          img: img,
          name: name,
          price: price,
        });

        // Lưu danh sách tài khoản vào localStorage
        localStorage.setItem("product", JSON.stringify(products));

        // Xóa giá trị trong các trường input
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("img").value = "";
        displayProducts();
      });

      // Hàm hiển thị bảng sản phẩm

      displayProducts();
    });
};
function displayProducts() {
  // Xóa nội dung bảng hiện tại
  productTable.innerHTML = `
  <tr>
  <th>Số Lượng</th>
  <th>Hãng</th>
  <th>Tên sản phẩm</th>
  <th>Giá</th>
  <th>Hình ảnh</th>
  
  <th>Chỉnh sửa</th>
  </tr>
`;

  // Duyệt qua danh sách sản phẩm và hiển thị từng sản phẩm trong bảng
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const row = document.createElement("tr");
    const imgCell = document.createElement("td");
    const imgLink = document.createElement("a");
    imgLink.href = product.img;
    imgLink.textContent = "Xem ảnh"; // Thay thế bằng văn bản hiển thị cho liên kết ảnh
    imgCell.appendChild(imgLink);
    row.innerHTML = `
          <td>${i + 1}</td>
          <td>${product.brand}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td></td>
          
          <td>
              <button onclick="editProduct(${i})">Sửa</button>
              <button onclick="deleteProduct(${i})">Xóa</button>
          </td>
                  `;

    const editButton = row.querySelector("td:last-child button:first-child");
    editButton.dataset.index = i; // Lưu chỉ số sản phẩm vào thuộc tính data-index để sử dụng trong hàm editProduct

    row.querySelector("td:nth-child(5)").appendChild(imgCell);
    productTable.appendChild(row);
  }
}
// Hàm xóa sản phẩm
function deleteProduct(index) {
  products.splice(index, 1); // Xóa sản phẩm khỏi mảng
  displayProducts(); // Hiển thị lại bảng sản phẩm
}

// Hàm sửa sản phẩm
function editProduct(index) {
  const product = products[index];

  // Đổ dữ liệu của sản phẩm vào các trường input
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("brand").value = product.brand;

  // Hiển thị tên tệp đã chọn (nếu có) bằng cách gán vào một phần tử khác
  const imgFileName = product.img.replace(/^.*[\\\/]/, "");
  document.getElementById("imgFileName").textContent = imgFileName;

  // Xóa sản phẩm khỏi mảng
  products.splice(index, 1);
  // Hiển thị lại bảng sản phẩm
  displayProducts();
}

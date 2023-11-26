
const products = JSON.parse(localStorage.getItem("product")) || [];

window.onload = function () {

  document
    .getElementById("products-admin")
    .addEventListener("click", function () {
      document.getElementById("content").innerHTML = `
      <br>
<h2 style=" font-size: 30px; text-align: center;">Quản lý sản phẩm<br><br></h2>
<form id="productForm" >
<div>
<label for="brand">Nhãn hàng</label><br>
<select id="brand" required>
    <option value="nike">Nike</option>
    <option value="lv">Louis Vuitton</option>
    <option value="gucci">Gucci</option>
    <option value="chanel">Chanel</option>
    <option value="adidas">Adidas</option>
</select>
<small></small>
</div>

  <label for="name">Tên sản phẩm:</label>
  <input type="text" id="name" required>

  <label for="price">Giá:</label>
  <input type="number" id="price" required>

  <div>
            <label for="prod-img">Chọn ảnh sản phẩm</label><br>
            <input id="prod-img" name="prod-img" type="file" accept="image/*" /><br>
            <div id="add-img">
                <img id="preview" src="#" width="20%">
                <input id="settle" type="submit" value="Thêm ảnh"></input>
            </div>
            <small></small>

        </div>
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
      //chuyen doi dinh dang anh de them vao local
    //   function getBase64Image(img) {
    //     var canvas = document.createElement("canvas");
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    
    //     var ctx = canvas.getContext("2d");
    //     ctx.drawImage(img, 0, 0);
    
    //     var dataURL = canvas.toDataURL("image/png");
    
    //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // }
     
      //preview anh chon tu may
      document.getElementById('prod-img').onchange = function () {
        let img = URL.createObjectURL(this.files[0])
        document.getElementById('preview').src = img;
      };
        //xac nhan chon anh -> them anh vao local
      // document.getElementById("settle").addEventListener("submit", function(event) {
      //   event.preventDefault();
      //   const image = document.getElementById("prod-img");
      //   let imgData = getBase64Image(image);
      //   products.push({img: imgData});
      // })
      // }

      // Lấy tham chiếu đến form và bảng
      const productForm = document.getElementById("productForm");
      const productTable = document.getElementById("productTable");

      // Xử lý sự kiện khi form được gửi đi
      productForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn chặn chuyển hướng trang sau khi gửi form
        alert("test");
        // Lấy giá trị từ các trường input
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
                price: price
              });
          });

          reader.readAsDataURL(this.files[0]);

        });

        
        // Lưu danh sách tài khoản vào localStorage
        localStorage.setItem("product", JSON.stringify(products));


        displayProducts();
        // Xóa giá trị trong các trường input
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("prod-img").value = "";
        document.getElementById("preview").src = "";
        
      });

      // Hàm hiển thị bảng sản phẩm

      // displayProducts();
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
    // const product = products[i];
    const row = document.createElement("tr");
    const imgCell = document.createElement("td");
    const picture = document.createElement("img");
    let prodImg = products[i].img;
    picture.src = prodImg;
    picture.width="20";
      
    

    imgCell.appendChild(picture);
    
    row.innerHTML = `
          <td>${i + 1}</td>
          <td>${products[i].brand}</td>
          <td>${products[i].name}</td>
          <td>${products[i].price}</td>
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
  document.getElementById("img").textContent = imgFileName;

  // Xóa sản phẩm khỏi mảng
  products.splice(index, 1);
  // Hiển thị lại bảng sản phẩm
  displayProducts();
}

function guest() {
  sessionStorage.clear();
  location.replace("index-user.html");
}
const user = JSON.parse(localStorage.getItem('user')) || [];

document
    .querySelector("#customer")
    .addEventListener("click", function () {
        document.querySelector("#content").innerHTML = `<div style="margin:10px">
        <h2 style="font-size: 38px; text-align: center;">Quản lý khách hàng<br></h2>
        <form id="productForm" class="card"></div>
        <div>
        <table style="width: 100%; border: 1px solid black; text-align: center" id="list-user">
        <tr style="border: 1px solid black">
        <th>Mã KH</th>
        <th id="username">Tài khoản</th>
        <th>Tên khách hàng</th>
        <th>Hóa đơn</th>
        <th>Thông tin</th>
        </tr>
        </table></div>
        <div id="card" style="display="none";">
        <div class="backdrop"></div>
        <div class="card">
        <h1>Thông tin tài khoản</h1>
        <p class="title">@</p>
        <div class="thongtin">
        <p>Tên khách hàng: </p>
        <p>Số điện thoại:</p>
        <p>Địa chỉ: </p>
        </div>
        <p><button class="b" onclick="cancel()" style="bottom: 10px;
        right: 10px;">Thoát</button></p>
        <p id="update"><button class="b" onclick="update()" style="bottom: 10px;
        right: 70px;">Cập nhật thông tin</button></p>
        </div></div>`;
         displayCustomer();
    })

function displayCustomer() {
    for (let i = 1; i < user.length; i++) {
        const kh = user[i];
    
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i}</td>
          <td>${kh.username}</td>
          <td>${kh.name}</td>
          <td onclick="order(${i})">Kiểm tra</td>
          <td onclick="show(${i})">Xem</td>
          `;
    
        document.querySelector("#list-user").appendChild(row);
      }
}

function show(i) {
    document.querySelector("#card").innerHTML = `
        <div class="backdrop"></div>
        <div class="card">
        <h1>Thông tin tài khoản</h1>
        <p class="title">@${user.username}</p>
        <div class="thongtin">
        <p>Tên khách hàng: ${user[i].name}</p>
        <p>Số điện thoại: ${user[i].phone}</p>
        <p>Địa chỉ: ${user[i].address}</p>
        </div>
        </div>
        <p><button class="b" onclick="cancel(${i})" style="bottom: 10px;
        right: 10px;">Thoát</button></p>
        <p id="update"><button class="b" onclick="update(${i})" style="bottom: 10px;
        right: 70px;">Cập nhật thông tin</button></p>
        </div>`
    document.querySelector("#card").style.display = `block`;
    document.querySelector(".card").style.display = `block`;
    document.querySelector(".backdrop").style.display = `block`;
  
  }
  
  function cancel(i) {
    document.querySelector(".thongtin").innerHTML = `<h1>Thông tin tài khoản</h1>
    <p class="title">@${user.username}</p>
    <div class="thongtin">
    <p>Tên khách hàng: ${user[i].name}</p>
    <p>Số điện thoại: ${user[i].phone}</p>
    <p>Địa chỉ: ${user[i].address}</p>`;
    document.querySelector("#update").innerHTML = `<button class="b" onclick="update()" style="bottom: 10px;
    right: 70px;">Cập nhật thông tin</button>`
    document.querySelector("#card").style.display = `none`;
    document.querySelector(".card").style.display = `none`;
    document.querySelector(".backdrop").style.display = `none`;
  
  }
  
  function update(i) {
    document.querySelector(".thongtin").innerHTML = `
    <div>
    <p>Tài khoản: </p><input type="text" id="username">
    <small></small>
    </div>
    <div>
    <p>Tên khách hàng: </p><input type="text" id="name">
    <small></small>
    </div>
    <div>
    <p>Số điện thoại: </p><input type="text" id="phone">
    <small></small>
    </div>
    <div>
    <p>Địa chỉ: </p><input type="text" id="address">
    <small></small>
    </div>
    <div>
    <p>Mật khẩu: </p><input type="password" id="password">
    <small></small>
    </div>`;
    document.querySelector("#update").innerHTML = `<button class="b" onclick="save(${i})" style="bottom: 10px;
    right: 70px;">Lưu</button>`
    
  }
  
  function save(i) {
    function showMessage(input, message, type) {
      // get the small element and set the message
      const msg = input.parentNode.querySelector("small");
      msg.innerText = message;
      // update the class for the input
      input.class = type ? "success" : "error";
      return type;
    }
    
    function showError(input, message) {
      return showMessage(input, message, false);
    }
    
    function showSuccess(input) {
      return showMessage(input, "", true);
    }
    
    function hasValue(input, message) {
      if (input.value.trim() === "") {
        return showError(input, message);
      }
      return showSuccess(input);
    }
    const ADDRESS_REQUIRED = "Vui lòng nhập địa chỉ";
      const PHONE_REQUIRED = "Vui lòng nhập số diện thoại";
      const NAME_REQUIRED = "Vui lòng nhập tên";
      let addressValid = hasValue(document.querySelector("#address"), ADDRESS_REQUIRED);
      let phoneValid = hasValue(document.querySelector("#phone"), PHONE_REQUIRED);
      let nameValid = hasValue(document.querySelector("#name"), NAME_REQUIRED);
    if (addressValid && phoneValid && nameValid) {
        user[i].name = document.querySelector("#name").value;
        user[i].phone = document.querySelector("#phone").value;
        user[i].address = document.querySelector("#address").value;
        localStorage.setItem('user', JSON.stringify(user));
      }
    
  
    document.querySelector(".thongtin").innerHTML = `<p>Tên khách hàng: ${user[i].name}</p>
    <p>Số điện thoại: ${user[i].phone}</p>
    <p>Địa chỉ: ${user[i].address}</p>`
    document.querySelector("#update").innerHTML = `<button class="b" onclick="update(${i})" style="bottom: 10px;
    right: 70px;">Cập nhật thông tin</button>`
  }
  
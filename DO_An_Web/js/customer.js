const user = JSON.parse(localStorage.getItem('user')) || [];
const order = JSON.parse(localStorage.getItem('order')) || [];

document
    .querySelector("#customer")
    .addEventListener("click", function () {
        document.querySelector("#content").innerHTML = `<div style="margin:10px">
        <h2 style="font-size: 38px; text-align: center;">Quản lý khách hàng<br></h2>
        <div>
        <table style="width: 100%; border: 1px solid black; text-align: center" id="list-user">
        <tr style="border: 1px solid black">
        <th>Mã KH</th>
        <th>Tài khoản</th>
        <th>Tên khách hàng</th>
        <th>Hóa đơn</th>
        <th>Thông tin</th>
        </tr>
        </table></div>
        <div id="card" style="display="none";">
        <div class="card2">
        <h1>Thông tin tài khoản</h1>
        <p class="title">@</p>
        <div class="thongtin2">
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
          <td id="order" onclick="order(${i})">Kiểm tra</td>
          <td id="xem" onclick="show(${i})">Xem</td>
          `;
    
        document.querySelector("#list-user").appendChild(row);
      }
}

function show(i) {
    document.querySelector("#card").innerHTML = `
        <div class="card2">
        <h1>Thông tin tài khoản</h1>
        <p class="title">@${user[i].username}</p>
        <div class="thongtin2">
        <p>Tên khách hàng: ${user[i].name}</p>
        <p>Số điện thoại: ${user[i].phone}</p>
        <p>Địa chỉ: ${user[i].address}</p>
        <p>Ngày đăng kí: ${user[i].time}</p>
        </div>
        <p><button class="b" onclick="cancel(${i})" style="bottom: 10px;
        right: 10px;">Thoát</button></p>
        <p id="update"><button class="b" onclick="update(${i})" style="bottom: 10px;
        right: 70px;">Cập nhật thông tin</button></p>
        `
    document.querySelector("#card").style.display = `block`;
    document.querySelector(".card2").style.display = `block`;
  
  }
  
  function cancel(i) {
    document.querySelector(".title").innerHTML = `<h1>Thông tin tài khoản</h1>
    <p class="title">@${user[i].username}</p>`;
    document.querySelector(".thongtin2").innerHTML = `
    <p>Tên khách hàng: ${user[i].name}</p>
    <p>Số điện thoại: ${user[i].phone}</p>
    <p>Địa chỉ: ${user[i].address}</p>
    <p>Ngày đăng kí: ${user[i].time}</p>
    `;
    document.querySelector("#update").innerHTML = `<button class="b" onclick="update(${i})" style="bottom: 10px;
    right: 70px;">Cập nhật thông tin</button>`
    document.querySelector("#card").style.display = `none`;
    document.querySelector(".card2").style.display = `none`;
  
  }
  
  function update(i) {
    document.querySelector(".title").innerHTML = `Đang cập nhật`
    document.querySelector(".thongtin2").innerHTML = `
    <div id="input">
    <div>
    <p>Tài khoản: </p><input type="text" id="username"></br>
    <small></small>
    </div>
    <div>
    <p>Tên khách hàng: </p><input type="text" id="name"></br>
    <small></small>
    </div>
    <div>
    <p>Số điện thoại: </p><input type="number" id="phone"></br>
    <small></small>
    </div>
    <div>
    <p>Địa chỉ: </p><input type="text" id="address"></br>
    <small></small>
    </div>
    <div>
    <p>Mật khẩu: </p><input type="text" id="password"></br>
    <small></small>
    </div>
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
      const USERNAME_REQUIRED = "Vui lòng nhập tên tài khoản";
      const PASSWORD_REQUIRED = "Vui lòng nhập mật khẩu";
    const CHECK = "Tên tài khoản đã tồn tại"
      let usernameValid = hasValue(document.querySelector("#username"), USERNAME_REQUIRED);
      let passwordValid = hasValue(document.querySelector("#password"), PASSWORD_REQUIRED);
      let addressValid = hasValue(document.querySelector("#address"), ADDRESS_REQUIRED);
      let phoneValid = hasValue(document.querySelector("#phone"), PHONE_REQUIRED);
      let nameValid = hasValue(document.querySelector("#name"), NAME_REQUIRED);
    if (addressValid && phoneValid && nameValid && usernameValid && passwordValid) {
        if(user.find(user => user.username == document.querySelector("#username").value)){
            showError(document.querySelector("#username"), CHECK);
    }   else {
      let prevName = user[i].username;
        user[i].name = document.querySelector("#name").value;
        user[i].phone = document.querySelector("#phone").value;
        user[i].address = document.querySelector("#address").value;
        user[i].username = document.querySelector("#username").value;
        user[i].password = document.querySelector("#password").value;
        let hi = user[i].order;
        for (let y=0; y<hi.length; y++) {
         hi[y].username = document.querySelector("#username").value;}
        for(let x = 0; x<order.length; x++) {
          if (order[x].username == prevName) {
            order[x].username = document.querySelector("#username").value;
          }
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('order', JSON.stringify(order));

        document.querySelector(".card2").innerHTML = `
        <h1>Thông tin tài khoản</h1>
        <p class="title">@${user[i].username}</p>
        <div class="thongtin2">
        <p>Tên khách hàng: ${user[i].name}</p>
        <p>Số điện thoại: ${user[i].phone}</p>
        <p>Địa chỉ: ${user[i].address}</p>
        <p>Ngày đăng kí: ${user[i].time}</p>
        </div>
        <p><button class="b" onclick="cancel(${i})" style="bottom: 10px;
        right: 10px;">Thoát</button></p>
        <p id="update"><button class="b" onclick="update(${i})" style="bottom: 10px;
        right: 70px;">Cập nhật thông tin</button></p>`
    }
    }
  }
  




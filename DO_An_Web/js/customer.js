const user = JSON.parse(localStorage.getItem('user')) || [];
const order = JSON.parse(localStorage.getItem('order')) || [];

document
    .querySelector("#customer")
    .addEventListener("click", function () {
        document.querySelector("#content").innerHTML = `
        <div class="filter-container">
          <div class="search">
            <input type="text" placeholder="Tìm Mã KH hoặc tên KH" class="khachhang_spadmin" />
            <button class="khachhang-search">Tìm</button>
            <img onclick="reload()" class="reload" src="./img/OIP.jpg">

          </div>
        </div>

        <div style="margin:10px">
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
        <p><button class="b" onclick="del()" style="bottom: 10px;
        right: 200px;">Xóa</button></p>
        </div></div>`;
         displayCustomer(user);
         filter_khachang(user);

         
    })


    function reload() {
      document.querySelector("#content").innerHTML = `
      <div class="filter-container">
        <div class="search">
          <input type="text" placeholder="Tìm Mã KH hoặc tên KH" class="khachhang_spadmin" />
          <button class="khachhang-search">Tìm</button>
          <img onclick="reload()" class="reload" src="./img/OIP.jpg">

        </div>
      </div>

      <div style="margin:10px">
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
      <p><button class="b" onclick="del()" style="bottom: 10px;
      right: 200px;">Xóa</button></p>
      </div></div>`;
       displayCustomer(user);
       filter_khachang(user);

       
  
        }
    

          
      function filter_khachang(user){
        document.querySelector('.khachhang-search').addEventListener('click', function () {
          user_temp =[" "];
          id=[];
          let khachhang = document.querySelector('.khachhang_spadmin');
          let khachhangvalue = khachhang.value.trim();
          if(!khachhangvalue){
            return;
          }
          if (!isNaN(khachhangvalue)) {
            if(user[khachhangvalue]!= null )
            {
              let khachhangid = parseInt(khachhangvalue);
              user_temp.push(user[khachhangid]);
              id.push(khachhangid);
            }
          } 
          else {
            user.forEach( (user,index) => {
              if(user.username.toLowerCase() == khachhangvalue.toLowerCase()){
                user_temp.push(user);
                id.push(index);
              }
            });
        }
        
        const user_clear = document.querySelector("#list-user");
        while (user_clear.firstChild) {
          user_clear.removeChild(user_clear.firstChild);
        }
        user_clear.innerHTML = `
        <tr style="border: 1px solid black">
        <th>Mã KH</th>
        <th>Tài khoản</th>
        <th>Tên khách hàng</th>
        <th>Hóa đơn</th>
        <th>Thông tin</th>
        </tr>`;
        displayCustomer(user_temp);

        var rows = user_clear.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].getElementsByTagName("td");
          if(cells[0]) {
            cells[0].innerHTML = id[i-1];
          }
        }

      });
    }
    function del(i) {
      let ans = confirm(`Xóa tài khoản ${user[i].username}?`)
      if (ans) {
        alert("Đã xóa tài khoản.");
        user.splice(i,1);
        document.querySelector("#list-user").innerHTML = `
        <tr style="border: 1px solid black">
        <th>Mã KH</th>
        <th>Tài khoản</th>
        <th>Tên khách hàng</th>
        <th>Hóa đơn</th>
        <th>Thông tin</th>
        </tr>`;
        displayCustomer(user);
    document.querySelector("#card").style.display = `none`;
    document.querySelector(".card2").style.display = `none`;
      }
      localStorage.setItem('user', JSON.stringify(user))
    }

function displayCustomer(user) {
    for (let i = 1; i < user.length; i++) {
        const kh = user[i];
    
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i}</td>
          <td>${kh.username}</td>
          <td>${kh.name}</td>
          <td id="order" onclick="checkorder(${i})">Kiểm tra</td>
          <td id="xem" onclick="show(${i})">Xem</td>
          `;
    
        document.querySelector("#list-user").appendChild(row);
      }
}

function statusDisplay(num) {
  let status = "";
  switch(num) {
    case 1: status = "Chưa xác nhận"
    break;
    case 2: status = "Đã xác nhận"
    break;
    case 3: status = "Đang giao hàng"
    break;
    case 4: status = "Hoàn thành"
    break;
    case 5: status = "Đã hủy"
  }
  return status;
}

function checkorder(i) {
  document.querySelector("#card").innerHTML = `
    <div class="orders">
    <h1>Lịch sử đơn hàng</h1>
    <p class="title">Số lượng: ${(user[i].order).length} đơn</p>
    <div id="orders">
    <table style="width: 100%; border: 1px solid black; overflow-y: scroll; text-align: center" id="order-table">
      <tr style="border: 1px solid black">
        <th>Mã hóa đơn</th>
        <th>SLSP</th>
        <th>Tổng tiền</th>
        <th>Thời gian</th>
        <th>Trạng thái</th>
      </tr>
    </table>
      </div>
    <p><button class="b" onclick="cancelP(${i})" style="bottom: 10px;
        right: 10px;">Thoát</button></p>
  `;

  if ((user[i].order).length > 0) {
    for (let x = 0; x < (user[i].order).length; x++) {
      const hd = (user[i].order)[x];
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td id="hd" onclick=>HD${hd.index+1}</td>
        <td>${(hd.products).length}</td>
        <td>${hd.cost}</td>
        <td>${hd.time}</td>
        <td id="change-stt" onclick="changeStatus(${i},${x})" title="Sửa trạng thái">${statusDisplay(hd.status)}</td>
      `;
  
      document.querySelector("#order-table").appendChild(row);
    }
  } else {document.querySelector("#orders").innerHTML = `<h1 style="margin-top:20%;color: gray;">Chưa có đơn hàng nào</h1>`}
  document.querySelector("#card").style.display = `block`;
  document.querySelector(".orders").style.display = `block`;
}

function cancelP() {
  document.querySelector("#card").style.display = `none`;
  document.querySelector(".orders").style.display = `none`;
}

function changeStatus(i, x) {
  let stt = prompt("Chọn trạng thái:\n1. Chưa xác nhận\n2. Đã xác nhận\n3. Đang giao hàng\n4. Hoàn thành\n5. Đã hủy", (user[i].order)[x].status);
  if (parseInt(stt) != 1 && parseInt(stt) != 2 && parseInt(stt) != 3 && parseInt(stt) != 4 && parseInt(stt) != 5) {
    alert("Vui lòng nhập số trạng thái hợp lệ.");
  changeStatus(i, x)
  }
   else {
    (user[i].order)[x].status = parseInt(stt);
    localStorage.setItem('user', JSON.stringify(user));
    let ec = order.find(value => value.index == (user[i].order)[x].index)
    ec.status = parseInt(stt);
    localStorage.setItem('order', JSON.stringify(order));
    checkorder(i);
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
        <p><button class="b" onclick="del(${i})" style="bottom: 10px;
        right: 215px;">Xóa</button></p>
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
    <p>Mật khẩu: </p><input type="password" id="password"></br>
    <small></small>
    </div>
    </div>`;
    document.querySelector("#update").innerHTML = `<button class="b" onclick="save(${i})" style="bottom: 10px;
    right: 70px; width: 138.6px">Lưu</button>`
    
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
      if(document.querySelector("#password").value.length < 8){
        showError(document.querySelector("#password"), "Mật khẩu có độ dài lớn hơn hoặc bằng 8");
      
  } else if  ( document.querySelector("#phone").value.length != 10 || (document.querySelector("#phone").value)[0] != "0") 
   { 
        showError(document.querySelector("#phone"), "Số điện thoại không hợp lệ");
  
  } else if (isNumeric(document.querySelector("#phone")) )
  { 
       showError(document.querySelector("#phone"), "Số điện thoại không hợp lệ");
  
  
  
  } else if (/\d/.test(document.querySelector("#name").value))
  { 
       showError(document.querySelector("#name"), "Tên không hợp lệ");
  
  
  
  } else {    
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
        right: 70px;">Cập nhật thông tin</button></p>
        <p><button class="b" onclick="del()" style="bottom: 10px;
        right: 215px;">Xóa</button></p>`
        document.querySelector("#list-user").innerHTML = `
        <tr style="border: 1px solid black">
        <th>Mã KH</th>
        <th>Tài khoản</th>
        <th>Tên khách hàng</th>
        <th>Hóa đơn</th>
        <th>Thông tin</th>
        </tr>`;
        displayCustomer(user);
    }
    }
  }
  
}
function isNumeric(str) {
  if (typeof str == "string") return false;
}


const user = JSON.parse(localStorage.getItem("user")) || null;
current = JSON.parse(sessionStorage.getItem("current")) || null;
const createNav = () => {
  const navbar = document.querySelector(".navbar");

  navbar.innerHTML = `
  <div class="nav">
  <a href="index-user.html"><img src="img/dark-logo.png" class="brand-logo" alt=""></a>
  <div class="nav-items">
      <div class="search">
          <input type="text" id= "search-box"class="search-box" placeholder="Tìm kiếm sản phẩm" value="">
          <button class="search-btn" >Tìm</button>
          <a>
          <img src="img/user.png" id="user-img" alt="">
          <div class="login-logout-popup hide">
          <p class="account-info">hi</p>
          <button onclick="show()" id="user-info"></button>
          <button class="btn" id="user-btn">Đăng xuất</button>
          </div>
          </a>

      <a href="cart.html"><img src="img/cart.png" alt=""></a>
      </div>
  </div>
</div>
<ul class="Links-container">
  <li class="link"><a href="index-user.html" style="text-decoration: none; color: #383838;">Home</a></li>
  <li id="adidas"class="link">Adidas</li>
  <li id="gucci"class="link">Gucci</li>
  <li id="nike" class="link">Nike</li>
  <li id="chanel" class="link">Chanel</li>
  <li id="louisvuitton" class="link">Louis Vuitton</li>
 
</ul>
<div id="card">
<div class="backdrop"></div>
<div class="card">
<h1>Thông tin tài khoản</h1>
<p class="title">@sankatjm0</p>
<div class="thongtin">
<p>Tên khách hàng: ${current.name}</p>
<p>Số điện thoại: ${current.phone}</p>
<p>Địa chỉ: ${current.address}</p>
</div>
<p><button class="b" onclick="cancel()" style="bottom: 10px;
right: 10px;">Thoát</button></p>
<p id="update"><button class="b" onclick="update()" style="bottom: 10px;
right: 70px;">Cập nhật thông tin</button></p>
</div></div>
    
    `;
};

createNav();

document.querySelector(".search-btn").addEventListener("click", function () {
  const searchValue = document.querySelector(".search-box").value;
  window.location.href =
    "search.html?search=" + encodeURIComponent(searchValue);
});

// nav popup
const userInfo = document.querySelector("#user-info");
const userImageButton = document.querySelector("#user-img");
const userPopup = document.querySelector(".login-logout-popup");
const popuptext = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");

  
userImageButton.addEventListener("click", () => {
  userPopup.classList.toggle("hide");
});

// window.onload = () => {

    if (current != null) {
    //means user is logged in
    popuptext.innerHTML = `Xin chào, ${current.name}`;
    userInfo.innerHTML = `Xem thông tin
    `
    ;
    actionBtn.innerHTML = "Đăng xuất";
    actionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    // user is logged out
    popuptext.innerHTML = "Đăng nhập để đặt hàng";
    actionBtn.innerHTML = "Đăng nhập";
    actionBtn.addEventListener("click", () => {
      location.replace("./signin.html");
    });
  }
// };

// function myFunction() {
//   var popup = document.getElementById("update-info");
//   popup.classList.toggle("show");
// }

function addSDT() {
  let updateBody = document.getElementById("sdt");
  current.phone = prompt("Nhap so dien thoai", "");
  for(let i=0; i<user.length; i++) {
    if(user[i].username == current.username) {
      user[i].phone = current.phone;
      localStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('current', JSON.stringify(current));
      updateBody.innerText = `So dien thoai: ${current.phone}`;
    }
  }
}

function show() {
  document.querySelector("#card").style.display = `block`;

}

function cancel() {
  document.querySelector("#card").style.display = 'none';
}

function update() {
  document.querySelector(".thongtin").innerHTML = `<p>Tên khách hàng: <input id="name"></p>
  <p>Số điện thoại: <input id="phone"></p>
  <p>Địa chỉ: <input id="address"></p>`;
  document.querySelector("#update").innerHTML = `<button class="b" onclick="save()" style="bottom: 10px;
  right: 70px;">Lưu</button>`
}

function save() {
  for(let i=0; i<user.length; i++) {
    if(user[i].username == current.username) {
      user[i].name = document.querySelector("#name").value;
      user[i].phone = document.querySelector("#phone").value;
      user[i].address = document.querySelector("#address").value;
      localStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('current', JSON.stringify(user[i]));
      current = JSON.parse(sessionStorage.getItem('current'));
    }
  }
  document.querySelector(".thongtin").innerHTML = `<p>Tên khách hàng: ${current.name}</p>
  <p>Số điện thoại: ${current.phone}</p>
  <p>Địa chỉ: ${current.address}</p>`
  document.querySelector("#update").innerHTML = `<button class="b" onclick="update()" style="bottom: 10px;
  right: 70px;">Cập nhật thông tin</button>`
}
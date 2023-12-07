user = JSON.parse(localStorage.getItem("user")) || [];
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
          <img src="img/user.png" title="Tài khoản" id="user-img" alt="">
          <div class="login-logout-popup hide">
          <p class="account-info">hi</p>
          <button onclick="show()" id="user-info"></button>
          <button class="btn" id="user-btn">Đăng xuất</button>
          </div>
          </a>

      <a id="show-cart"><img src="img/cart.png" title="Giỏ hàng" alt=""></a>
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
<div id="card" style="display="none";">
<div class="backdrop"></div>
<div class="card">
<h1>Thông tin tài khoản</h1>
<p class="title">@sankatjm0</p>
<div class="thongtin">
<p>Tên khách hàng: </p>
<p>Số điện thoại:</p>
<p>Địa chỉ: </p>
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
  const searchValue = document.querySelector(".search-box").value.trim();
  if(searchValue !=="")
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
var current = JSON.parse(sessionStorage.getItem("current")) || null;

// window.onload = () => {
  
  

    if (current != null) {
    //means user is logged in
    popuptext.innerHTML = `Xin chào, ${current.name}`;
    userInfo.style = "font-size: 18px; padding: 2px 5px; border-style: none;  margin-top: 5px; background-color: #b3b3b3;"
    
    userInfo.innerHTML = `Xem thông tin
    `
    ;
    document.querySelector(".thongtin").innerHTML = `<p>Tên khách hàng: ${current.name}</p>
    
    <p>Số điện thoại: ${current.phone}</p>
    
    <p>Địa chỉ: ${current.address}</p>
    `;
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


function show() {
  document.querySelector("#card").style.display = `block`;
  document.querySelector(".card").style.display = `block`;
  document.querySelector(".backdrop").style.display = `block`;

}

function cancel() {
  document.querySelector(".thongtin").innerHTML = `<p>Tên khách hàng: ${current.name}</p>
  <p>Số điện thoại: ${current.phone}</p>
  <p>Địa chỉ: ${current.address}</p>`
  document.querySelector("#update").innerHTML = `<button class="b" onclick="update()" style="bottom: 10px;
  right: 70px;">Cập nhật thông tin</button>`
  popuptext.innerHTML = `Xin chào, ${current.name}`;
  document.querySelector("#card").style.display = `none`;
  document.querySelector(".card").style.display = `none`;
  document.querySelector(".backdrop").style.display = `none`;

}

function update() {
  document.querySelector(".thongtin").innerHTML = `
  <div>
  <p>Tên khách hàng: </p><input type="text" id="name">
  </br><small></small>
  </div>
  <div>
  <p>Số điện thoại: </p><input type="text" id="phone">
  </br><small></small>
  </div>
  <div>
  <p>Địa chỉ: </p><input type="text" id="address">
  </br><small></small>
  </div>`;
  document.querySelector("#update").innerHTML = `<button class="b" onclick="save()" style="bottom: 10px;
  right: 70px;">Lưu</button>`
  
}

function save() {
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
    if  (document.querySelector("#phone").value.length != 10 || (document.querySelector("#phone").value)[0] != "0") 
 { 
      showError(document.querySelector("#phone"), "Số điện thoại không hợp lệ");

} else if (isNumeric(document.querySelector("#phone").value) )
{ 
     showError(document.querySelector("#phone"), "Số điện thoại không hợp lệ");
} else if (/\d/.test(document.querySelector("#name").value))
{ 
     showError(document.querySelector("#name"), "Tên không hợp lệ");



}else {
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
  popuptext.innerHTML = `Xin chào, ${current.name}`;
}
}
}

function isNumeric(str) {
  if (typeof str == "string") return false;
}

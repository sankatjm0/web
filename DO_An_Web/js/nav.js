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
var current = JSON.parse(sessionStorage.getItem("current")) || null;

window.onload = () => {
  
createAdmin();
createProduct();
    if (current != null) {
    //means user is logged in
    popuptext.innerHTML = `Xin chào, ${current.name}`;
    userInfo.innerHTML = `Xem thông tin
    `
    ;
    document.querySelector(".thongtin").innerHTML = `<p>Tên khách hàng: ${current.name}</p>
    <p>Số điện thoại: ${current.phone}</p>
    <p>Địa chỉ: ${current.address}</p>`;
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
};

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
  document.querySelector(".card").style.display = `block`;
  document.querySelector(".backdrop").style.display = `block`;

}

function cancel() {
  document.querySelector("#card").style.display = `none`;
  document.querySelector(".card").style.display = `none`;
  document.querySelector(".backdrop").style.display = `none`;

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
  popuptext.innerHTML = `Xin chào, ${current.name}`;
}

function createAdmin() {
  if (!(user.find(value => value.username === "admin"))) {
    user.push( 
    {
      username: "admin",
      password: "admin",
    }
    );
  }
  localStorage.setItem('user', JSON.stringify(user));
}

function createProduct() {
  if (localStorage.getItem('product') === null) {
    var productArray = [
      { ID : 1,brand: 'chanel', img: 'img/product/10050.jpg', name: 'Superstar White Gold', price: 2100000 },
      { ID : 2,brand: 'chanel', img: 'img/product/10049.jpg', name: 'Stan Smith Leather White', price: 3030000 },
      { ID : 3,brand: 'chanel', img: 'img/product/10048.jpg', name: 'Gucci Snake Diamond', price: 18455000 },
      { ID : 4,brand: 'chanel', img: 'img/product/10047.jpg', name: 'Gucci Sneaker Dirty', price: 15000000 },
      { ID : 5,brand: 'chanel', img: 'img/product/10046.jpg', name: 'Balenciaga Speed Trainer Triple Black', price: 17050000 },
      { ID : 6,brand: 'chanel', img: 'img/product/10045.jpg', name: 'Vapormax X OFF WHITE 2018', price: 7500000 },
      { ID : 7,brand: 'chanel', img: 'img/product/10044.jpg', name: 'AIR MAX 270 ALL WHITE', price: 4319000 },
      { ID : 8,brand: 'chanel', img: 'img/product/10043.jpg', name: 'Human Race China Exclusive Green', price: 10375000 },
      { ID : 9,brand: 'chanel', img: 'img/product/10042.jpg', name: 'Alpha Bounce Instinct All Black', price: 4300000 },
      { ID : 10,brand: 'chanel', img: 'img/product/10041.jpg', name: 'Gucci Global Sneaker', price: 16050000 },
      { ID : 11,brand: 'louisvuitton', img: 'img/product/10040.jpg', name: 'Superstar White Gold', price: 2100000 },
      { ID : 12,brand: 'louisvuitton', img: 'img/product/10039.jpg', name: 'Stan Smith Leather White', price: 3030000 },
      { ID : 13,brand: 'louisvuitton', img: 'img/product/10038.jpg', name: 'Gucci Snake Diamond', price: 18455000 },
      { ID : 14,brand: 'louisvuitton', img: 'img/product/10037.jpg', name: 'Gucci Sneaker Dirty', price: 15000000 },
      { ID : 15,brand: 'louisvuitton', img: 'img/product/10036.jpg', name: 'Balenciaga Speed Trainer Triple Black', price: 17050000 },
      { ID : 16,brand: 'louisvuitton', img: 'img/product/10035.jpg', name: 'Vapormax X OFF WHITE 2018', price: 7500000 },
      { ID : 17,brand: 'louisvuitton', img: 'img/product/10034.jpg', name: 'AIR MAX 270 ALL WHITE', price: 4319000 },
      { ID : 18,brand: 'louisvuitton', img: 'img/product/10033.jpg', name: 'Human Race China Exclusive Green', price: 10375000 },
      { ID : 19,brand: 'louisvuitton', img: 'img/product/10032.jpg', name: 'Alpha Bounce Instinct All Black', price: 4300000 },
      { ID : 20,brand: 'louisvuitton', img: 'img/product/10031.jpg', name: 'Gucci Global Sneaker', price: 16050000 },
      { ID : 21,brand: 'adidas', img: 'img/product/10030.jpg', name: 'Gucci Bee Black', price: 16000000 },
      { ID : 22,brand: 'adidas', img: 'img/product/10029.jpg', name: 'Balenciaga Triple S Grey', price: 33000000 },
      { ID : 23,brand: 'adidas', img: 'img/product/10028.jpg', name: 'Rick Owens SS17 High', price: 18050000 },
      { ID : 24,brand: 'adidas', img: 'img/product/10027.jpg', name: 'Pegasus 35 Black', price: 7350000 },
      { ID : 25,brand: 'adidas', img: 'img/product/10026.jpg', name: 'Air Max 97 Silver Bullet', price: 8150000 },
      { ID : 26,brand: 'adidas', img: 'img/product/10025.jpg', name: 'Alpha Bounce Beyond Nude/Pink', price: 4100000 },
      { ID : 27,brand: 'adidas', img: 'img/product/10024.jpg', name: 'Adidas YUNG1 Navy/Red', price: 4590000 },
      { ID : 28,brand: 'adidas', img: 'img/product/10023.jpg', name: 'Gucci Snake Sneaker', price: 16000000 },
      { ID : 29,brand: 'adidas', img: 'img/product/10022.jpg', name: 'Gucci Global Silver Sneaker', price: 18000000 },
      { ID : 30,brand: 'adidas', img: 'img/product/10021.jpg', name: 'Yeezy 350 v2 ‘ Zebra ‘ Rep', price: 10255000 },
      { ID : 31,brand: 'gucci', img: 'img/product/10020.jpg', name: 'Yeezy 350 v2 Beluga 2.0', price: 9500000 },
      { ID : 32,brand: 'gucci', img: 'img/product/10019.jpg', name: 'Air Max 270 Black Pink', price: 6250000 },
      { ID : 33,brand: 'gucci', img: 'img/product/10018.jpg', name: 'Air max 1 x Parra', price: 15549000 },
      { ID : 34,brand: 'gucci', img: 'img/product/10017.jpg', name: 'Human Race China Exclusive Peace', price: 10375000 },
      { ID : 35,brand: 'gucci', img: 'img/product/10016.jpg', name: 'YUNG1 Frieza', price: 4130000 },
      { ID : 36,brand: 'gucci', img: 'img/product/10015.jpg', name: 'Gucci Fox Sneaker', price: 16000000 },
      { ID : 37,brand: 'gucci', img: 'img/product/10014.jpg', name: 'Gucci Stripe Sneaker', price: 15099000 },
      { ID : 38,brand: 'gucci', img: 'img/product/10013.jpg', name: 'Rick Owens SS17 Low', price: 23100000 },
      { ID : 39,brand: 'gucci', img: 'img/product/10012.jpg', name: 'Balenciaga Triple S Black', price: 21255000 },
      { ID : 40,brand: 'gucci', img: 'img/product/10011.jpg', name: 'Air max 1 Box Print', price: 2330000 },
      { ID : 41,brand: 'nike', img: 'img/product/10010.jpg', name: 'Nike Element 87 Black', price: 5295000 },
      { ID : 42,brand: 'nike', img: 'img/product/10009.jpg', name: 'Human Race V3 Solar Black', price: 12355000 },
      { ID : 43,brand: 'nike', img: 'img/product/10008.jpg', name: 'Adidas Alpha Bounce Instinct Grey', price: 2799000 },
      { ID : 44,brand: 'nike', img: 'img/product/10007.jpg', name: 'Gucci LOVED', price: 15600000 },
      { ID : 45,brand: 'nike', img: 'img/product/10006.jpg', name: 'Gucci Flame Sneaker', price: 17099000 },
      { ID : 46,brand: 'nike', img: 'img/product/10005.jpg', name: 'Balenciaga Triple S White', price: 20395000 },
      { ID : 47,brand: 'nike', img: 'img/product/10004.jpg', name: 'Balenciaga Speed Trainer BB', price: 17020000 },
      { ID : 48,brand: 'nike', img: 'img/product/10003.jpg', name: 'Nike M2K John', price: 2949000 },
      { ID : 49,brand: 'nike', img: 'img/product/10002.jpg', name: 'Nike Pegasus 35 Grey', price: 5350000 },
      { ID : 50,brand: 'nike', img: 'img/product/10001.jpg', name: 'Adidas Prophere Undefeated', price: 6599000 },
    ];
    localStorage.setItem('product', JSON.stringify(productArray));
  }
}


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
          <p class="account-info">Xin chào, name</p>
          <button class="btn" id="user-btn">Đăng xuất</button>
          </div>
          </a>

      <a href="#"><img src="img/cart.png" alt=""></a>
      </div>
  </div>
</div>
<ul class="Links-container">
  <li class="link"><a href="index-user.html" style="text-decoration: none; color: #383838;">Home</a></li>
  <li id="adidas"class="link">Adidas</li>
  <li id="gucci"class="link">Gucci</li>
  <li id="nike" class="link">Nike</li>
  <li id="chanel" class="link">Chanel</li>
  <li id="luoisvuitton" class="link">Luois Vuitton</li>
 
</ul>
    
    `;
};

createNav();

document.querySelector(".search-btn").addEventListener("click", function () {
  const searchValue = document.querySelector(".search-box").value;
  window.location.href =
    "search.html?search=" + encodeURIComponent(searchValue);
});

// nav popup
const userImageButton = document.querySelector("#user-img");
const userPopup = document.querySelector(".login-logout-popup");
const popuptext = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");

userImageButton.addEventListener("click", () => {
  userPopup.classList.toggle("hide");
});

window.onload = () => {
  let user = sessionStorage.getItem("current") || null;
  if (user != null) {
    //means user is logged in
    popuptext.innerHTML = `Xin chào, ${user}`;
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

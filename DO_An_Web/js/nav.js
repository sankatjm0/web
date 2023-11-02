const createNav = () => {
  const navbar = document.querySelector(".navbar");

  navbar.innerHTML = `
  <div class="nav">
  <a href="http://127.0.0.1:5500/Wed/Do_An_Web/index-.html#"><img src="img/dark-logo.png" class="brand-logo" alt=""></a>
  <div class="nav-items">
      <div class="search">
          <input type="text" class="search-box" placeholder="Tìm kiếm sản phẩm">
          <button class="search-btn">Search</button>
          <a>
          <img src="img/user.png" id="user-img" alt="">
          <div class="login-logout-popup hide">
          <p class="account-info">Log in as, name</p>
          <button class="btn" id="user-btn">Log out</button>
          </div>
          </a>

      <a href="#"><img src="img/cart.png" alt=""></a>
      </div>
  </div>
</div>
<ul class="Links-container">
  <li class="link-item"><a href="http://127.0.0.1:5500/Wed/Do_An_Web/index-user.html#" class="link">Home</a></li>
  <li class="link-item"><a href="adidas.html" class="link">Adidas</a></li>
  <li class="link-item"><a href="gucci.html" class="link">Gucci</a></li>
  <li class="link-item"><a href="nike.html" class="link">Nike</a></li>
  <li class="link-item"><a href="chanel.html" class="link">Chanel</a></li>
  <li class="link-item"><a href="luois_vuitton.html" class="link">Louis Vuitton</a></li>



</ul>
    
    `;
};
createNav();

// nav popup
const userImageButton = document.querySelector("#user-img");
const userPopup = document.querySelector(".login-logout-popup");
const popuptext = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");

userImageButton.addEventListener("click", () => {
  userPopup.classList.toggle("hide");
});

window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user != null) {
    //means user is logged in
    popuptext.innerHTML = `log in as, ${user.name}`;
    actionBtn.innerHTML = "log out";
    actionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    // user is logged out
    popuptext.innerHTML = "Đăng nhập để đặt hàng";
    actionBtn.innerHTML = "Đăng nhập";
    actionBtn.addEventListener("click", () => {
      location.href = "/login";
    });
  }
};

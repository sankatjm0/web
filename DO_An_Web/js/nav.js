const createNav = () => {
  const navbar = document.querySelector(".navbar");

  navbar.innerHTML = `
  <div class="nav">
  <a href="http://127.0.0.1:5500/Wed/Do_An_Web/index.html#"><img src="img/dark-logo.png" class="brand-logo" alt=""></a>
  <div class="nav-items">
      <div class="search">
          <input type="text" class="search-box" placeholder="Search Brand, Product">
          <button class="search-btn">Search</button>
          <a href="#"><img src="img/user.png" alt=""></a>
      <a href="#"><img src="img/cart.png" alt=""></a>
      </div>
  </div>
</div>
<ul class="Links-container">
  <li class="link-item"><a href="http://127.0.0.1:5500/Wed/Do_An_Web/index.html#" class="link">Home</a></li>
  <li class="link-item"><a href="adidas.html" class="link">Adidas</a></li>
  <li class="link-item"><a href="gucci.html" class="link">Gucci</a></li>
  <li class="link-item"><a href="nike.html" class="link">Nike</a></li>
  <li class="link-item"><a href="chanel.html" class="link">Chanel</a></li>
  <li class="link-item"><a href="luois_vuitton.html" class="link">Louis Vuitton</a></li>



</ul>
    
    `;
};
createNav();

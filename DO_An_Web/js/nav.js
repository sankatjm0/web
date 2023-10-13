const createNav = () => {
  const navbar = document.querySelector(".navbar");

  navbar.innerHTML = `
  <div class="nav">
  <img src="img/dark-logo.png" class="brand-logo" alt="">
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
  <li class="link-item"><a href="#" class="link">Home</a></li>
  <li class="link-item"><a href="#" class="link">Adidas</a></li>
  <li class="link-item"><a href="#" class="link">Gucci</a></li>
  <li class="link-item"><a href="#" class="link">Nike</a></li>
  <li class="link-item"><a href="#" class="link">Chanel</a></li>
  <li class="link-item"><a href="#" class="link">Louis Vuitton</a></li>



</ul>
    
    `;
};
createNav();

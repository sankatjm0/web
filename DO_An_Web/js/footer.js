const createFooter = () => {
  let footer = document.querySelector("footer");
  footer.innerHTML = `
  <div class="footer-content">
            <img src="img/light-logo.png" class="logo" alt="">
            <div class="footer-ul-container">   
            </div>
        </div>
        <p class="info">Spport Emails - help@shopnhalam.com,
            customersupport@shopnhalam.com
        </p>
        <p class="info">Telephone - 0878955654</p>
        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="#" class="social-link">instagram</a>
                <a href="https://www.facebook.com/profile.php?id=100063895685315" class="social-link">facebook</a>
                <a href="#" class="social-link">twitter</cl>
            </div>
        </div>
        <p class="footer-credit">Mua sắm theo cách của </p>
  
  `;
};
createFooter();


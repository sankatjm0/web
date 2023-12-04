
const order = JSON.parse(localStorage.getItem('order')) || [];
const user = JSON.parse(localStorage.getItem('user')) || [];

function checklog() {
  
  if (current == null) {
    alert("Vui lòng đăng nhập để mua hàng.");
    
  } else {
    cart = current.cart;
    orders = current.order || [];

    if(document.querySelector("#add-checkout")!= null) {document.querySelector("#add-checkout").innerHTML = `<div class="form">
  <h1 class="heading">Đặt hàng</h1>
  <p class="text">Thông tin nhận hàng</p>
  <input type="text" id="name" placeholder="Tên người nhận hàng">
  <input type="text" id="address" placeholder="Địa chỉ"> 
  <input type="text" id="phone" placeholder="Số điện thoại">

  </div>`;
  document.querySelector(
    "#check"
  ).innerHTML = `<button class="place-order-btn">Xác nhận</button>
  `;
  var address = document.getElementById("address");
  var name = document.getElementById("name");
  var phone = document.getElementById("phone");  
  var cost = document.querySelector(".bill").textContent;
  
  document
    .querySelector(".place-order-btn")
    .addEventListener("click", function () {
  
      if (validateForm()) {
        var cost = document.querySelector(".bill");

        alert("Đặt hàng thành công!");
        let acc = user.find(acc => acc.username == current.username)
        order.push(
          {
            index: order.length,
            cost: cost.textContent,
            username: current.username,
            address: address.value,
            name: name.value,
            phone: phone.value,
            products: current.cart,
            status: 1,
            time: getCurrentTime(),
          }
        );
        localStorage.setItem('order', JSON.stringify(order));
        current.cart = [];
        var bills = []
        for(let a=0; a<order.length; a++) {
          if(order[a].username == current.username) {
            bills.push(order[a]);
          }
        }
        document.querySelector("#add-checkout").innerHTML = ``;
        document.querySelector(".bill").innerHTML = ``;
        document.querySelector(`.cart`).innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;
        acc.cart = [];
        current.order = bills;
        acc.order = bills;
        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('current', JSON.stringify(current));
        location.reload();
      } else {
        alert("Vui lòng điền đủ thông tin!");
      }
    });
  }
  function validateForm() {
    if (
      address.value.trim() === "" ||
      name.value.trim() === "" ||
      phone.value.trim() === ""
    ) {
      return false;
    }
    return true;
  }
}

}
document.querySelector(".checkout-btn").addEventListener("click", function () {
  checklog();
});

function getCurrentTime() {
  const currentTime = new Date();
  return currentTime.toLocaleString("vi-VN", {hour:'2-digit', minute:'2-digit', second: '2-digit', day: 'numeric', month:'long', year: 'numeric'});
}
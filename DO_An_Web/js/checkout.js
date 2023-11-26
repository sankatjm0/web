function checklog() {
  
  if (current == null) {
    alert("Vui lòng đăng nhập để mua hàng.");
    
  } else {
    cart = current.cart;
    document.querySelector("#add-checkout").innerHTML = `<div class="form">
  <h1 class="heading">Checkout</h1>
  <p class="text">delivert address</p>
  <input type="text" id="name" placeholder="Tên người nhận hàng">
  <input type="text" id="address" placeholder="Địa chỉ"> 
  <input type="text" id="phone" placeholder="Số điện thoại">

  </div>`;
  document.querySelector(
    "#check"
  ).innerHTML = `<button class="place-order-btn">Xác nhận</button>
  `;
  var addressInput = document.getElementById("address");
  var name = document.getElementById("name");
  var sdt = document.getElementById("phone");

  
  
  document
    .querySelector(".place-order-btn")
    .addEventListener("click", function () {
  
      if (validateForm()) {
        alert("Đặt hàng thành công!");
      } else {
        alert("Vui lòng điền đủ thông tin!");
      }
    });

  function validateForm() {
    if (
      addressInput.value.trim() === "" ||
      name.value.trim() === "" ||
      sdt.value.trim() === ""
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
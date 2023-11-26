var user = JSON.parse(localStorage.getItem("user")) || [];

document.querySelector(".checkout-btn").addEventListener("click", function () {
  document.querySelector("#add-checkout").innerHTML = `<div class="form">
  <h1 class="heading">Checkout</h1>
  <p class="text">delivert address</p>
  <input type="text" id="name" placeholder="Tên người nhận hàng">
  <input type="text" id="address" placeholder="Đại chỉ"> 
  <input type="text" id="sdt" placeholder="Số điện thoại">

  </div>`;
  document.querySelector(
    "#check"
  ).innerHTML = `<button class="place-order-btn">place order</button>
  `;
  var addressInput = document.getElementById("address");
  var name = document.getElementById("name");
  var sdt = document.getElementById("sdt");

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
});

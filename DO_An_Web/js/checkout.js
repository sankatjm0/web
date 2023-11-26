

document.querySelector(".checkout-btn").addEventListener("click", function() {
  document.querySelector("#add-checkout").innerHTML =
  `<div class="form">
  <h1 class="heading">Checkout</h1>
  <p class="text">delivert address</p>
  <input type="text" id="address" placeholder="address">
  <input type="text" id="street" placeholder="street">
  <div class="three-input-container">
      <input type="text" id="city" placeholder="city">
      <input type="text" id="state" placeholder="state">
      <input type="text" id="pincode" placeholder="pin code">
  </div>
  <input type="text" id="landmark" placeholder="land mark">
  
  </div>`;
  document.querySelector("#check").innerHTML = `<button class="place-order-btn">place order</button>
  `
  const addressInput = document.getElementById("address");
const streetInput = document.getElementById("street");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const pincodeInput = document.getElementById("pincode");
const landmarkInput = document.getElementById("landmark");
  document.querySelector(".place-order-btn").addEventListener("click", function() {
    if (validateForm()) {
     alert("Đặt hàng thành công!");
    } else {
      alert("Vui lòng điền đủ thông tin!");
    }
  });
  
  function validateForm() {
    if (
      addressInput.value.trim() === "" ||
      streetInput.value.trim() === "" ||
      cityInput.value.trim() === "" ||
      stateInput.value.trim() === "" ||
      pincodeInput.value.trim() === "" ||
      landmarkInput.value.trim() === ""
    ) {
      return false;
    }
    return true;
  }
  
  });


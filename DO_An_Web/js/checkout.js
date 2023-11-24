const addressInput = document.getElementById("address");
const streetInput = document.getElementById("street");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const pincodeInput = document.getElementById("pincode");
const landmarkInput = document.getElementById("landmark");
const placeOrderBtn = document.querySelector(".place-order-btn");

placeOrderBtn.addEventListener("click", function () {
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


function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  // update the class for the input
  input.class = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

const signup = document.querySelector(".signup");
var userArr = [];
const NAME_REQUIRED = "Vui long nhap ten";
const PASSWORD_REQUIRED = "Vui long nhap mat khau";
userArr = JSON.parse(localStorage.getItem("user")) || [];

signup.addEventListener("submit", function (event) {
  // stop form submission
  event.preventDefault();

  // validate the form
  function checkUser(event) {
    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i] &&
        userArr[i].username === signup.elements["username"].value
      ) {
        showError(signup.elements["username"], "Tên đăng nhập đã tồn tại.");
        event.preventDefault();
      }
    }
  }

  let nameValid = hasValue(signup.elements["username"], NAME_REQUIRED);
  let passwordValid = hasValue(signup.elements["password"], PASSWORD_REQUIRED);
  // let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
  // if valid, submit the form.

  if (nameValid && passwordValid) {
    checkUser();

    alert("Dang ki thanh cong");
    let username = signup.elements["username"].value;
    let password = signup.elements["password"].value;
    let address = signup.elements["address"].value;
    let name = signup.elements["name"].value;
    let phone = signup.elements["phone"].value;
    var user = JSON.parse(localStorage.getItem("user")) || [];
    user.push({
      username: username,
      password: password,
      address: address,
      name: name,
      phone: phone,
    });
    localStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("current", JSON.stringify(user));
    location.replace("./index-user.html?");
  }
});

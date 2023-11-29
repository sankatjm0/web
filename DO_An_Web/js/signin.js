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
const signin = document.querySelector(".signin");
const NAME_REQUIRED = "Vui lòng nhập tên tài khoản";
const PASSWORD_REQUIRED = "Vui lòng nhập mật khẩu";
var userArr = JSON.parse(localStorage.getItem("user")) || [];

signin.addEventListener("submit", function (event) {
  event.preventDefault();
  let count = 0;
  let notBlankName = hasValue(signin.elements["username"], NAME_REQUIRED);
  let notBlankPass = hasValue(signin.elements["password"], PASSWORD_REQUIRED);
  function checkPass(num) {
    if (signin.elements["password"].value === userArr[num].password) {
      alert("Đăng nhập thành công.");
      sessionStorage.setItem("current", JSON.stringify(userArr[num]));
      if (signin.elements["username"].value == "admin") {
        location.replace("./index-admin.html");
      } else location.replace("./index-user.html?");
    } else {
      showError(signin.elements["password"], "Sai mật khẩu");
    }
  }

  if (notBlankName && notBlankPass) {
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username === signin.elements["username"].value) {
        var iD = userArr[i].username;
        count++;
        checkPass(i);
      }
    }
    if (count == 0) alert("Tài khoản không tồn tại.");
  }
});


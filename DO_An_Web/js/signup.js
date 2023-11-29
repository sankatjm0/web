document.querySelector("#nav-signup").addEventListener("click", function() {
  document.querySelector(".container").innerHTML = `<img src="img/dark-logo.png" class="logo">
<form class="signup">
    <div>
        <input type="text" autocapitalize="off" id="name"  placeholder="Họ và tên" />
        <small></small>
    </div>

    <div>
        <input type="text" autocapitalize="off" id="username" placeholder="Tên tài khoản" />
        <small></small>
    </div>

    <div>
        <input type="text" autocapitalize="off" id="phone" placeholder="Số điện thoại" />
        <small></small>
    </div>

    <div>
        <input type="text" autocapitalize="off" id="address" placeholder="Địa chỉ" />
        <small></small>
    </div>

    <div>
        <input type="password" autocapitalize="off" id="password" placeholder="Mật khẩu" />
        <small></small>
    </div>

    <button type="submit" class="submit-btn">Tạo tài khoản</button>
</form>
<a href="./signin.html" class="link" >Bạn đã có tài khoản? Đăng nhập tại đây</a>`;

const signup = document.querySelector(".signup");
var userArr = [];
const USERNAME_REQUIRED = "Vui lòng nhập tên đăng nhập";
// const PASSWORD_REQUIRED = "Vui lòng nhập mật khẩu";
const ADDRESS_REQUIRED = "Vui lòng nhập địa chỉ";
const PHONE_REQUIRED = "Vui lòng nhập số diện thoại";
// const NAME_REQUIRED = "Vui lòng nhập tên";
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
  let addressValid = hasValue(signup.elements["address"], ADDRESS_REQUIRED);
  let phoneValid = hasValue(signup.elements["phone"], PHONE_REQUIRED);
  let nameValid = hasValue(signup.elements["name"], NAME_REQUIRED);

  let usernameValid = hasValue(signup.elements["username"], USERNAME_REQUIRED);
  let passwordValid = hasValue(signup.elements["password"], PASSWORD_REQUIRED);
  // let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
  // if valid, submit the form.

  if (nameValid && passwordValid && addressValid && phoneValid && usernameValid) {
    if(signup.elements["password"].value.length < 8){
      showError(signup.elements["password"], "Mật khẩu có độ dài lớn hơn hoặc bằng 8");
    
} else if  ( signup.elements["phone"].value.length < 10 || document.querySelector("#phone").value.length > 11)
 { 
      showError(signup.elements["phone"], "Số điện thoại không hợp lệ");

} else {    
  checkUser();

    alert("Đăng kí thành công!");
    
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
      time: getCurrentTime(),
      cart: [],
      order: [],
    });
    localStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("current", JSON.stringify(user[user.length-1]));
    location.replace("./index-user.html?");
  }
}
});

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




function getCurrentTime() {
  const currentTime = new Date();
  return currentTime.toLocaleString("vi-VN", {hour:'2-digit', minute:'2-digit', second: '2-digit', day: 'numeric', month:'long', year: 'numeric'});
}

});

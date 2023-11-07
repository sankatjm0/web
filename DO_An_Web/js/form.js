// redirect to home page if user logged in
window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (compareToken(user.authToken, user.email)) {
      location.replace("/");
    }
  }
};

const loader = document.querySelector(".loader");

//select input
const submitBtn = document.querySelector(".submit-btn");
const name = document.querySelector("#name") || null;
const email = document.querySelector("#email");
const password = document.querySelector("#password");

submitBtn.addEventListener("click", () => {
  if (name != null) {
    // sign up
    if (name.value.length < 3) {
      showAlert("Tên phải ít nhất 3 ký tự");
    } else if (!email.value.length) {
      showAlert("Vui lòng nhập Email của bạn");
    } else if (password.value.length < 6) {
      showAlert("Mật khẩu ít nhất 6 ký tự");
    } else {
      // submit form
      loader.style.display = "block";
      sendData("/signup", {
        name: name.value,
        email: email.value,
        password: password.value,
      });
    }
  } else {
    // login page
    if (!email.value || !password.value) {
      showAlert("Điền đầy đủ thông tin");
    } else {
      loader.style.display = "block";
      sendData("/login", {
        email: email.value,
        password: password.value,
      });
    }
  }
});

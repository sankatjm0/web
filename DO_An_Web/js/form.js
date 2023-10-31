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
      showAlert("name must be 3 letters long");
    } else if (!email.value.length) {
      showAlert("enter your email");
    } else if (password.value.length < 6) {
      showAlert("password should be 6 letters long");
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
      showAlert("fill all the inputs");
    }
    else{
      loader.style.display = "block";
      sendData("/login",{
        email: email.value,
        password: password.value,
      })
    }
  }
});


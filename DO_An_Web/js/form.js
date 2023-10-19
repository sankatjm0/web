const loader = document.querySelector(".loader");

//select input
const submitBtn = document.querySelector(".submit-btn");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

submitBtn.addEventListener("click", () => {
  if (name.value.length < 3) {
    showAlert("name must be 3 letters long");
  } else if (!email.value.length) {
    showAlert("enter your email");
  } else if (password.value.length < 6) {
    showAlert("password should be 6 letters long");
  } else {
    loader.style.display = "block";
  }
});

// alert funciont
const showAlert = (mgs) => {
  let alertBox = document.querySelector(".alert-box");
  let alertMgs = document.querySelector(".alert-mgs");
  alertMgs.innerHTML = mgs;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
};

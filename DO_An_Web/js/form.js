const loader = document.querySelector(".loader");

//select input
const submitBtn = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

submitBtn.addEventListener("click", () => {
  // if (nameInput.value.length < 3) {
  //   showAlert("name must be 3 letters long");
  // } else if (!email.value.length) {
  //   showAlert("enter your email");
  // } else if (password.value.length < 6) {
  //   showAlert("password should be 6 letters long");
  // } else {
  loader.style.display = "block";
  sendData("/signup", {
    name: nameInput.value,
    email: email.value,
    password: password.value,
  });
  // }
});

// send data funtion
const sendData = (path, data) => {
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      processData(response);
    });
};

const processData = (data) => {
  loader.style.display = null;
  if (data.alert) {
    showAlert(data.alert);
  }
};

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

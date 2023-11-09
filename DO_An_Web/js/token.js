const char =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?`~";

const generateToken = (key) => {
  let token = "";
  for (let i = 0; i < key.length; i += 2) {
    let index = char.indexOf(key[i]) || char.length / 2;
    let randomIndex = Math.floor(Math.random() * index);
    token += char[randomIndex] + char[index - randomIndex];
  }
  return token;
};

const compareToken = (token, key) => {
  let string = '';
  for (let i = 0; i < token.length; i += 2) {
    let index1 = char.indexOf(token[i]);
    let index2 = char.indexOf(token[i + 1]);
    string += char[index1 + index2];
  }
  return string === key;
};

// Common functions

// Send data function
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
  loader.style.display = "none";
  if (data.alert) {
    showAlert(data.alert);
  } else if (data.name) {
    // Create authToken
    data.authToken = generateToken(data.email);
    sessionStorage.user = JSON.stringify(data);
    location.replace("/");
  }
};

const showAlert = (mgs) => {
  let alertBox = document.querySelector(".alert-box");
  let alertMgs = document.querySelector(".alert-mgs");
  alertMgs.innerHTML = mgs;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 300);
};

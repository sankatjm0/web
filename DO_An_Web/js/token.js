const char =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?`~";

const generateToken = (key) => {
  let token = "";
  for (let i = 0; i < key.length; i += 2) {
    let index = char.indexOf(key[i]) || char.length / 2;
    let randomIndex = Math.floor(Math.random() * index);
    token += char[randomIndex] + char[index - randomIndex];
  }console.log(11111111111111111111);
  return token;
  
};

const compareToken = (token, key) => {
  let string = "";
  for (let i = 0; i < compareToken.length; i += 2) {
    let index1 = char.indexOf(compareToken[i]);
    let index2 = char.indexOf(compareToken[i + 1]);
    string += char[index1 + index2];
  }
  if (string === key) {
    console.log(11111111111111111111);
    return true;
  } else {
    return false;
  }
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
  } else if (data == true) {
    let user = JSON.parse(sessionStorage.user);
    user.seller = true;
    sessionStorage.user = JSON.stringify(user);
    location.reload();
  }
};
console.log(11111111111111111111);
const showAlert = (mgs) => {
  let alertBox = document.querySelector(".alert-box");
  let alertMgs = document.querySelector(".alert-mgs");
  alertMgs.innerHTML = mgs;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 300);
};

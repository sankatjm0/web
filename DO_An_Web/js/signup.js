// const username = document.getElementById("name")
// const password = document.getElementById("password")
// const email = getElementById("email")
// const submit = document.querySelector(".submit-btn")
// const accounts = {username: "", password: "", phone: "", name:"".}

// submit.addEventListener("click"), () => {
//     // let user = localStorage.getItem(accounts)
//     accounts = JSON.parse()
//     while (username != null) {
//         // sign up
//         if (username.value.length < 3) {
//           showAlert("Tên phải ít nhất 3 ký tự");
//         } else if (!email.value.length) {
//           showAlert("Vui lòng nhập Email của bạn");
//         } else if (password.value.length < 6) {
//           showAlert("Mật khẩu ít nhất 6 ký tự");
//         } else {
//           // submit form
//           accounts.username = username.value
//           accounts.password = password.value
//           localStorage.setItem("accounts", JSON.stringify(accounts))
//           location.replace("./index-user.html")
//         }
//       }
    
// }
// show a message with a type of the input
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

// function validateEmail(input, requiredMsg, invalidMsg) {
// 	// check if the value is not empty
// 	if (!hasValue(input, requiredMsg)) {
// 		return false;
// 	}
// 	// validate email format
// 	const emailRegex =
// 		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 	const email = input.value.trim();
// 	if (!emailRegex.test(email)) {
// 		return showError(input, invalidMsg);
// 	}
// 	return true;
// }

const signup = document.querySelector(".signup");
const userArr = [];
const NAME_REQUIRED = "Vui long nhap ten";
const PASSWORD_REQUIRED = "Vui long nhap mat khau";

signup.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
  function checkUser(event) {
	
    let userArr = JSON.parse(localStorage.getItem('user')) || [];
    for (let i=0; i<localStorage.length; i++) {
		

      if (userArr[i].username === signup.elements["username"].value) {
		showError(signup.elements["username"], "Ten dang nhap da ton tai.");
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
			var user = JSON.parse(localStorage.getItem('user')) || [];
			user.push({username: username, password: password});
			localStorage.setItem("user", JSON.stringify(user));
			sessionStorage.setItem("current", username);
			location.replace("./index-user.html?");
		}
});

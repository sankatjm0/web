const placeOrderBtn = document.querySelector(".place-order-btn");
placeOrderBtn.addEventListener("click", () => {
  let address = getAddress();
  if (address) {
    fetch("/order", {
      method: "post",
      headers: new Headers({ "Content-Type": "app;ication/json" }),
      body: JSON.stringify({
        order:JSON.parse(localStorage.cart),
        email: JSON.parse(sessionStorage.user).email,
        add: address,
      }) 
    }).then(res=>res.json())
    .then(data=>{
        
    })
  }
});

const getAddress = () => {
  let address = document.querySelector("#address").value;
  let street = document.querySelector("#street").value;
  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;
  let pincode = document.querySelector("#pincode").value;
  let landmark = document.querySelector("#landmark").value;

  if (
    !address.lenght ||
    !street.lenght ||
    !city.lenght ||
    !state.lenght ||
    !pincode.lenght ||
    !landmark.lenght
  ) {
    return showAlert("fill all the inputs first");
  } else {
    return { address, street, city, state, landmark, pincode };
  }
};

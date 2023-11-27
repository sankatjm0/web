const createSmallCards = (data) => {
  return `
    <div class="sm-product">
      <div class="sm-img-container">
        <img src="${data.img}" class="sm-product-img" alt="${data.name}">
      </div>
      <div class="sm-details">
        <div class="sm-text">
          <p class="sm-product-name">${data.name}</p>
        </div>
        <p class="price">$${data.price}</p>
        <p class="time">Time: ${data.time}</p>
        <p class="size">Size: ${data.size}</p>
      </div>
      <div class="item-counter">
        <button onclick="decreaseQuantity(${data.ID}, '${data.size}')" class="counter-btn decrement" data-id="${data.ID}">-</button>  
        <p class="item-count" id="quantity-${data.ID}-${data.size}">${data.quantity}</p>
        <button onclick="increaseQuantity(${data.ID}, '${data.size}')" class="counter-btn increment" data-id="${data.ID}">+</button>
      </div>
      <div class="item-status">
        <p class="status">Trạng Thái: ${data.status}</p>
      </div>
      <button onclick="removeProduct(${data.ID}, '${data.size}')" class="sm-delete-btn" data-id="${data.ID}">
        <img src="img/close.png" alt="Delete">
      </button>
    </div>`;
};

let totalBill = 0;
let cartData = [];
const setProducts = (name) => {
  if (current != null) {
    cartData = current.cart;
  }
  const element = document.querySelector(`.${name}`);
  element.innerHTML = "";

  if (cartData.length === 0) {
    element.innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;
  } else {
    for (let i = 0; i < cartData.length; i++) {
      element.innerHTML += createSmallCards(cartData[i]);
      if (name === "cart") {
        totalBill += Number(cartData[i].price * cartData[i].quantity);
      }
    }
    updateBill();
  }
};

const updateBill = () => {
  const billElement = document.querySelector(".bill");
  billElement.textContent = `$${totalBill.toFixed(0)}`;
};

const increaseQuantity = (ID, size) => {
  const productIndex = cartData.findIndex((item) => item.ID === ID && item.size === size);
  if (productIndex !== -1) {
    const product = cartData[productIndex];
    product.quantity += 1;
    totalBill += Number(product.price);
    document.getElementById(`quantity-${ID}-${size}`).textContent = product.quantity;
    updateBill();
    saveDataToLocal();
  }
};

const decreaseQuantity = (ID, size) => {
  const productIndex = cartData.findIndex((item) => item.ID === ID && item.size === size);
  if (productIndex !== -1) {
    const product = cartData[productIndex];
    if (product.quantity > 1) {
      product.quantity -= 1;
      totalBill -= Number(product.price);
      document.getElementById(`quantity-${ID}-${size}`).textContent = product.quantity;
      updateBill();
      saveDataToLocal();
    }
  }
};

const removeProduct = (ID, size) => {
  const productIndex = cartData.findIndex((item) => item.ID === ID && item.size === size);
  if (productIndex !== -1) {
    const product = cartData[productIndex];
    totalBill -= Number(product.price * product.quantity);
    cartData.splice(productIndex, 1);
    updateBill();
    saveDataToLocal();
    setProducts("cart");
  }
};

const saveDataToLocal = () => {
  for (let i = 0; i < user.length; i++) {
    if (user[i].username == current.username) {
      user[i].cart = cartData;
    }
    current.cart = cartData;
    sessionStorage.setItem("current", JSON.stringify(current));
    localStorage.setItem("user", JSON.stringify(user));
  }
};

setProducts("cart");

document.getElementById("nike").addEventListener("click", function () {
  window.location.href = "index-user.html?nav=nike";
});

document.getElementById("adidas").addEventListener("click", function () {
  window.location.href = "index-user.html?nav=adidas";
});

document.getElementById("gucci").addEventListener("click", function () {
  window.location.href = "index-user.html?nav=gucci";
});

document.getElementById("chanel").addEventListener("click", function () {
  window.location.href = "index-user.html?nav=chanel";
});

document.getElementById("louisvuitton").addEventListener("click", function () {
  window.location.href = "index-user.html?nav=louisvuitton";
});

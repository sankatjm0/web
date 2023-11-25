var data = JSON.parse(localStorage.getItem("productInCart")) || [];

const createSmallCards = (data) => {
  return `
    <div class="sm-product">
      <img src="${data.img}" class="sm-product-img">
      <div class="sm-text">
        <p class="sm-product-name">${data.name}</p>
      </div>
      <p class="price">$${data.price}</p>
      <div class="item-counter">
        <button onclick="decrease(${data.ID})" class="counter-btn decrement" data-id="${data.ID}">-</button>  
        <p class="item-count" id="quantity-${data.ID}">${data.quantity}</p>
        <button onclick="increase(${data.ID})" class="counter-btn increment" data-id="${data.ID}">+</button>
      </div>
      
      <button onclick="removeProduct(${data.ID})" class="sm-delete-btn" data-id="${data.ID}">
        <img src="img/close.png">
      </button>
    </div>`;
};

let totalBill = 0;

const setProducts = (name) => {
  const element = document.querySelector(`.${name}`);
    
  // Xóa các phần tử con hiện có trong phần tử cha
  element.innerHTML = '';

  if (data.length === 0) {
    element.innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;
  } else {
    for (let i = 0; i < data.length; i++) {
      element.innerHTML += createSmallCards(data[i]);
      if (name === "cart") {
        totalBill += Number(data[i].price * data[i].quantity);
      }
    }
    updateBill();
  }
  //setupEvents(name); // Bỏ chú thích dòng này vì không thấy định nghĩa hàm setupEvents()
};

const updateBill = () => {
  const billElement = document.querySelector(".bill");
  billElement.textContent = `$${totalBill.toFixed(0)}`;
};

const increase = (productId) => {
  const product = data.find((item) => item.ID === productId);
  if (product) {
    product.quantity += 1;
    totalBill += Number(product.price);
    document.getElementById(`quantity-${productId}`).textContent = product.quantity;
    updateBill();
    saveDataToLocal();
  }
};

const decrease = (productId) => {
  const product = data.find((item) => item.ID === productId);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    totalBill -= Number(product.price);
    document.getElementById(`quantity-${productId}`).textContent = product.quantity;
    updateBill();
    saveDataToLocal();
  }
};

const removeProduct = (productId) => {
  const productIndex = data.findIndex((item) => item.ID === productId);
  if (productIndex !== -1) {
    const product = data[productIndex];
    totalBill -= Number(product.price * product.quantity);
    data.splice(productIndex, 1);
    updateBill();
    saveDataToLocal();
    setProducts("cart"); // Cập nhật lại danh sách sản phẩm trong giỏ hàng sau khi xóa
  }
};

const saveDataToLocal = () => {
  localStorage.setItem("productInCart", JSON.stringify(data));
};

setProducts("cart");

document.getElementById("nike").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=nike";
});

document.getElementById("adidas").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=adidas";
});

document.getElementById("gucci").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=gucci";
});

document.getElementById("chanel").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=chanel";
});

document.getElementById("louisvuitton").addEventListener("click", function() {
  window.location.href = "index-user.html?nav=louisvuitton";
});

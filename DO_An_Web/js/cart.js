document.querySelector("#show-cart").addEventListener("click", function() {
  if (document.querySelector(".cart-section") != null) {
    event.preventDefault();
  } else {
  document.querySelector("#content").innerHTML = `

  <div id="add-checkout"></div>


  <div class="cart-section">
      <div class="product-list">
          <p class="section-heading">Giỏ hàng</p>
          <div class="cart">
          </div>
          <p class="section-heading">Lịch sử mua hàng</p>
          <div class="order-history">
          </div>
      </div>
      <div class="checkout-section">
          <div class="checkout-box">
              <p class="text">Tổng hóa đơn của bạn:</p>
              <h1 class="bill"></h1>
              <div id="check">
                  <button class="checkout-btn">Mua hàng</button>
              </div>
          </div>
      </div>
  </div>



`





setProducts("cart");
setOrder("order-history");
const order = JSON.parse(localStorage.getItem("order")) || [];
const user = JSON.parse(localStorage.getItem("user")) || [];

function checklog() {
  if (current == null) {
    alert("Vui lòng đăng nhập để mua hàng.");
  } else {
    cart = current.cart;
    orders = current.order || [];
    let acc = user.find((acc) => acc.username == current.username);

    if (document.querySelector("#add-checkout") != null) {
      document.querySelector("#add-checkout").innerHTML = `<div class="form">
  <h1 class="heading">Đặt hàng</h1>
  <p class="text" style="font-size:30px">Thông tin nhận hàng</p>
  <input style="padding: 3px;
    margin: 3px;
    border: 1px solid black;
    background: #f5f5f5;
    height: 25px;
    width: 100%;
    border-radius: 5px; " type="text" id="name" value="${acc.name}" placeholder="Tên người nhận hàng">
  <input style="padding: 3px;
    margin: 3px;
    border: 1px solid black;
    background: #f5f5f5;
    height: 25px;
    width: 100%;
    border-radius: 5px;" type="text" id="address" value="${acc.address}" placeholder="Địa chỉ">
  <input style="padding: 3px;
    margin: 3px;
    border: 1px solid black;
    background: #f5f5f5;
    height: 25px;
    width: 100%;
    border-radius: 5px;" type="text" id="phone" value="${acc.phone}" placeholder="Số điện thoại">
    

  </div>`;
      document.querySelector(
        "#check"
      ).innerHTML = `<button class="place-order-btn">Xác nhận</button>
  `;
      var address = document.getElementById("address");
      var name = document.getElementById("name");
      var phone = document.getElementById("phone");
      var cost = document.querySelector(".bill").textContent;

      document
        .querySelector(".place-order-btn")
        .addEventListener("click", function () {
          if (validateForm()) {
            var cost = document.querySelector(".bill");

            alert("Đặt hàng thành công!");
            let acc = user.find((acc) => acc.username == current.username);
            const tk = new Date();
      let day = tk.getDate();
      let month = tk.getMonth() + 1;
      let year = tk.getFullYear();
      let tkdate = `${day}-${month}-${year}`;
            order.push({
              index: order.length,
              cost: cost.textContent,
              username: current.username,
              address: address.value,
              name: name.value,
              phone: phone.value,
              products: current.cart,
              status: 1,
              date: tkdate,
              time: getCurrentTime(),
            });
            localStorage.setItem("order", JSON.stringify(order));
            current.cart = [];
            var bills = [];
            for (let a = 0; a < order.length; a++) {
              if (order[a].username == current.username) {
                bills.push(order[a]);
              }
            }
            document.querySelector("#add-checkout").innerHTML = ``;
            document.querySelector(".bill").innerHTML = ``;
            document.querySelector(
              `.cart`
            ).innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;
            acc.cart = [];
            current.order = bills;
            acc.order = bills;
            localStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("current", JSON.stringify(current));
            location.reload();
          } else {
            alert("Vui lòng điền đủ thông tin!");
          }
        });
    }
    function validateForm() {
      if (
        address.value.trim() === "" ||
        name.value.trim() === "" ||
        phone.value.trim() === ""
      ) {
        return false;
      }
      return true;
    }
  }
}
document.querySelector(".checkout-btn").addEventListener("click", function () {
  checklog();
});

function getCurrentTime() {
  const currentTime = new Date();
  return currentTime.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
  }
})
// document.getElementById("nike").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=nike";
// });

// document.getElementById("adidas").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=adidas";
// });

// document.getElementById("gucci").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=gucci";
// });

// document.getElementById("chanel").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=chanel";
// });

// document.getElementById("louisvuitton").addEventListener("click", function () {
//   window.location.href = "index-user.html?nav=louisvuitton";
// });

function statusDisplay(num) {
  let status = "";
  switch(num) {
    case 1: status = "Chưa xác nhận"
    break;
    case 2: status = "Đã xác nhận"
    break;
    case 3: status = "Đang giao hàng"
    break;
    case 4: status = "Hoàn thành"
    break;
    case 5: status = "Đã hủy"
  }
  return status;
}
const increaseQuantity = (ID, size) => {
  const productIndex = cartData.findIndex(
    (item) => item.ID === ID && item.size === size
  );
  if (productIndex !== -1) {
    const product = cartData[productIndex];
    product.quantity += 1;
    totalBill += Number(product.price);
    document.getElementById(`quantity-${ID}-${size}`).textContent =
      product.quantity;
    updateBill();
    saveDataToLocal();
  }
};


const decreaseQuantity = (ID, size) => {
  const productIndex = cartData.findIndex(
    (item) => item.ID === ID && item.size === size
  );
  if (productIndex !== -1) {
    const product = cartData[productIndex];
    if (product.quantity > 1) {
      product.quantity -= 1;
      totalBill -= Number(product.price);
      document.getElementById(`quantity-${ID}-${size}`).textContent =
        product.quantity;
      updateBill();
      saveDataToLocal();
    }
  }
};

const removeProduct = (ID, size) => {
  const productIndex = cartData.findIndex(
    (item) => item.ID === ID && item.size === size
  );
  if (productIndex !== -1) {
    const product = cartData[productIndex];
    totalBill -= Number(product.price * product.quantity);
    cartData.splice(productIndex, 1);
    updateBill();
    saveDataToLocal();
    setProducts("cart");
  }
};
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
        <p class="size">Size: ${data.size}</p>
      </div>
      <div class="item-counter">
        <button onclick="decreaseQuantity(${data.ID}, '${data.size}')" class="counter-btn decrement" data-id="${data.ID}">-</button>  
        <p class="item-count" id="quantity-${data.ID}-${data.size}">${data.quantity}</p>
        <button onclick="increaseQuantity(${data.ID}, '${data.size}')" class="counter-btn increment" data-id="${data.ID}">+</button>
      </div>
      <button onclick="removeProduct(${data.ID}, '${data.size}')" class="sm-delete-btn" data-id="${data.ID}">
        <img src="img/close.png" alt="Delete">
      </button>
    </div>`;
};
const createSmallOrder = (data) => {
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
        <p class="size">Size: ${data.size}</p>
      </div>
      <div class="item-counter">
        <p class="item-count" id="quantity-${data.ID}-${data.size}">${data.quantity}</p>     
         </div>
        
    </div>
  
    `;
};


let totalBill = 0;
let cartData = [];
const setProducts = (name) => {
  if (current != null) {
    cartData = current.cart;
  
  const element = document.querySelector(`.${name}`);
  element.innerHTML = "";

  if (cartData.length === 0 || current == null) {
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
} else {document.querySelector(`.${name}`).innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;}
};
 

var orderArr = JSON.parse(localStorage.getItem("order")) || [];
const setOrder = (name) => {
  if (current != null ) {const iD = current.username;
  const element = document.querySelector(`.${name}`);
  element.innerHTML = "";

  if (current.order == 0 ) {
    element.innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;
  } else {
    for (let i = 0; i < orderArr.length; i++) {
      if (orderArr[i].username === iD && orderArr[i].cost !== ""&&orderArr[i].products.length!==0) {
        element.innerHTML += `<h2>Đơn hàng HD${i+1}</h2></br>`;
        for (let j = 0; j < orderArr[i].products.length; j++) {
          element.innerHTML += createSmallOrder(orderArr[i].products[j]);
        }
        element.innerHTML += `<h3>
        Thành tiền: ${orderArr[i].cost}</h3>
        <h3>
        Trạng thái: ${statusDisplay(orderArr[i].status)}</h3></br>`;
      }
    }
  }
} else {document.querySelector(`.${name}`).innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;}

};


const updateBill = () => {
  const billElement = document.querySelector(".bill");
  billElement.textContent = `${totalBill.toFixed(0)}VND`;
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
let checkdBtn = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchId = urlParams.get('ID');

// window.onload = function () {
  products = JSON.parse(localStorage.getItem("product")) || [];
// }
// size do
// window.addEventListener('load', function() {
  if (products.length > 1) {

    searchProduct();

    sizeBtns = document.querySelectorAll(".size-radio-btn");
    sizeBtns.forEach((item, i) => {
      item.addEventListener("click", () => {
        sizeBtns[checkdBtn].classList.remove("check");
        item.classList.add("check");
        checkdBtn = i;
      });
    });
  }
// });




function searchProduct() {
  if (products !== undefined) {
      products.forEach(item => {
          if (item.ID.toString()=== searchId) {
              addProduct(item);
          }
      });
  }
}

//


function addProduct(item){
  const addproduct = document.querySelector(".product-details");
  addproduct.innerHTML=`
  <div class="image-slider">
    <img src="${item.img}" alt="">
  </div>

  <div class="details">
    <h2 class="product-brand">${item.brand}</h2>
    <p class="product-short-des">${item.name}</p>
    <span class="product-price">${item.price}</span>

    <p class="product-sub-headding">Chọn kích thước</p>

    <input type="radio" name="size" value="s" checked hidden id="s-size">
    <label for="s-size" class="size-radio-btn check">s</label>
    <input type="radio" name="size" value="m" hidden id="m-size">
    <label for="s-size" class="size-radio-btn">m</label>
    <input type="radio" name="size" value="l" hidden id="l-size">
    <label for="s-size" class="size-radio-btn">l</label>
    <input type="radio" name="size" value="xl" hidden id="xl-size">
    <label for="s-size" class="size-radio-btn">xl</label>
    <input type="radio" name="size" value="xxl" hidden id="xxl-size">
    <label for="s-size" class="size-radio-btn">xxl</label>
    <br>
    <br>
    <div class="qlt">
        <button onclick="decreaseQuantity(${item.ID})">-</button>
        <span id="quantity-${item.ID}">1</span>
        <button onclick="increaseQuantity(${item.ID})">+</button>
    </div>
    <br>

    <div class="btn-group">
    <br>
    <button onclick='addToCart(${item.ID})' class="btn">Thêm vào giỏ hàng</button>
</div>
  </div>
  </div>
  </div>
  
  `;
}
// Khai báo mảng productInCart để lưu trữ sản phẩm trong giỏ hàng
// var user = JSON.parse(localStorage.getItem('user'));
// current = JSON.parse(sessionStorage.getItem('current')) || [];

// Hàm thêm sản phẩm vào giỏ hàng
// function addToCart(ID) {
//   let checkProduct = productInCart.some(value => value.ID === ID);

//   if (!checkProduct) {
//       let product = products.find(value => value.ID === ID);
//       productInCart.unshift({
//           ...product,
//           quantity: 1,
//           time: getCurrentTime()
//       });
//   } else {
//       let product = productInCart.find(value => value.ID === ID);
//       let getIndex = productInCart.findIndex(value => value.ID === ID);
//       productInCart[getIndex] = {
//           ...product,
//           quantity: ++product.quantity,
//           time: getCurrentTime()
//       };
//   }

//   // Lưu mảng productInCart vào localStorage sau khi thêm sản phẩm
//   localStorage.setItem('productInCart', JSON.stringify(productInCart));
// }

// Hàm lấy thời gian hiện tại
function getCurrentTime() {
  const currentTime = new Date();
  return currentTime.toLocaleString();
}


//Cart pagea
// function renderProductsToTable () {
//   let data = ``;
//   productInCart.map((value, index) => {
//     data += `
//       <tr>
//         <td>${value.name}</td>
//         <td><img width='100' src='${value.image}' alt=''></td>
//         <td>${value.price}</td>
//         <td>
//           <button onclick='plusQuantity(${index})' class='btn btn-secondary'>+</button>
//           <span class='mx-2'>${value.quantity}</span>
//           <button onclick='minusQuantity(${index}, ${value.quantity})' class='btn btn-secondary'>-</button>
//         </td>
//         <td>${(value.quantity * value.price.replace(/,/g, '')).toLocaleString()}</td>
//         <td><button onclick='deleteProductInCart(${index})' class='btn btn-danger'>Delete</button></td>
//       </tr>
//     `;
//   });
//   document.getElementById('products-cart').innerHTML = data;
// }

function increaseQuantity(ID) {
  const quantityElement = document.getElementById(`quantity-${ID}`);
  let quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;
}

function decreaseQuantity(ID) {
  const quantityElement = document.getElementById(`quantity-${ID}`);
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity -= 1;
    quantityElement.textContent = quantity;
  }
}

cart = [];

function checklog() {
  if (current == null) {
    alert("Vui lòng đăng nhập để mua hàng.");
  } else cart = current.cart;
}

function addToCart(ID) {
  checklog();
  let checkProduct = cart.some(value => value.ID === ID);
  const selectedSize = document.querySelector('.size-radio-btn.check').innerText;
  if (!checkProduct) {
      let product = products.find(value => value.ID === ID);
      cart.push({
          ...product,
          quantity: 1,
          size: selectedSize
      });
  } else {
      let product = cart.find(value => value.ID === ID);
      let getIndex = cart.findIndex(value => value.ID === ID);
      cart[getIndex] = {
          ...product,
          quantity: ++product.quantity,
          size: selectedSize
      };
  }

  // Lưu mảng productInCart vào localStorage sau khi thêm sản phẩm
  for (let i=0; i<user.length; i++) {
    if (user[i].username == current.username) {
      user[i].cart = cart;
    }
  current.cart = cart;
  sessionStorage.setItem('current', JSON.stringify(current));
  localStorage.setItem('user', JSON.stringify(user));
}
}

//function deleteProductInCart (index) {
//   productInCart.splice(index, 1);
//   saveToLocalStorage();
//   renderProductsToTable();
//   totalMoney()
// }

// //function totalMoney () {
//   if (productInCart.length > 0) {
//     let total = 0;
//     for (let i = 0; i < productInCart.length; i++) {
//       total += productInCart[i].quantity * productInCart[i].price.replace(/,/g, '');
//     }
//     document.getElementById("total-money").innerHTML = total.toLocaleString()
//   }
// }

// function cartLoadPage () {
//   renderProductsToTable();
//   totalMoney();
// }






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


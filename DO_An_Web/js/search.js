let shop_listIteam = document.querySelector('.pro-container');
let filters = document.querySelectorAll('.shop-filter-group-list');
let filtersnew = document.querySelector('.shop-filter-group--new');
let number1 = document.getElementById('number1');
let number2 = document.getElementById('number2');
let primary = document.getElementById('primary');
let reset = document.getElementById('reset');


const search = document.getElementById('search-box');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchValue = urlParams.get('search');
      
window.onload = function () {
    products = JSON.parse(localStorage.getItem("product")) || [];
    document.querySelector(".search-box").value = "";
    Findname();
    redirectToProductDetails();
}

function redirectToProductDetails() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            
            document.querySelector(
              "#content"
            ).innerHTML = `<section class="product-details">
         
    </section>`;
          // console.log("Clicked product with ID:", productId);
          // console.log("Current URL:", window.location.href);
          // window.location.href =
          //   "index-user.html?ID=" + encodeURIComponent(productId);
          let checkdBtn = 0;
          // const queryString = window.location.search;
          // const urlParams = new URLSearchParams(queryString);
          // const searchId = urlParams.get('ID');
          const productId = this.getAttribute("data-id");
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
    function searchProduct() {
        if (products !== undefined) {
          products.forEach((item) => {
            if (item.ID == productId) {
              addProduct(item);
            }
          });
        }
      }
    
      function addProduct(item) {
        const addproduct = document.querySelector(".product-details");
        addproduct.innerHTML = `
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
    <label for="m-size" class="size-radio-btn">m</label>
    <input type="radio" name="size" value="l" hidden id="l-size">
    <label for="l-size" class="size-radio-btn">l</label>
    <input type="radio" name="size" value="xl" hidden id="xl-size">
    <label for="xl-size" class="size-radio-btn">xl</label>
    <input type="radio" name="size" value="xxl" hidden id="xxl-size">
    <label for="xxl-size" class="size-radio-btn">xxl</label>
    <br>
    <br>
    <div class="qlt">
      <button onclick="decreaseQuantity2(${item.ID})">-</button>
      <span id="quantity-${item.ID}" class="quantity-display">1</span>
      <button onclick="increaseQuantity2(${item.ID})">+</button>
    </div>
    <br>
    
    <div class="btn-group">
    <br>
    <button onclick='addToCart(${item.ID})' class="btn">Thêm vào giỏ hàng</button>
    </div>
    </div>
    </div>
    `;
      }
}})})}


  // function getCurrentTime() {
  //   const currentTime = new Date();
  //   return currentTime.toLocaleString();
  // }


let find = {};
function Findname(){
    // search.value=searchValue;
    document.querySelector("#ten-prod").innerHTML = `${searchValue}`
    foundItems = [];
    if(products !== undefined)
    products.forEach(item => {
        if(item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.brand.toLowerCase().includes(searchValue.toLowerCase())){
            foundItems.push(item);
        }
    });
    if(foundItems.length===0){
        khongtimthaysanpham();
    }
    phantrang(foundItems);

    show_filter(foundItems).then(() => {
        let Listener_checkbox = document.querySelectorAll('.shop-filter-group-item-check,.shop-filter-group-item-check-price');
        Listener_checkbox.forEach(checkbox=>{
            checkbox.addEventListener('change', () => {
                applyFilters(foundItems);
                phantrang(find);
                
            });
        });
        primary.onclick = function() {
            applyFilters(foundItems);
            phantrang(find);
  
        }
        reset.onclick = function() {
            phantrang(foundItems);
            
            let Listener_checkbox = document.querySelectorAll('.shop-filter-group-item-check,.shop-filter-group-item-check-price');
            Listener_checkbox.forEach(function(Listener_checkbox) {
                Listener_checkbox.checked = false;
            });
        

            let radioButtons = document.querySelectorAll('.shop-filter-group-item-check-price');
            radioButtons.forEach(function(radioButton) {
                radioButton.checked = false;
            });
        
            let numberInputs = document.querySelectorAll('.shop-filter-group-filter-input');
            numberInputs.forEach(function(input) {
                input.value = '';
            });
        }

    });
}

filtersnew.onclick = function() {

    
    let shop_listIteam = document.querySelector('.search-results');
    shop_listIteam.innerHTML=``;
}

function phantrang(list){
    let productElement = document.getElementById("product1");
    if (productElement.children.length > 0) {
        showProduct(list,1)
    }


    lengthpage=16;
    
    if(list.length !=0){
        page = Math.ceil(list.length/lengthpage);
        var paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";


            
        for (var i = 1; i <= page; i++) {
            var pageLink = document.createElement("a");
            pageLink.href = "javascript:void(0);";
            pageLink.innerText = i;
            pageLink.dataset.page = i;
            pageLink.addEventListener("click", function() {
                var page = parseInt(this.dataset.page);
                showProduct(list,page);
            });
            if(list.length/lengthpage>1)
            paginationContainer.appendChild(pageLink);
        }

    }
    redirectToProductDetails();

}
function showProduct(list,page){

var startIndex = (page - 1) * 16+1;
let endIndex = startIndex + 15;

if(endIndex > list.length){
    endIndex=list.length;
}
    shop_listIteam.innerHTML = '';
    if(list.length !=0){
        for (let i = startIndex; i <= endIndex; i++) {
            item = list[i - 1];
            let NewItem = document.createElement('div');
            NewItem.className = "product-card";
            NewItem.setAttribute('data-id', item.ID);
            shop_listIteam.append(NewItem);

                let NewItem_product_image = document.createElement('div');
                NewItem_product_image.className = "product-image";
                NewItem.append(NewItem_product_image);

                    let Newitem__img = document.createElement('img');
                    Newitem__img.className = "product-thumb";
                    Newitem__img.src = item.img;
                    Newitem__img.alt=""
                    NewItem_product_image.prepend(Newitem__img);

                    let product_info = document.createElement('div');
                    product_info.className = "product-info";
                    NewItem.append(product_info);

                    let product_h2 = document.createElement('h2');
                    product_h2.className = "product-brand";
                    product_h2.innerHTML=item.brand;
                    product_info.append(product_h2);

                    let product_p = document.createElement('p');
                    product_p.className = "product-short-des";
                    product_p.innerHTML=item.name;
                    product_info.append(product_p);

                    let product_span_1 = document.createElement('span');
                    product_span_1.className = "price";
                    product_span_1.innerHTML=item.price+'đ';
                    product_info.append(product_span_1);
      
        }
    }
}
function createFilterItem(value,shop_filter) {
    let New_Item = document.createElement('div');
    New_Item.className = "shop-filter-group-item";
    if(shop_filter!=null)
    shop_filter.append(New_Item);

    let Newitem__label = document.createElement('label');
    Newitem__label.innerHTML = value;
    New_Item.append(Newitem__label);

    let Newproduct_input = document.createElement('input');
    Newproduct_input.className = "shop-filter-group-item-check";
    Newproduct_input.type = "checkbox";
    Newproduct_input.value =  value;
    Newitem__label.prepend(Newproduct_input);
}
function show_filter(list) {
    filters.forEach(filter => {
        filter.innerHTML = '';
    });

    if (list.length != 0) {
        let traDemark = "";
        let shop_filter_traDemark = document.querySelector('.shop-filter-group-list.traDemark');

        list.forEach(item => {
            if (!traDemark.includes(item.brand)) {
                traDemark = traDemark + item.brand;
                createFilterItem(item.brand,shop_filter_traDemark);
            }
        });
    }
    return Promise.resolve();
}

function checkthuonghieu(foundItems){
    let atLeastOneChecked = false;
    let thuonghieuchecked= [];
    let thuonghieucheckbox = document.querySelectorAll('.shop-filter-group-item-check');
    
    for (let i = 0; i < thuonghieucheckbox.length; i++) {
        if (thuonghieucheckbox[i].checked) {
            atLeastOneChecked = true;
            thuonghieuchecked.push(thuonghieucheckbox[i]);
        }
    }
    let locsanpham= [];
    if (atLeastOneChecked) {
        foundItems.forEach(check=>{
            for (let i = 0; i < thuonghieuchecked.length; i++) {
                if(check.brand==thuonghieuchecked[i].value){
                    locsanpham.push(check);
                }
            }
        });
        
        if(locsanpham.length===0){
            return 0;
        }
        else{
            foundItems.length = 0;
            locsanpham.forEach(item => {
                foundItems.push(item);
            });
        
        }
    }

    return 1;
}
function checkgia(foundItems){
    let atLeastOneChecked = false;
    let giachecked;
    let giacheckcheckbox = document.querySelectorAll('.shop-filter-group-item-check-price');

    for (let i = 0; i < giacheckcheckbox.length; i++) {
        if (giacheckcheckbox[i].checked) {
            atLeastOneChecked = true;
            giachecked=giacheckcheckbox[i];
            break;
        }
    }

    if (atLeastOneChecked) {
        if("ThapDenCao"===giachecked.value){
            foundItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
        if("CaoDenThap"===giachecked.value){
            foundItems.sort((b, a) => parseFloat(a.price) - parseFloat(b.price));
        }
    }
}
function checkkhoanggia(foundItems){
    let giachecked= [];


    if(number1.value === "" && number2.value === ""){
        return 1;
    }
    foundItems.forEach(check=>{
        if(parseFloat(check.price)>=parseFloat(number1.value) && parseFloat(check.price)<=parseFloat(number2.value)){
            giachecked.push(check);
        }
    });
    if(giachecked.length===0){
        return 0;
    }
    else{
        foundItems.length = 0;
        giachecked.forEach(item => {
            foundItems.push(item);
        });
    }
    return 1;
}
function khongtimthaysanpham(){
    let search = document.querySelector('.section-p1');
    search.innerHTML=`<div>Không tìm thấy kết quả nào</div>`;
}
function applyFilters(copyfoundItems){

    find = [...copyfoundItems];

    if(checkthuonghieu(find)===0){
        khongtimthaysanpham();
    }
    if(checkkhoanggia(find)===0){
        khongtimthaysanpham();
    }
    checkgia(find);

    // showProduct(find);
}

// document.getElementById("nike").addEventListener("click", function() {
//     window.location.href = "index-user.html?nav=nike";
// });

// document.getElementById("adidas").addEventListener("click", function() {
//     window.location.href = "index-user.html?nav=adidas";
// });

// document.getElementById("gucci").addEventListener("click", function() {
//     window.location.href = "index-user.html?nav=gucci";
// });

// document.getElementById("chanel").addEventListener("click", function() {
//     window.location.href = "index-user.html?nav=chanel";
// });

// document.getElementById("louisvuitton").addEventListener("click", function() {
//     window.location.href = "index-user.html?nav=louisvuitton";
// });


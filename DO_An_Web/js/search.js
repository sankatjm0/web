let shop_listIteam = document.querySelector('.pro-container');
let filters = document.querySelectorAll('.shop-filter-group-list');
let filtersnew = document.querySelector('.shop-filter-group--new');

const search = document.getElementById('search-box');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchValue = urlParams.get('search');
      
window.onload = function () {
    products = JSON.parse(localStorage.getItem("product")) || [];
    Findname();
    redirectToProductDetails();
}

function redirectToProductDetails() {
    document.querySelectorAll('.pro').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            window.location.href = 'product.html?ID=' + encodeURIComponent(productId);
        });
    });
}
function Findname(){
    search.value=searchValue;

    foundItems = [];
    if(products !== undefined)
    products.forEach(item => {
        if(item.name.includes(searchValue)){
            foundItems.push(item);
        }
    });
    showProduct(foundItems);
    show_filter(foundItems).then(() => {
        let primary = document.getElementById('primary');
        let Listener_checkbox = document.querySelectorAll('.shop-filter-group-item-check,.shop-filter-group-item-check-price');
        Listener_checkbox.forEach(checkbox=>{
            checkbox.addEventListener('change', () => {
                applyFilters(foundItems);
            });        
        });
        primary.onclick = function() {
            applyFilters(foundItems);
        }
    });
}
filtersnew.onclick = function() {
    let shop_checkbox = document.querySelectorAll('.shop-filter-group-item-check');
    shop_checkbox.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.checked=false;
        }
    });
    number1.value=null;
    number2.value=null;
    showProduct(foundItems);
}

function showProduct(list){

    shop_listIteam.innerHTML = '';
    if(list.length !=0){
        list.forEach(product => {
            let productElement = document.createElement("div");
            productElement.className = "pro";
            productElement.setAttribute('data-id', product.ID);
            shop_listIteam.appendChild(productElement);

            // Thêm hình ảnh sản phẩm
            let imgElement = document.createElement("img");
            imgElement.src = product.img;
            productElement.appendChild(imgElement);
      
            // Thêm thông tin sản phẩm
            let desElement = document.createElement("div");
            desElement.className = "des";
      
            let brandElement = document.createElement("span");
            brandElement.innerText = product.brand;
            desElement.appendChild(brandElement);
      
            let nameElement = document.createElement("h5");
            nameElement.innerText = product.name;
            desElement.appendChild(nameElement);
            
            let priceElement = document.createElement("h4");
            priceElement.innerText = product.price;
            desElement.appendChild(priceElement);
      
            productElement.appendChild(desElement);
      
            // Thêm nút mua hàng
            let cartLink = document.createElement("a");
            cartLink.href = ""; // Đặt đường dẫn tới trang mua hàng tại đây
            let cartIcon = document.createElement("i");
            cartIcon.className = "fal fa-shopping-cart cart";
            cartLink.appendChild(cartIcon);
            productElement.appendChild(cartLink);
      
        });
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
    }
    if(locsanpham.length===0){
        return 0;
    }
    else{
        foundItems.length = 0;
        locsanpham.forEach(item => {
            foundItems.push(item);
        });
    
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

    let number1 = document.getElementById('number1');
    let number2 = document.getElementById('number2');
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
function applyFilters(copyfoundItems){

    let foundItems = [...copyfoundItems];

    if(checkthuonghieu(foundItems)===0){

    }
    if(checkkhoanggia(foundItems)===0){

    }
    checkgia(foundItems);

    showProduct(foundItems);
}

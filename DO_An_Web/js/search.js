
let shop_listIteam = document.querySelector('.pro-container');
let filters = document.querySelectorAll('.shop-filter-group-list');
let filtersnew = document.querySelector('.shop-filter-group--new');

let primary = document.getElementById('primary');
let number1 = document.getElementById('number1');
let number2 = document.getElementById('number2');
const search = document.getElementById('search-box');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchValue = urlParams.get('search');
      
window.onload = function () {
    products = JSON.parse(localStorage.getItem("product")) || [];
    Findname();
    redirectToProductDetails();

}

let foundItems = [];
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
        let shop_checkbox = document.querySelectorAll('.shop-filter-group-item-check');
        shop_checkbox.forEach(checkbox=>{
            checkbox.addEventListener('change',applyFilters);
        });
        primary.onclick = function() {
            applyFilters();
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
function createFilterItem(value, categoryType,shop_filter) {
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
    Newproduct_input.value = categoryType + value;
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
                createFilterItem(item.brand, "traDemark",shop_filter_traDemark);
            }
        });
    }
    return Promise.resolve();
}
function applyFilters(){
    
    let shop_checkbox = document.querySelectorAll('.shop-filter-group-item-check');

    const selectedCategories = [];
    shop_checkbox.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });
    if(selectedCategories.length ==0){
        showProduct(foundItems);
    }
    console.log(shop_checkbox);

    let item = [];
    let item_Price = [];
    let traDemark = [];
    let ThapDenCao = false;
    let CaoDenThap = false;
    selectedCategories.forEach(check=>{
        if(check.includes('traDemark')){
            traDemark.push(check);
        }
        if(check.includes('ThapDenCao')){
            ThapDenCao=true;
        }
        if(check.includes('CaoDenThap')){
            CaoDenThap=true;
        }
    });
    
    if(traDemark.length==0){

    }
    else{
        foundItems.forEach(check=>{
            let checked =0;
            if(traDemark.length==0){
                checked++;
            }
            for (let i = 0; i < traDemark.length; i++) {
                let traDemark_item=traDemark[i].replace(/traDemark/, "");
                if(check.brand==traDemark_item){
                    checked++;
                    break;
                }
            }
            if(checked==1){
                item.push(check);
            }
            
        });
        if(item.length==0){
            shop_listIteam.innerHTML = '';
            return ;
        }
    }
    
    if(number1.value === "" && number2.value === ""){
        if(item.length!=0){
            if(ThapDenCao){
                item.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            if(CaoDenThap){
                item.sort((b, a) => parseFloat(a.price) - parseFloat(b.price));
            }
            showProduct(item);
        }
        else{
            let item_i = [...foundItems];
            if(ThapDenCao){
                item_i.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                console.log(item_i);
            }
            if(CaoDenThap){
                item_i.sort((b, a) => parseFloat(a.price) - parseFloat(b.price));
            }
            showProduct(item_i);
        }
    }
    else{
        if(item.length!=0){
            item.forEach(checka=>{
                if(parseFloat(checka.price)>=parseFloat(number1.value) && parseFloat(checka.price)<=parseFloat(number2.value)){
                    item_Price.push(checka);
                }
            });
        }
        else{
            let item_i = [...foundItems];
            item_i.forEach(checka=>{
                if(parseFloat(checka.price)>=parseFloat(number1.value) && parseFloat(checka.price)<=parseFloat(number2.value)){
                    item_Price.push(checka);
                }
            });
        }
        if(ThapDenCao){
            item_Price.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
        if(CaoDenThap){
            item_Price.sort((b, a) => parseFloat(a.price) - parseFloat(b.price));
        }
        if(item_Price.length!=0){
            showProduct(item_Price);
        }
        else{
            shop_listIteam.innerHTML = '';
        }
    }
        
}

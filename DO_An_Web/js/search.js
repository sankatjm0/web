let shop_listIteam = document.querySelector('.pro-container');
let filters = document.querySelectorAll('.shop-filter-group-list');
let filtersnew = document.querySelector('.shop-filter-group--new');
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

function redirectToProductDetails() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(event) {
            if (!event.target.matches('.card-btn')) {
                const productId = this.getAttribute('data-id');
                window.location.href = 'product.html?ID=' + encodeURIComponent(productId);
            }
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
    let shop_listIteam = document.querySelector('.search-results');
    shop_listIteam.innerHTML=``;
}

function showProduct(list){

    shop_listIteam.innerHTML = '';
    if(list.length !=0){
        list.forEach(item => {
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

                    let New_button = document.createElement('button');
                    New_button.className = "card-btn";
                    New_button.innerHTML="add to whislist";
                    NewItem_product_image.append(New_button);

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
    let search = document.querySelector('.search-results');
    search.innerHTML=`<div>Không tìm thấy kết quả nào</div>`;
}
function applyFilters(copyfoundItems){

    let foundItems = [...copyfoundItems];

    if(checkthuonghieu(foundItems)===0){
        khongtimthaysanpham();
    }
    if(checkkhoanggia(foundItems)===0){
        khongtimthaysanpham();
    }
    checkgia(foundItems);

    showProduct(foundItems);
}

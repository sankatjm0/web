let shop_listIteam = document.querySelector('.product-container');
let filters = document.querySelectorAll('.shop-filter-group-list');
let primary = document.getElementById('primary');
let filtersnew = document.querySelector('.shop-filter-group--new');
let number1 = document.getElementById('number1');
let number2 = document.getElementById('number2');
const search = document.getElementById('search-box');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchValue = urlParams.get('query');
        
let listIteam = [
    {
        "id": "1",
        "name": "a b line what the gucci",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Man",
        "traDemark":"color",
        "image":"img/card2.png"
    },
    {
        "id": "1",
        "name": "a short line about the adidas",
        "discounttag":50,
        "Price": "30",
        "actualprice":"60",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card3.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card4.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card4.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card5.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card6.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card7.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card8.png"
    },
    {
        "id": "1",
        "name": "a short line about the cloth",
        "discounttag":50,
        "Price": "20",
        "actualprice":"40",
        "category":"Woman",
        "traDemark":"brand",
        "image":"img/card9.png"
    }
];
let foundItems = [];

function Findname(Name){
    search.value=searchValue;

    foundItems = [];
    listIteam.forEach(item => {
        if(item.name.includes(Name)){
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
        list.forEach(item => {
            let NewItem = document.createElement('div');
            NewItem.className = "product-card";
            shop_listIteam.append(NewItem);

                let NewItem_product_image = document.createElement('div');
                NewItem_product_image.className = "product-image";
                NewItem.append(NewItem_product_image);

                    let Newitem__span = document.createElement('span');
                    Newitem__span.className = "discount-tag";
                    Newitem__span.innerHTML=item.discounttag + '%';
                    NewItem_product_image.append(Newitem__span);

                    let Newitem__img = document.createElement('img');
                    Newitem__img.className = "product-thumb";
                    Newitem__img.src = item.image;
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
                    product_h2.innerHTML=item.traDemark;
                    product_info.append(product_h2);

                    let product_p = document.createElement('p');
                    product_p.className = "product-short-des";
                    product_p.innerHTML=item.name;
                    product_info.append(product_p);

                    let product_span_1 = document.createElement('span');
                    product_span_1.className = "price";
                    product_span_1.innerHTML='$'+item.Price;
                    product_info.append(product_span_1);

                    let product_span_2 = document.createElement('span');
                    product_span_2.className = "actual-price";
                    product_span_2.innerHTML='$'+item.actualprice;
                    product_info.append(product_span_2);

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
        let category = "";
        let traDemark = "";

        let shop_filter_category = document.querySelector('.shop-filter-group-list.category');
        let shop_filter_traDemark = document.querySelector('.shop-filter-group-list.traDemark');

        list.forEach(item => {
            if (!category.includes(item.category)) {
                category = category + item.category;
                createFilterItem(item.category, "category",shop_filter_category);
            }
            if (!traDemark.includes(item.traDemark)) {
                traDemark = traDemark + item.traDemark;
                createFilterItem(item.traDemark, "traDemark",shop_filter_traDemark);
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
    

    let item = [];
    let item_Price = [];
    let category = [];
    let traDemark = [];
    let ThapDenCao = false;
    let CaoDenThap = false;
    selectedCategories.forEach(check=>{
        if(check.includes('category')){
            category.push(check);
        }
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
    
    if(category.length==0 &&traDemark.length==0){
        
    }
    else{
        foundItems.forEach(check=>{
            let checked =0;
            if(category.length==0){
                checked++;
            }
            for (let i = 0; i < category.length; i++) {
                let category_item=category[i].replace(/category/, "");
                if(check.category==category_item){
                    checked++;
                    break;
                }
            }
            if(traDemark.length==0){
                checked++;
            }
            for (let i = 0; i < traDemark.length; i++) {
                let traDemark_item=traDemark[i].replace(/traDemark/, "");
                if(check.traDemark==traDemark_item){
                    checked++;
                    break;
                }
            }
            if(checked==2){
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
                item.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
            }
            if(CaoDenThap){
                item.sort((b, a) => parseFloat(a.Price) - parseFloat(b.Price));
            }
            showProduct(item);
        }
        else{
            let item_i = [...foundItems];
            if(ThapDenCao){
                item_i.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
            }
            if(CaoDenThap){
                item_i.sort((b, a) => parseFloat(a.Price) - parseFloat(b.Price));
            }
            showProduct(item_i);
        }
    }
    else{
        if(item.length!=0){
            item.forEach(checka=>{
                if(parseFloat(checka.Price)>=parseFloat(number1.value) && parseFloat(checka.Price)<=parseFloat(number2.value)){
                    item_Price.push(checka);
                }
            });
        }
        else{
            let item_i = [...foundItems];
            item_i.forEach(checka=>{
                if(parseFloat(checka.Price)>=parseFloat(number1.value) && parseFloat(checka.Price)<=parseFloat(number2.value)){
                    item_Price.push(checka);
                }
            });
        }
        if(ThapDenCao){
            item_Price.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
        }
        if(CaoDenThap){
            item_Price.sort((b, a) => parseFloat(a.Price) - parseFloat(b.Price));
        }
        if(item_Price.length!=0){
            showProduct(item_Price);
        }
        else{
            shop_listIteam.innerHTML = '';
        }
    }
        
}
Findname(searchValue);
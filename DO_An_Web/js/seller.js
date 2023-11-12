let loader = document.querySelector(".loader");
let user= JSON.parse(sessionStorage.user || null);

const becomeSellerElement = document.querySelector(".become-seller");
const productListingElement = document.querySelector(".product-listing");
const applyForm = document.querySelector(".apply-form");
const showApplyFormBTn = document.querySelector("#apply-btn");
console.log(11111111111111111111);

window.onload = () => {
  if (user) { 
    if(compareToken(user.authToken, user.email)){
  
      if (!user.seller) {
        becomeSellerElement.classList.remove("hide");
      } else {
        loader.style.display = 'block';
        setupProducts();
        
      }
    } else {
      location.replace("/login");
    }
  }
} 
showApplyFormBTn.addEventListener("click", () => {
  becomeSellerElement.classList.add("hide");
  applyForm.classList.remove("hide");
});
console.log(11111111111111111111);

// form submission
const applyFormButton = document.querySelector("#apply-form-btn");
const bussinessName = document.querySelector("#businessName");
const address = document.querySelector("#address");
const number = document.querySelector("#number");

console.log(11111111111111111111);
applyFormButton.addEventListener("click", () => {
  if (
    !bussinessName.value.length ||
    !address.value.length ||
    !number.value.length
  ) {
    showAlert("fill all the inputs");
  } else {
    //making server request
    loader.style.display = "block";
    sendData("/seller", {
      name: bussinessName.value,
      address: address.value,
      number: number.value,
      email: JSON.parse(sessionStorage.user).email,
    })
  }
})

const setupProducts = () => {
  fetch('/get-products',{
    method:'post',
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify({email: user.email})
  })
  .then(res => res.json())
  .then(data => {
    loader.style.display = null;
    productListingElement.classList.remove('hide');
    if(data == 'no products'){
      let emptySvg = document.querySelector('.no-product-image');
      emptySvg.classList.remove('hide');
    } else{
        data.forEach(product => createProduct(product));
          
    }
  }); 
}

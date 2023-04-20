import {addProductToCart} from "./shoppingCart.js";

const productId = new URLSearchParams(document.location.search).get("productId");

async function fetchProduct() {
    const productUrl = `http://flower-power.local/wp-json/wc/store/products/${productId}`;
    try {
        const response = await fetch(productUrl);
        const results = await response.json();
        return results    
    } catch(error) {
        console.error("An error has occurred", error);
        const errorMessageHtmElement = document.querySelector(".error-message");
        errorMessageHtmElement.style.display = "block";
        errorMessageHtmElement.innerHTML = `❗Unable to load product data`;
        return Promise.reject();
    }
}

const thisProductDataPromise = fetchProduct();
thisProductDataPromise.then(thisProduct => {    
    const sizeOptions = thisProduct.attributes.find(attr => attr.name === 'size').terms
    document.title = thisProduct.name;
    const jacketHtml = `<section class="product-one">
    <div class="product-one-details">
    <h1 class="product-one-header">${thisProduct.name}</h1>
    <p class="boldtext">${thisProduct.price_html}</p>
    <p class="product-text">${thisProduct.short_description}</p>
    </div>
    <div class="center">
    <img
    src="${thisProduct.images[0].src}"
    alt="${thisProduct.name}"
    class="product-one-img"
    />
    </div>
    <div class="size-button-margin center-two">
    ${sizeOptions.map(sizeOption => '<button class="size-button">' + sizeOption.name + '</button>' ).join(" ")}
    </div>
    
    <div class="center-three" id="linkToCart">
    <a href="cart.html" class="addtocart-button">Add to cart</a>
    </div>
    </section>
    <section class="product-info">
    <div>
    ${thisProduct.description}
    </div>
    </section>
    
    `
    const thisJacketHtml = document.querySelector("#placeHolderThisJacket");
    thisJacketHtml.innerHTML = jacketHtml;
    //Hide the spinner once the data is shown
    const spinner = document.querySelector(".loader");
    spinner.style.display = 'none'
    
    const sizeButtons = document.querySelectorAll(".size-button");
    
    function registerEventListenerOnAddToCartButton() {
        const addToCartBtn = document.querySelector(".addtocart-button");
        addToCartBtn.addEventListener("click", function onClick(event) {
            event.preventDefault();
            const isSizeChosen = isAnyButtonClicked(sizeButtons)
            if(!isSizeChosen) {
                alert("Please select a size")
            } else {
                const chosenSize = resolveChosenSize(sizeButtons)
                addProductToCart(productId, chosenSize, 1)
                document.location = "/cart.html"                
            }
            
        })
    }
    
    sizeButtons.forEach(btn => {
        btn.isClicked = false;
        btn.addEventListener("click", function onClick() {
            btn.isClicked = !btn.isClicked;
            if(btn.isClicked) {
                sizeButtons.forEach(entry => {
                    if(entry != btn) {
                        entry.isClicked = false;
                        entry.style.color = "#0A3641";
                        entry.style.backgroundColor = "#D0E4E5";
                    }
                })
                btn.style.color = "white";
                btn.style.backgroundColor = "#0A3641"
            } else {
                btn.style.color = "#0A3641";
                btn.style.backgroundColor = "#D0E4E5";
            }
            const linkToCartHtml = document.querySelector("#linkToCart");
            const chosenSize = btn.isClicked ? btn.innerHTML : '';
            linkToCartHtml.innerHTML =  `<a href="cart.html" class="addtocart-button">Add to cart</a>`
            registerEventListenerOnAddToCartButton();
        })
    })
    
    registerEventListenerOnAddToCartButton();
}).catch(ignore =>{
    console.error("No data received")
    
}).finally(()=> {
    document.querySelector(".loader").style.display = 'none';
}) 

function isAnyButtonClicked(buttons) {
    let anyButtonIsClicked = false
    buttons.forEach(button => {
        if(button.isClicked) {
            anyButtonIsClicked = true
        } 
    })
    return anyButtonIsClicked;
}

function resolveChosenSize(sizeButtons){
    let foundSize = "";
    sizeButtons.forEach(btn => {
        if(btn.isClicked){            
            foundSize= btn.innerText;
        }
    }); 
    return foundSize;   
}


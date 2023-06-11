import {getAllProductsInCart, emptyCart, removeAllProductsFromCart, setQuantityForProductInCart} from "./shoppingCart.js";



async function fetchProductsInCart() {
    const allProductsFromCart = getAllProductsInCart();
    try {
        const fullProductUrl = "https://smoothie-bowl.info/rainydays/wp-json/wc/store/products";
        const response = await fetch(fullProductUrl);
        const results = await response.json();
        return allProductsFromCart.map(cartEntry => {
            const theProduct = results.find(product => product.id == parseInt(cartEntry.id))
            return {
                product: theProduct,
                size: cartEntry.size,
                quantity: cartEntry.quantity
            }
        });   
    } catch(error) {
        console.error("An error has occurred", error);
        const errorMessageHtmElement = document.querySelector(".error-message");
        errorMessageHtmElement.style.display = "block";
        errorMessageHtmElement.innerHTML = `❗Unable to load product data`;
        return Promise.reject();
    }
}

function refreshPage() {
fetchProductsInCart()
    .then(products => {
        products.forEach(product => createProductHtml(product));

        const totalSum = products
        .map(product => product.quantity * (product.product.prices.regular_price / 100))
        .reduce((a, b) => a + b, 0)

        const totalSumPlacehoder = document.querySelector("#totalSum");
        totalSumPlacehoder.innerText = "Subtotal: " + totalSum + " kr";

        const checkoutBtn = document.querySelector("#checkout-btn");
        const button = document.createElement("button");
        button.classList.add("checkout-button")
        button.innerText = "Checkout"

        checkoutBtn.append(button);
    
    
        button.addEventListener("click", function(){
            document.location = `/checkout.html?totalSum=${totalSum}`;
            emptyCart();
        });

        const continueShoppingBtn = document.querySelector("#continue-shopping-btn");
        const btnContinueShopping = document.createElement("button");
        btnContinueShopping.classList.add("continue-shopping-button");
        btnContinueShopping.innerText = "⟵ Continue Shopping";

        continueShoppingBtn.append(btnContinueShopping);

        btnContinueShopping.addEventListener("click", function() {
            document.location = '/products.html';
        })

    });
}
refreshPage();

function createProductHtml(productWithSizeAndQuantity) {

    const placeholder = document.querySelector("#placeHolderJacketInCart");
    

    const productPlaceholder = document.createElement("div");
    productPlaceholder.id = productWithSizeAndQuantity.product.id;

    placeholder.append(productPlaceholder)

    for (let i = 0; i < productWithSizeAndQuantity.product.images.length; i++) {
        const imgData = productWithSizeAndQuantity.product.images[i];
        const img = document.createElement("img");
        img.classList.add("cart-img");
        img.src = imgData.src;
        img.alt = imgData.alt;
        productPlaceholder.append(img)
    }
    

    const title = document.createElement("h1");
    title.classList.add("cart-header");
    title.innerText = productWithSizeAndQuantity.product.name;
    productPlaceholder.append(title);

    const size = document.createElement("p");
    size.innerHTML = "size: " + productWithSizeAndQuantity.size;
    productPlaceholder.append(size); 

    const quantity = document.createElement("p");
    quantity.style = "white-space: nowrap;"
    const qtyInput = document.createElement("input")
    qtyInput.setAttribute("type", "number")
    qtyInput.style = "width: 40px;"
    qtyInput.value = productWithSizeAndQuantity.quantity;
    qtyInput.addEventListener("input", (event) => {
        const newQuantity = event.data;
        if(newQuantity !== null){
            const newQtyAsNumber = parseInt(newQuantity);
            if(newQtyAsNumber < 1){
                removeAProductAnReloadPage(
                    productWithSizeAndQuantity.product.id,
                     productWithSizeAndQuantity.size, 
                     placeholder
                );
            } else {                
                setQuantityForProductInCart(
                    productWithSizeAndQuantity.product.id,
                    productWithSizeAndQuantity.size,
                    newQtyAsNumber
                );
                reloadPage(placeholder);
            }
        }
    });
    
    const qtyLabel = document.createElement("label")
    qtyLabel.style = "margin-left: 0px; color: black;"
    qtyLabel.innerText = "Qty: ";
    quantity.append(qtyLabel);
    quantity.append(qtyInput);
    productPlaceholder.append(quantity);

    const price = document.createElement("p");
    price.innerHTML = productWithSizeAndQuantity.product.price_html;
    productPlaceholder.append(price); 
    
    const removeProduct = document.createElement("button");
    removeProduct.innerHTML = "Remove"
    removeProduct.classList.add("red-text",);
    productPlaceholder.append(removeProduct);

   

    removeProduct.addEventListener("click", function(){
        removeAProductAnReloadPage(
            productWithSizeAndQuantity.product.id,
             productWithSizeAndQuantity.size, 
             placeholder
        );
    });    
}

function removeAProductAnReloadPage(productId, size, productsPlaceholderElement){
    removeAllProductsFromCart(productId, size);
    reloadPage(productsPlaceholderElement)
}

function reloadPage(productsPlaceholderElement){
    productsPlaceholderElement.innerHTML = "";
    document.querySelector("#checkout-btn").innerHTML = "";
    document.querySelector("#continue-shopping-btn").innerHTML = "";
    refreshPage();
}


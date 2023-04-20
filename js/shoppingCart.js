const cartLocalStorageKey = 'rainy-days-cart'


function addProductToCart(productId, size, quantity){
    const allProducts = getAllProductsInCart();
    const productFromCart = allProducts.find(product => {
        return product.id === productId && product.size === size
    });
    let actualProduct = productFromCart ? productFromCart : {id: productId, size: size, quantity: 0};
    actualProduct.quantity += quantity
    persistChangeToProduct(allProducts, productId, size, actualProduct);
}

function setQuantityForProductInCart(productId, size, quantity){
    const allProducts = getAllProductsInCart();
    const productFromCart = allProducts.find(product => parseInt(product.id) === parseInt(productId) && product.size === size);
    if(productFromCart) {
        productFromCart.quantity = quantity;  
        persistChangeToProduct(allProducts, productId, size, productFromCart);
    }
}

function removeAllProductsFromCart(productId, size){
    const allProducts = getAllProductsInCart();
    const allProductsExceptRemoved = allProducts.filter(product => 
        (parseInt(product.id) !== parseInt(productId) && product.size !== size) ||
        (parseInt(product.id) === parseInt(productId) && product.size !== size) ||
        (parseInt(product.id) !== parseInt(productId) && product.size === size)
    );
    persistCart(allProductsExceptRemoved)
}

function emptyCart(){
    persistCart([])
}

function persistCart(allProducts){
    localStorage.setItem(cartLocalStorageKey, JSON.stringify(allProducts));
}

function getAllProductsInCart(){
    const allProducts = localStorage.getItem(cartLocalStorageKey);
    return allProducts ? JSON.parse(allProducts) : [];
}

function persistChangeToProduct(allProducts, changedProductId, changedProductSize, newVersionOfProduct){
      persistCart(
        allProducts
            .filter(product => parseInt(product.id) !== parseInt(changedProductId) ||
                product.size !== changedProductSize
             )
            .concat([newVersionOfProduct])
    )
}

export {
    addProductToCart,
    getAllProductsInCart,
    emptyCart,
    setQuantityForProductInCart,
    removeAllProductsFromCart
}
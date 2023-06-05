const apiBase = "http://flower-power.local";
const woocommerceBase = "/wp-json/wc/store";
const productBase = "/products";

const pageBase = "/wp-json/wp/v2/pages";

const featured = "?featured=true"


const fullPagesUrl = apiBase + pageBase;

const fullProductUrl = apiBase + woocommerceBase + productBase;

const featuredProductUrl = fullProductUrl + featured

async function getProducts() {
    const response = await fetch(fullProductUrl);
    
    const products = await response.json();
    
    return products;
}

function createProductHtml(product, placeholder) {
    
    const productSection = document.createElement("section");
    productSection.classList.add("product-list");
    
    const productPlaceholder = document.createElement("div");
    productPlaceholder.classList.add("products");
    productPlaceholder.id = product.id;
    
    
    for (let i = 0; i < product.images.length; i++) {
        const imgData = product.images[i];
        const img = document.createElement("img");
        img.src = imgData.thumbnail;
        img.alt = imgData.alt;
        productPlaceholder.append(img)
    }
    
    placeholder.append(productPlaceholder)
    
    const title = document.createElement("p");
    title.classList.add("product-name");
    title.innerText = product.name;
    productPlaceholder.append(title);
    
    const price = document.createElement("p");
    price.innerHTML = product.price_html;
    productPlaceholder.append(price); 
    
    
    const button = document.createElement("button");
    button.classList.add("shopnow-button");
    button.innerText = "Shop now"
    
    button.addEventListener("click", function(){
        location = `jacket-details.html?productId=${product.id}`;
    });
    productPlaceholder.append(button);   
}


function createProductsHtml(products, placeholder) {    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        createProductHtml(product, placeholder)
    }
}

async function getFeaturedProducts() {
    const response = await fetch(featuredProductUrl);
    
    const products = await response.json();
    const reverseArray = products.reverse()
    
    const placeholder = document.querySelector("#featuredPlaceholder");
    createProductsHtml(reverseArray, placeholder)
}
async function getAllProducts() {
    const products = await getProducts()
    const reverseArray = products.reverse()
    const placeholder = document.querySelector("#placeholder");
    createProductsHtml(reverseArray, placeholder)
} 

getFeaturedProducts();
getAllProducts();


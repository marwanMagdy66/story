let category = document.getElementById('Categories');
let sort = document.getElementById('sort');
let filterCat = document.getElementById('filterCat');
let filterSort = document.getElementById('SortPrice');
let storyContent = document.getElementById('story-content');
let searchBtn = document.getElementById('search');
let searchInput = document.getElementById('search-input');
 let addCartBtn=document.getElementById('addCart');
 let cartDetailes=document.getElementById('cart-detailes')
let showCart=document.getElementById('showCart');
let cartTotal=document.getElementById('cartTotal')
let filterPriceBtn=document.getElementById('filterPrice')
let minPriceInput=document.getElementById('min')
let maxPriceInput=document.getElementById('max')  
let productInfo =document.getElementById('product-detaile');
let data = [];

// Fetch all products and display them
async function AllProducts() {
    let url = `https://fakestoreapi.com/products`;
    let response = await fetch(url);
    data = await response.json();
    displayProducts(data);
}
AllProducts();

const displayProducts = (products) => {
    storyContent.innerHTML = '';
    products.forEach((product, index) => {
        storyContent.innerHTML += `
            <div class="products-card">
                <img src="${product.image}" alt="Image">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button type="button" class="addCartBtn" data-index="${index}">Add To Cart</button>
                <button type="button" class="showData" data-index="${index}">Show Product</button>

            </div>
        `;
    });
    document.querySelectorAll('.addCartBtn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    document.querySelectorAll('.showData').forEach(button => {
        button.addEventListener('click', showProduct);
    });

};

// Search functionality
document.getElementById('search-form').addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    searchProducts(searchInput.value);
});

function filterProductsByTitle(products, title) {
    return products.filter(product => product.title.toLowerCase().includes(title.toLowerCase()));
}

function searchProducts(title) {
    let filteredProducts = filterProductsByTitle(data, title);
    displayProducts(filteredProducts);
}

// Filter by category
filterCat.addEventListener("click", function (e) {
    e.preventDefault();
    getCategory(category.value);
});

function filterProductsByCategory(products, cat) {
    if (cat.toLowerCase() === 'all') {
        return products;
    }
    return products.filter(product => product.category.toLowerCase().includes(cat.toLowerCase()));
}

function getCategory(cat) {
    let filteredProducts = filterProductsByCategory(data, cat);
    displayProducts(filteredProducts);
}

// Sort by price
filterSort.addEventListener("click", function (e) {
    e.preventDefault();
    getSort(sort.value);
});

function filterProductsBySort(products, sort) {
    let sortedProducts = [...products]; 
    if (sort === 'height to low') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'low to height') {
        sortedProducts.sort((a, b) => a.price - b.price);
    }
    return sortedProducts;
}

function getSort(sort) {
    let sortedProducts = filterProductsBySort(data, sort);
    displayProducts(sortedProducts);
}

let cartItems=[];
let sum=0;
//add cart///
function addToCart(event) {
    let productIndex = event.target.getAttribute('data-index');
    let product = data[productIndex];
cartItems.push(product);
sum+= +product.price;


    
}

//display cart items
showCart.addEventListener("click",function (e) {
    e.preventDefault();
    cartItems.forEach((item) => {
        cartDetailes.innerHTML += `
                <p>${item.title} - $${item.price}</p>  
        `;
    });
    cartTotal.innerHTML = `Total: $${sum}`


})



//filter min-max price//

filterPriceBtn.addEventListener("click",function () {
    let minPrice = minPriceInput.value;
    let maxPrice = maxPriceInput.value;
    let filteredProducts = data.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
        });
        displayProducts(filteredProducts);
        

})




///show product //
function showProduct(event) {
    let productIndex = event.target.getAttribute('data-index');
    let product = data[productIndex];
    productInfo.innerHTML = `
    <h1>Product Information</h1>
    <p id="info">Product Title -> ${product.title}</p>
    <p id="info">Product Description -> ${product.description}</p>
    <p id="info">Product price -> $${product.price}</p>
    
    `
    
}
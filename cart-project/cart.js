let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Color:</strong> ${product.color}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
  });
}

function addToCart(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products[index];

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
  displayCart();
}

function displayCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p><strong>${item.title}</strong></p>
        <p>Price: ₹${item.price}</p>
        <p>Category: ${item.category}</p>
        <p>Brand: ${item.brand}</p>
        <p>Color: ${item.color}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }
}

document.getElementById('productForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const newProduct = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    category: document.getElementById('category').value,
    brand: document.getElementById('brand').value,
    color: document.getElementById('color').value
  };

  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));

  document.getElementById('productForm').reset();
  displayProducts();
});
     
document.getElementById('viewCartBtn').addEventListener('click', function() {
    displayCart();
  });

displayProducts();

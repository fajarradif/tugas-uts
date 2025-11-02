// Declare all variables at the top
const navbarNav = document.querySelector('.navbar-nav');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const shoppingCart = document.querySelector('.shopping-cart');
const coffe = document.querySelector('#coffe-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

// Toggle class active for navbar
document.querySelector('#coffe-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active for search form
document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Search functionality
function performSearch() {
  const query = searchBox.value.trim();
  if (query) {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleSearchUrl, '_blank');
  }
}

// Perform search on button click inside search form
document.querySelector('#search-submit').addEventListener('click', (e) => {
  e.preventDefault();
  performSearch();
});

// Perform search on Enter key press in search box
searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    performSearch();
  }
});

// Toggle class active for shopping cart
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};


document.addEventListener('click', function(e) {
    if(!coffe.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});


// modal box
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    const modalId = btn.getAttribute('href');
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.style.display = 'flex';
    }
  };
});

// click tombol close modal
document.querySelectorAll('.modal .close-icon').forEach((close) => {
  close.onclick = (e) => {
    e.preventDefault();
    e.target.closest('.modal').style.display = 'none';
  };
});

// click di luar modal
window.onclick = (e) => {
  document.querySelectorAll('.modal').forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// Shopping Cart Functionality
let cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');

// Function to update cart display
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalQuantity = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Tidak ada layanan yang di simpan</p>';
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.setAttribute('data-index', index);
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-detail">
          <h3>${item.name}</h3>
          <div class="item-price">IDR ${item.price.toLocaleString('id-ID')}</div>
          <div class="quantity-controls">
            <button class="quantity-btn decrease">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn increase">+</button>
          </div>
        </div>
        <i data-feather="trash-2" class="remove-item"></i>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
  }

  cartTotalElement.textContent = `Total : IDR ${total.toLocaleString('id-ID')}`;

  // Update cart badge
  const cartBadge = document.querySelector('.cart-badge');
  if (totalQuantity === 0) {
    cartBadge.style.display = 'none';
  } else {
    cartBadge.textContent = totalQuantity;
    cartBadge.style.display = 'flex';
  }

  // Reinitialize Feather icons for new elements
  feather.replace();
}

// Function to add item to cart
function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  updateCart();

  // Trigger bounce animation on cart badge
  const cartBadge = document.querySelector('.cart-badge');
  cartBadge.classList.remove('bounce');
  void cartBadge.offsetWidth; // Trigger reflow
  cartBadge.classList.add('bounce');
}

// Event listeners for add to cart buttons in products section
document.querySelectorAll('.product-icon a[href="#"]').forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const productCard = button.closest('.product-card');
    const name = productCard.querySelector('.product-content h3').textContent;
    const priceText = productCard.querySelector('.product-price').textContent.split(' ')[1];
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const image = productCard.querySelector('.product-image img').src;

    addToCart(name, price, image);
  });
});

// Event listeners for add to cart buttons in menu section
document.querySelectorAll('.menu .btn-add-cart').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const menuCard = button.closest('.menu-card');
    const name = menuCard.querySelector('.menu-card-title').textContent;
    const priceText = menuCard.querySelector('.menu-card-price').textContent;
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const image = menuCard.querySelector('img').src;

    addToCart(name, price, image);
  });
});

// Event listener for remove item
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const cartItem = e.target.closest('.cart-item');
    const index = parseInt(cartItem.getAttribute('data-index'));
    cart.splice(index, 1);
    updateCart();
  }
});

// Event listeners for quantity controls
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('quantity-btn')) {
    const cartItem = e.target.closest('.cart-item');
    const index = parseInt(cartItem.getAttribute('data-index'));
    const item = cart[index];

    if (e.target.classList.contains('increase')) {
      item.quantity += 1;
    } else if (e.target.classList.contains('decrease')) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // If quantity reaches 0, remove the item
        cart.splice(index, 1);
      }
    }
    updateCart();
  }
});

// Also add to cart from modal
document.querySelectorAll('.modal-content a[href="#"]').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modal = button.closest('.modal');
    const name = modal.querySelector('.product-content h3').textContent;
    const priceText = modal.querySelector('.product-price').textContent.split(' ')[1];
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const image = modal.querySelector('.modal-content img').src;

    addToCart(name, price, image);
    modal.style.display = 'none'; // Close modal after adding
  });
});

// Dievable link modal
document.getElementById('dievable-link').addEventListener('click', (e) => {
  e.preventDefault();
  const modal = document.getElementById('dievable-modal');
  modal.style.display = 'flex';
});

// Close modal when clicking outside or on close icon
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal') || e.target.closest('.close-icon')) {
    e.target.closest('.modal').style.display = 'none';
  }
});

// Customer Order Form Submission
document.querySelector('.customer-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const address = document.getElementById('customer-address').value.trim();
  const date = document.getElementById('customer-date').value;
  const time = document.getElementById('customer-time').value;

  if (!name || !phone || !address || !date || !time) {
    alert('Harap isi semua field!');
    return;
  }

  if (cart.length === 0) {
    alert('Keranjang kosong! Tambahkan layanan terlebih dahulu.');
    return;
  }

  // Prepare order details
  const orderDetails = {
    customer: { name, phone, address, date, time },
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };

  // For now, log to console (in a real app, send to server)
  console.log('Order submitted:', orderDetails);

  // Create WhatsApp message
  const message = `Halo, saya ingin memesan layanan dari Dievable Project.\n\nNama: ${name}\nNomor HP: ${phone}\nAlamat: ${address}\nTanggal Layanan: ${date}\nJam Layanan: ${time}\n\nLayanan yang dipesan:\n${cart.map(item => `- ${item.name} (Qty: ${item.quantity}): IDR ${(item.price * item.quantity).toLocaleString('id-ID')}`).join('\n')}\n\nTotal: IDR ${orderDetails.total.toLocaleString('id-ID')}`;

  const whatsappUrl = `https://wa.me/6283863684320?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');

  // Clear cart and form
  cart = [];
  updateCart();
  document.querySelector('.customer-form').reset();
  document.querySelector('.shopping-cart').classList.remove('active');
});

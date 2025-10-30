// toggle class active
const navbarNav = document.querySelector
('.navbar-nav');
//
document.querySelector('#coffe-menu').
onclick = () => {
navbarNav.classList.toggle('active');
};


// toogel class active untuk serach form
const searchForm = document.querySelector('.search-form')
const searchBox = document.querySelector('#search-box')

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// togle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};


//klik diluar elemen
const coffe = document.querySelector('#coffe-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');


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

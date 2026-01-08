import { initChat } from './chat.js';

/* ===================== STATE ===================== */
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

/* ===================== ELEMENTS ===================== */
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('[data-nav]');
const sideMenu = document.getElementById('sideMenu');
const hamburger = document.getElementById('hamburger');
const cartCount = document.getElementById('cartCount');
const loginBanner = document.getElementById('loginBanner');

/* ===================== INIT ===================== */
initChat();
updateCartCount();
renderLoginState();
bindNavigation();
bindHamburger();
loadDummyProducts();

/* ===================== NAVIGATION ===================== */
function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  sideMenu.classList.add('hidden');
}

function bindNavigation() {
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav;
      if (target) showPage(target);
    });
  });
}

/* ===================== HAMBURGER ===================== */
function bindHamburger() {
  hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('hidden');
  });
}

/* ===================== LOGIN STATE ===================== */
function renderLoginState() {
  if (state.user) {
    loginBanner.style.display = 'none';
  } else {
    loginBanner.style.display = 'block';
  }
}

/* ===================== CART ===================== */
function updateCartCount() {
  cartCount.textContent = state.cart.length;
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

/* ===================== PRODUCTS (DUMMY) ===================== */
function loadDummyProducts() {
  const products = [
    { id: 1, img: 'https://acmic.id/cdn/shop/files/AIRBASS_1_png_1000x.jpg?v=1729762854', name: 'Headset Gaming', price: 150000, Desc:'Headset gaming dengan suara jernih dan bass kuat untuk pengalaman bermain yang imersif.' },
    { id: 2, img: 'https://picsum.photos/200?2', name: 'Mouse RGB', price: 80000, Desc:'Mouse gaming dengan lampu RGB yang dapat disesuaikan dan sensor presisi tinggi.' },
    { id: 3, img: 'https://picsum.photos/200?3', name: 'Keyboard Mechanical', price: 250000, Desc:'Keyboard mekanik dengan respons cepat dan tahan lama.' },
    { id: 4, img: 'https://picsum.photos/200?4', name: 'Stand HP', price: 30000, Desc:'Stand HP yang stabil dan praktis untuk penggunaan sehari-hari.' },
    { id: 5, img: 'https://picsum.photos/200?5', name: 'Charger Fast', price: 90000, Desc:'Charger fast dengan daya tinggi untuk pengisian cepat.' },
  ];

  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.style.background = '#fff';
    card.style.padding = '10px';
    card.style.borderRadius = '8px';

    card.innerHTML = `
      <b><img src="${p.img}" alt="${p.name}" style="width:100%; height:auto;"></b>
      <h3>${p.name}</h3>
      <h3>Rp ${p.price.toLocaleString()}</h3>
      <p>${p.Desc}</p>
      <button>Beli</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      addToCart(p);
    });

    grid.appendChild(card);
  });
}

function addToCart(product) {
  state.cart.push(product);
  updateCartCount();
  alert('Produk ditambahkan ke keranjang');
}

/* ===================== CART PAGE ===================== */
document.getElementById('cartBtn').addEventListener('click', () => {
  showPage('cart');
  renderCart();
});

function renderCart() {
  const wrap = document.getElementById('cartItems');
  const totalEl = document.getElementById('total');

  wrap.innerHTML = '';
  let total = 0;

  state.cart.forEach((item, i) => {
    total += item.price;

    const row = document.createElement('div');
    row.innerHTML = `
      ${item.name} - Rp ${item.price.toLocaleString()}
      <button data-i="${i}">❌</button>
    `;

    row.querySelector('button').addEventListener('click', () => {
      state.cart.splice(i, 1);
      updateCartCount();
      renderCart();
    });

    wrap.appendChild(row);
  });

  totalEl.textContent = total.toLocaleString();
}

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
loadProductCategories();
loadDummyExclusiveTodayProducts();
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

/* ===================== BANNER PROMO ===================== */

/* ==================== EXCLUSIVE TODAY PRODUCTS (DUMMY) ===================== */
function loadDummyExclusiveTodayProducts() {
  const products = [
    { 
      id: 1,
      img: 'gambar/crispy-hemat.jpg',
      name: 'Paket Crispy Hemat',
      price: 25000,
      Desc: '1 pcs ayam crispy + nasi + saus sambal'
    },
    { 
      id: 2,
      img: 'gambar/keluarga-cuan.jpg',
      name: 'Paket Keluarga Cuan',
      price: 75000,
      Desc: '4 pcs ayam crispy + 4 nasi + 4 saus sambal + 4 Kentang Goreng + Bebas pilih minuman variasi Teh'
    },

  ];
  const grid = document.getElementById('productToday');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.style.background = '#f0be9aff';
    card.style.padding = '10px';
    card.style.borderRadius = '8px';

    card.innerHTML = `
      <b><img src="${p.img}" alt="${p.name}" style="width:100%; height:auto;"></b>
      <h3>${p.name}</h3>
      <h3>Rp ${p.price.toLocaleString()}</h3>
      <p>${p.Desc}</p>
      <button>Keranjang</button>
      <button>Beli</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      addToCart(p);
    });

    grid.appendChild(card);
  });
}

/* ===================== PRODUCTS (DUMMY) ===================== */
function loadProductCategories() {
  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'makanan', name: 'Makanan' },
    { id: 'minuman', name: 'Minuman' },
    { id: 'Frozen Food', name: 'Frozen Food' }
  ];

  const categoriesContainer = document.getElementById('productCategories');
  categoriesContainer.innerHTML = '';

  categories.forEach(cat => {
    const categoryElement = document.createElement('div');
    categoryElement.setAttribute('data-category', cat.id);
    categoryElement.classList.add('category');
    if (cat.id === 'all') categoryElement.classList.add('active');
    categoryElement.textContent = cat.name;
    categoriesContainer.appendChild(categoryElement);
  });
}

function loadDummyProducts() {
  const products = [
    { 
      id: 1,
      img: 'gambar/ayam-penuts-sauce.jpg',
      name: 'Ayam Penuts Sauce',
      price: 15000,
      Desc: 'Ayam dengan saus kacang'
    },
    { 
      id: 2,
      img: 'gambar/ayam-bakar.jpg',
      name: 'Ayam Bakar',
      price: 80000,
      Desc: 'Ayam bakar dengan bumbu khas.'
    },
    { 
      id: 3,
      img: 'gambar/ayam-katsu.jpg',
      name: 'Ayam Katsu',
      price: 25000,
      Desc: 'Ayam goreng tepung ala Jepang.'
    },
    { 
      id: 4,
      img: 'gambar/Burger.jpg',
      name: 'Burger',
      price: 30000,
      Desc: 'Burger dengan daging sapi dan sayuran segar.'
    },
    { 
      id: 5,
      img: 'gambar/kentang-goreng.jpg',
      name: 'Kentang Goreng',
      price: 15000,
      Desc: 'Kentang goreng renyah dan gurih.'
    },
    { 
      id: 6,
      img: 'gambar/Ammericano.jpg',
      name: 'Americano',
      price: 20000,
      Desc: 'Kopi Americano dengan rasa khas.'
    },
    { 
      id: 7,
      img: 'gambar/Cappucino.jpg',
      name: 'Cappucino',
      price: 25000,
      Desc: 'Cappucino dengan busa susu lembut.'
    },
    { 
      id: 8,
      img: 'gambar/Caramel-coffee-milk.jpg',
      name: 'Caramel Coffee Milk',
      price: 28000,
      Desc: 'Kopi karamel dengan susu yang lembut.'
    },
    {
      id: 9,
      img: 'gambar/Sushi-garing-keranjang.jpg',
      name: 'Ikan Asin Keranjangan',
      price: 10000,
      Desc: 'Asin, Gurih, dan Maknyus'
    },
  ];

  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.style.background = '#f0be9aff';
    card.style.padding = '10px';
    card.style.borderRadius = '8px';

    card.innerHTML = `
      <b><img src="${p.img}" alt="${p.name}" style="width:100%; height:auto;"></b>
      <h3>${p.name}</h3>
      <h3>Rp ${p.price.toLocaleString()}</h3>
      <p>${p.Desc}</p>
      <button>Keranjang</button>
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

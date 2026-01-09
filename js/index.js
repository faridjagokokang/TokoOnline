import { initChat } from './chat.js';

/* ===================== STATE ===================== */
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

let allProducts = [];

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
bindSearch();
bindHeroActions();

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
  const authArea = document.getElementById('authArea');

  if (state.user) {
    loginBanner.style.display = 'none';
    authArea.innerHTML = `
      <p>Login sebagai <b>${state.user.username}</b></p>
      <button id="logoutBtn">Logout</button>
    `;
    document.getElementById('logoutBtn').onclick = () => {
      localStorage.removeItem('user');
      location.reload();
    };
  } else {
    loginBanner.style.display = 'block';
    authArea.innerHTML = `<a href="login.html">Login</a>`;
  }
}

/* ===================== CART ===================== */
function updateCartCount() {
  cartCount.textContent = state.cart.length;
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

function addToCart(product) {
  state.cart.push(product);
  updateCartCount();
  alert('Produk ditambahkan ke keranjang');
}

/* ===================== EXCLUSIVE TODAY ===================== */
function loadDummyExclusiveTodayProducts() {
  const products = [
    { id:1, img:'gambar/crispy-hemat.jpg', name:'Paket Crispy Hemat', price:25000, Desc:'1 pcs ayam crispy + nasi + saus sambal' },
    { id:2, img:'gambar/keluarga-cuan.jpg', name:'Paket Keluarga Cuan', price:75000, Desc:'4 pcs ayam crispy + nasi + kentang + minum' },
  ];

  const grid = document.getElementById('productToday');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.style.background = '#f0be9aff';
    card.style.padding = '10px';
    card.style.borderRadius = '8px';

    card.innerHTML = `
      <img src="${p.img}" style="width:100%">
      <h3>${p.name}</h3>
      <h3>Rp ${p.price.toLocaleString()}</h3>
      <p>${p.Desc}</p>
      <button>Keranjang</button>
      <button>Beli</button>
    `;

    const btnKeranjang = card.querySelectorAll('button')[0];
    const btnBeli = card.querySelectorAll('button')[1];

    btnKeranjang.onclick = () => addToCart(p);
    btnBeli.onclick = () => {
      addToCart(p);
      showPage('cart');
      renderCart();
    };

    grid.appendChild(card);
  });
}

/* ===================== PRODUCTS ===================== */
function loadProductCategories() {
  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'makanan', name: 'Makanan' },
    { id: 'minuman', name: 'Minuman' },
    { id: 'Frozen Food', name: 'Frozen Food' }
  ];

  const el = document.getElementById('productCategories');
  el.innerHTML = '';

  categories.forEach(cat => {
    const d = document.createElement('div');
    d.className = 'category' + (cat.id === 'all' ? ' active' : '');
    d.dataset.category = cat.id;
    d.textContent = cat.name;
    el.appendChild(d);
  });

  el.addEventListener('click', e => {
    if (!e.target.dataset.category) return;

    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');

    const cat = e.target.dataset.category;
    const filtered = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
    renderProducts(filtered);
  });
}

function loadDummyProducts() {
  const products = [
    { 
      id: 1,
      img: 'gambar/ayam-penuts-sauce.jpg',
      name: 'Ayam Penuts Sauce',
      price: 15000,
      Desc: 'Ayam dengan saus kacang',
      category: 'makanan'
    },
    { 
      id: 2,
      img: 'gambar/ayam-bakar.jpg',
      name: 'Ayam Bakar',
      price: 80000,
      Desc: 'Ayam bakar dengan bumbu khas.',
      category: 'makanan'
    },
    { 
      id: 3,
      img: 'gambar/ayam-katsu.jpg',
      name: 'Ayam Katsu',
      price: 25000,
      Desc: 'Ayam goreng tepung ala Jepang.',
      category: 'makanan'
    },
    { 
      id: 4,
      img: 'gambar/Burger.jpg',
      name: 'Burger',
      price: 30000,
      Desc: 'Burger dengan daging sapi dan sayuran segar.',
      category: 'makanan'
    },
    { 
      id: 5,
      img: 'gambar/kentang-goreng.jpg',
      name: 'Kentang Goreng',
      price: 15000,
      Desc: 'Kentang goreng renyah dan gurih.',
      category: 'makanan'
    },
    { 
      id: 6,
      img: 'gambar/Ammericano.jpg',
      name: 'Americano',
      price: 20000,
      Desc: 'Kopi Americano dengan rasa khas.',
      category: 'minuman'
    },
    { 
      id: 7,
      img: 'gambar/Cappucino.jpg',
      name: 'Cappucino',
      price: 25000,
      Desc: 'Cappucino dengan busa susu lembut.',
      category: 'minuman'
    },
    { 
      id: 8,
      img: 'gambar/Caramel-coffee-milk.jpg',
      name: 'Caramel Coffee Milk',
      price: 28000,
      Desc: 'Kopi karamel dengan susu yang lembut.',
      category: 'minuman'
    },
    {
      id: 9,
      img: 'gambar/Sushi-garing-keranjang.jpg',
      name: 'Ikan Asin Keranjangan',
      price: 10000,
      Desc: 'Asin, Gurih, dan Maknyus',
      category: 'Frozen Food'
    },
    {
      id: 10,
      img: 'gambar/Sushi-garing-lendra.jpg',
      name: 'Ikan Asin lendra',
      price: 20000,
      Desc: 'rasanya mantap, Gurih, dan semlehot',
      category: 'Frozen Food'
    },
    {
      id: 11,
      img: 'gambar/Sushi-garing-teri.jpg',
      name: 'Ikan Asin Teri',
      price: 20000,
      Desc: 'rasanya mantap, Gurih, dan semlehot',
      category: 'Frozen Food'
    },
    {
      id: 12,
      img: 'gambar/Sushi-garing-peda.jpg',
      name: 'Ikan Asin peda',
      price: 30000,
      Desc: 'rasanya mantap, Gurih, dan semlehot',
      category: 'Frozen Food'
    },
     {
      id: 13,
      img: 'gambar/teh-tarik-bakar.jpg',
      name: 'teh tarik bakar',
      price: 15000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 14,
      img: 'gambar/teh-tarik.jpg',
      name: 'teh tarik',
      price: 5000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 15,
      img: 'gambar/Vietnam-drip.jpg',
      name: 'Vietnam Drip',
      price: 20000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 16,
      img: 'gambar/Yakult-light-1-pack.jpg',
      name: 'Yakult Light 1 Pack',
      price: 12000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 17,
      img: 'gambar/Yakult-mangga-1-pak.jpg',
      name: 'Yakult Mangga 1 Pack',
      price: 12000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 18,
      img: 'gambar/Yakult-original-1-pack.jpg',
      name: 'Yakult Original 1 Pack',
      price: 12000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 19,
      img: 'gambar/green-tea-with-lemon.jpg',
      name: 'Green Tea With Lemon',
      price: 10000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 20,
      img: 'gambar/lemon-tea.jpg',
      name: 'Lemon Tea',
      price: 10000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
    {
      id: 21,
      img: 'gambar/lychee-tea.jpg',
      name: 'Lychee Tea',
      price: 15000,
      Desc: 'rasanya mantap, seger, dan cihuy',
      category: 'minuman'
    },
  ];

  allProducts = products;
  renderProducts(products);
}

function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.style.background = '#f0be9aff';
    card.style.padding = '10px';
    card.style.borderRadius = '8px';

    card.innerHTML = `
      <img src="${p.img}" style="width:100%">
      <h3>${p.name}</h3>
      <h3>Rp ${p.price.toLocaleString()}</h3>
      <p>${p.Desc}</p>
      <button>Keranjang</button>
      <button>Beli</button>
    `;

    const btnKeranjang = card.querySelectorAll('button')[0];
    const btnBeli = card.querySelectorAll('button')[1];

    btnKeranjang.onclick = () => addToCart(p);
    btnBeli.onclick = () => {
      addToCart(p);
      showPage('cart');
      renderCart();
    };

    grid.appendChild(card);
  });
}

/* ===================== SEARCH ===================== */
function bindSearch(){
  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(q));
    renderProducts(filtered);
  });
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
    row.innerHTML = `${item.name} - Rp ${item.price.toLocaleString()} <button>❌</button>`;

    row.querySelector('button').onclick = () => {
      state.cart.splice(i, 1);
      updateCartCount();
      renderCart();
    };

    wrap.appendChild(row);
  });

  totalEl.textContent = total.toLocaleString();
}

/* ===================== CHECKOUT ===================== */
document.getElementById('checkoutBtn').addEventListener('click',()=>{
  if(!state.user){
    alert('Silakan login dulu');
    location.href='login.html';
    return;
  }
  if(state.cart.length===0){
    alert('Keranjang kosong');
    return;
  }

  alert('Checkout berhasil (dummy)');
  state.cart=[];
  updateCartCount();
  renderCart();
});

/* ===================== HERO ===================== */
function bindHeroActions() {
  const heroOrderBtn = document.getElementById('heroOrderBtn');
  const heroMenuBtn = document.getElementById('heroMenuBtn');

  // Order Now → langsung ke halaman products
  if (heroOrderBtn) {
    heroOrderBtn.addEventListener('click', () => {
      showPage('products');
      document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Tombol play → scroll ke paket spesial
  if (heroMenuBtn) {
    heroMenuBtn.addEventListener('click', () => {
      showPage('home');
      document.getElementById('productToday').scrollIntoView({ behavior: 'smooth' });
    });
  }
}


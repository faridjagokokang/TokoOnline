import { initChat } from './chat.js';

/* ================= STATE ================= */
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  orders: JSON.parse(localStorage.getItem('orders')) || [],
};

let allProducts = [];

/* ================= ELEMENTS ================= */
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('[data-nav]');
const sideMenu = document.getElementById('sideMenu');
const hamburger = document.getElementById('hamburger');
const cartCount = document.getElementById('cartCount');
const loginBanner = document.getElementById('loginBanner');

/* ================= INIT ================= */
initChat();
renderLoginState();
updateCartCount();
bindNavigation();
bindHamburger();
loadDummyExclusiveTodayProducts();
loadDummyProducts();
loadProductCategories();
bindSearch();
bindHeroActions();
bindCheckout();
renderOrderList();
renderCart();

/* ================= NAVIGATION ================= */
function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');

  // Hero cuma tampil di home
  const hero = document.querySelector('.hero');
  if (hero) hero.style.display = id === 'home' ? 'grid' : 'none';

  sideMenu.classList.add('hidden');
}

function bindNavigation() {
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav;
      if (target) showPage(target);
      if (target === 'orders') renderOrderList();
      if (target === 'cart') renderCart();
    });
  });
}

function bindHamburger() {
  hamburger.onclick = () => sideMenu.classList.toggle('hidden');
}

/* ================= LOGIN ================= */
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

/* ================= CART ================= */
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.cart));
  updateCartCount();
}

function updateCartCount() {
  const totalQty = state.cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.textContent = totalQty;
}

function addToCart(product) {
  const item = state.cart.find(i => i.product.id === product.id);
  if (item) item.qty++;
  else state.cart.push({ product, qty: 1 });
  saveCart();
  alert('Ditambahkan ke keranjang');
}

document.getElementById('cartBtn').onclick = () => {
  showPage('cart');
  renderCart();
};

/* ================= PRODUCTS ================= */
function loadDummyExclusiveTodayProducts() {
  const products = [
    { id:1, img:'gambar/crispy-hemat.jpg', name:'Paket Crispy Hemat', price:25000, Desc:'1 pcs ayam + nasi' },
    { id:2, img:'gambar/keluarga-cuan.jpg', name:'Paket Keluarga', price:75000, Desc:'4 pcs ayam + nasi' },
    { id:3, img:'gambar/lezat.jpg', name:'Paket Lezat', price:20000, Desc:'1 pcs ayam + nasi + Red Velvet Coffee 1 + Yakult Mangga 1' },
    { id:4, img:'gambar/Segar-gigit.jpg', name:'Paket Segar Gigit', price:40000, Desc:'1 pcs burger + 1 Green Tea Lemon' },
    { id:5, img:'gambar/paket-frozeen-food.jpg', name:'Paket Frozen Food', price:60000, Desc:'1 pack ikan asin lendra + 1 pack ikan asin teri + 1 pack ikan asin keranjang + 1 pack sayap ayam potong' },
  
  ];
  renderCardList('productToday', products);
}

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
    renderCardList('productGrid', filtered);
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
    {
      id: 22,
      img: 'gambar/ayam-potong-kiloan.jpg',
      name: 'Ayam Potong Kiloan',
      price: 25000,
      Desc: 'Ayam potong kualitas terbaik',
      category: 'Frozen Food'
    },
    {
      id: 23,
      img: 'gambar/ayam-potong-utuh.jpg',
      name: 'Ayam Potong Utuh',
      price: 50000,
      Desc: 'Ayam potong utuh segar',
      category: 'Frozen Food'
    },
    {
      id: 24,
      img: 'gambar/sayap-ayam-beku.jpg',
      name: 'Sayap Ayam Beku',
      price: 15000,
      Desc: 'Sayap ayam beku segar',
      category: 'Frozen Food'
    }
  ];
  allProducts = products;
  renderCardList('productGrid', products);
}

function renderCardList(targetId, products) {
  const grid = document.getElementById(targetId);
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}">
      <div class="content">
        <h4>${p.name}</h4>
        <p class="price">Rp ${p.price.toLocaleString()}</p>
        <p>${p.Desc}</p>
        <div class="actions">
          <button class="btn-cart">Keranjang</button>
          <button class="btn-buy">Beli</button>
        </div>
      </div>
    `;
    card.querySelector('.btn-cart').onclick = () => addToCart(p);
    card.querySelector('.btn-buy').onclick = () => {
      addToCart(p);
      showPage('cart');
      renderCart();
    };
    grid.appendChild(card);
  });
}

/* ================= SEARCH ================= */
function bindSearch() {
  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(q));
    renderCardList('productGrid', filtered);
  });
}

/* ================= CART ================= */
function renderCart() {
  const wrap = document.getElementById('cartItems');
  const totalEl = document.getElementById('total');
  wrap.innerHTML = '';
  let total = 0;

  if (state.cart.length === 0) {
    wrap.innerHTML = `<p style="text-align:center; opacity:.6;">Keranjang kosong</p>`;
    totalEl.textContent = '0';
    return;
  }

  state.cart.forEach((item, index) => {
    const subtotal = item.product.price * item.qty;
    total += subtotal;

    const card = document.createElement('div');
    card.className = 'cart-card';
    card.innerHTML = `
      <img src="${item.product.img}" class="cart-img">
      <div class="cart-info">
        <b>${item.product.name}</b>
        <div class="cart-price">Rp ${item.product.price.toLocaleString()}</div>
        <div class="cart-actions">
          <button class="dec">−</button>
          <span>${item.qty}</span>
          <button class="inc">+</button>
          <button class="del">🗑</button>
        </div>
      </div>
    `;
    card.querySelector('.inc').onclick = () => { item.qty++; saveCart(); renderCart(); };
    card.querySelector('.dec').onclick = () => { item.qty--; if(item.qty<=0) state.cart.splice(index,1); saveCart(); renderCart(); };
    card.querySelector('.del').onclick = () => { state.cart.splice(index,1); saveCart(); renderCart(); };

    wrap.appendChild(card);
  });

  totalEl.textContent = total.toLocaleString();
}

/* ================= CHECKOUT ================= */
function bindCheckout() {
  const checkoutBtn = document.getElementById('submitOrder');
  if (!checkoutBtn) return;

  checkoutBtn.onclick = () => {
    if (state.cart.length === 0) { alert('Keranjang masih kosong!'); return; }

    const total = state.cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const name = document.getElementById('checkoutName').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    const note = document.getElementById('checkoutNote').value.trim();

    if (!name || !address) { alert('Nama dan alamat harus diisi!'); return; }

    const order = {
      id: Date.now(),
      customer: name,
      address,
      note,
      items: [...state.cart],
      total,
      date: new Date().toLocaleString(),
    };

    state.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(state.orders));

    state.cart = [];
    saveCart();
    renderCart();
    renderOrderList();
    showPage('home');

    const waNumber = '6287755466436';
    const waMessage = `Halo, saya ingin memesan:\n${order.items.map(i=>`${i.product.name} x${i.qty}`).join('\n')}\nTotal: Rp ${total.toLocaleString()}\nNama: ${name}\nAlamat: ${address}\nCatatan: ${note}`;
    const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(waURL, '_blank');
  };
}

/* ================= ORDER HISTORY ================= */
function renderOrderList() {
  const wrap = document.getElementById('orderList');
  wrap.innerHTML = '';

  if (state.orders.length === 0) {
    wrap.innerHTML = '(Belum ada pesanan)';
    return;
  }

  state.orders.slice().reverse().forEach(order => {
    const div = document.createElement('div');
    div.className = 'cart-card';
    div.innerHTML = `
      <b>Order ID: ${order.id}</b>
      <div>${order.date}</div>
      <div>Customer: ${order.customer}</div>
      <div>Items: ${order.items.map(i=>`${i.product.name} x${i.qty}`).join(', ')}</div>
      <div>Total: Rp ${order.total.toLocaleString()}</div>
    `;
    wrap.appendChild(div);
  });
}

/* ================= HERO ================= */
function bindHeroActions() {
  document.getElementById('heroOrderBtn')?.addEventListener('click', () => showPage('products'));
  document.getElementById('heroMenuBtn')?.addEventListener('click', () => showPage('home'));
}

/* ================= CHAT BOX ================= */
const chatBox = document.getElementById('chatBox');
document.getElementById('chatToggle').addEventListener('click', () => {
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
});
document.getElementById('closeChat').addEventListener('click', () => {
  chatBox.style.display = 'none';
});

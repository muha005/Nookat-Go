import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase конфигурациясы
const firebaseConfig = {
    apiKey: "AIzaSyCjsFILpJUY9K1gyJx-f8-9BkFu7T3-g-A",
    authDomain: "nookat-go-6fcf5.firebaseapp.com",
    projectId: "nookat-go-6fcf5",
    databaseURL: "https://nookat-go-6fcf5-default-rtdb.firebaseio.com/", 
    storageBucket: "nookat-go-6fcf5.firebasestorage.app",
    messagingSenderId: "423808562168",
    appId: "1:423808562168:web:7cabb4d7b6415d0fcd5c0d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Котормолор
const translations = {
    kg: {
        hero: "Ноокаттагы эң мыкты даамдар", 
        search: "Тамак издөө...", 
        add: "Себетке кошуу", 
        alertInfo: "⚠️ Атыңызды жана дарегиңизди жазыңыз!",
        copied: "Номер көчүрүлдү!"
    },
    ru: {
        hero: "Лучшая еда в Ноокате", 
        search: "Поиск еды...", 
        add: "В корзину", 
        alertInfo: "⚠️ Введите имя и адрес!",
        copied: "Номер скопирован!"
    }
};

// Продукттардын тизмеси
const products = [
    { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
    { id: 41, cat: "drinks", cafe: "Маркет", name_kg: "Coca-Cola 1л", name_ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" }
];

let cart = [];
let currentLang = 'kg';

// Глобалдык функциялар (HTML үчүн)
window.changeLang = (lang) => {
    currentLang = lang;
    const kgBtn = document.getElementById('lang-kg');
    const ruBtn = document.getElementById('lang-ru');
    
    if (lang === 'kg') {
        kgBtn.classList.add('active');
        ruBtn.classList.remove('active');
    } else {
        ruBtn.classList.add('active');
        kgBtn.classList.remove('active');
    }
    
    document.getElementById('hero-title').innerText = translations[currentLang].hero;
    document.getElementById('searchInput').placeholder = translations[currentLang].search;
    window.renderMenu();
};

window.renderMenu = (data = products) => {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="food-card" onclick="window.openProduct(${p.id})">
            <img src="${p.img}">
            <div class="card-info">
                <h3>${currentLang === 'kg' ? p.name_kg : p.name_ru}</h3>
                <span class="card-price">${p.price} сом</span>
            </div>
        </div>
    `).join('');
};

window.openProduct = (id) => {
    const p = products.find(x => x.id === id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalName').innerText = currentLang === 'kg' ? p.name_kg : p.name_ru;
    const addBtn = document.getElementById('addBtnAction');
    addBtn.innerText = `${translations[currentLang].add} - ${p.price} сом`;
    addBtn.onclick = () => { 
        cart.push(p); 
        updateCartUI(); 
        window.closeProduct(); 
    };
    document.getElementById('productModal').style.display = 'flex';
};

function updateCartUI() {
    const bar = document.getElementById('cartBar');
    const count = document.getElementById('cartCount');
    const sum = document.getElementById('cartSum');
    
    if (cart.length > 0) {
        bar.style.display = 'flex';
        count.innerText = cart.length;
        const total = cart.reduce((a, b) => a + b.price, 0);
        sum.innerText = total;
        
        // Модалдык себет ичиндеги сумманы жаңылоо
        if (document.getElementById('finalSum')) {
            window.calculateTotal();
        }
    } else { 
        bar.style.display = 'none'; 
    }
}

window.calculateTotal = () => {
    let subtotal = cart.reduce((a, b) => a + b.price, 0);
    let delivery = parseInt(document.getElementById('deliveryType').value) || 0;
    document.getElementById('finalSum').innerText = subtotal + delivery;
};

window.checkout = async () => {
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    const finalSum = document.getElementById('finalSum').innerText;

    if (!name || !address) {
        alert(translations[currentLang].alertInfo);
        return;
    }

    const itemsText = cart.map(i => `${currentLang === 'kg' ? i.name_kg : i.name_ru}`).join(", ");

    try {
        // Firebase базасына сактоо
        const ordersRef = ref(database, 'orders');
        const newOrderRef = push(ordersRef);
        await set(newOrderRef, {
            customerName: name,
            address: address,
            items: itemsText,
            totalPrice: finalSum,
            paymentMethod: payment,
            status: "pending",
            time: new Date().toLocaleString()
        });
        
        // WhatsApp ачуу
        let phone = "996556616174"; 
        let message = `🚀 *ЖАҢЫ ЗАКАЗ (Nookat Go)*\n\n👤 *Кардар:* ${name}\n📍 *Дарек:* ${address}\n🍴 *Тамактар:* ${itemsText}\n💳 *Төлөм:* ${payment}\n💰 *Жалпы сумма:* ${finalSum} сом`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
        
        // Тазалоо
        cart = [];
        updateCartUI();
        window.closeCart();
        alert("Заказ кабыл алынды!");
    } catch (e) { 
        alert("Ката кетти: " + e.message); 
    }
};

window.searchFood = () => {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name_kg.toLowerCase().includes(term) || 
        p.name_ru.toLowerCase().includes(term) ||
        p.cafe.toLowerCase().includes(term)
    );
    window.renderMenu(filtered);
};

window.filterMenu = (category, event) => {
    // Активдүү кнопканы белгилөө
    document.querySelectorAll('.cat-item').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        window.renderMenu(products);
    } else {
        const filtered = products.filter(p => p.cat === category);
        window.renderMenu(filtered);
    }
};

window.copyNumber = () => {
    const number = "0556616174";
    navigator.clipboard.writeText(number).then(() => {
        alert(translations[currentLang].copied);
    });
};

window.closeProduct = () => { document.getElementById('productModal').style.display = 'none'; };
window.closeCart = () => { document.getElementById('cartModal').style.display = 'none'; };
window.showCart = () => { 
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span>${currentLang === 'kg' ? item.name_kg : item.name_ru}</span>
            <span><b>${item.price} сом</b></span>
        </div>
    `).join('');
    
    document.getElementById('cartModal').style.display = 'flex';
    window.calculateTotal();
};

// Баштапкы ишке киргизүү
window.renderMenu();

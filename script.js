import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// 1. Firebase Конфигурациясы (Сиздин базаңыздын маалыматтары)
const firebaseConfig = {
    apiKey: "AIzaSyCjsFILpJUY9K1gyJx-f8-9BkFu7T3-g-A",
    authDomain: "nookat-go-6fcf5.firebaseapp.com",
    projectId: "nookat-go-6fcf5",
    databaseURL: "https://nookat-go-6fcf5-default-rtdb.firebaseio.com/",
    appId: "1:423808562168:web:7cabb4d7b6415d0fcd5c0d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. 13 ТАМАК - Эң жогорку сапаттагы маалыматтар
const foods = [
    { id: 1, cat: "national", kg: "Ош ашы (Плов)", ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
    { id: 2, cat: "national", kg: "Чоюлма Лагман", ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
    { id: 3, cat: "fastfood", kg: "Чизбургер XL", ru: "Чизбургер XL", price: 180, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 4, cat: "fastfood", kg: "Тоок Шаурма", ru: "Куриная Шаурма", price: 160, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
    { id: 5, cat: "national", kg: "Манты (5 шт)", ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a" },
    { id: 6, cat: "fastfood", kg: "Картофель Фри", ru: "Картофель Фри", price: 100, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
    { id: 7, cat: "national", kg: "Казан Кебаб", ru: "Казан Кебаб", price: 350, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143" },
    { id: 8, cat: "fastfood", kg: "Пицца Ассорти", ru: "Пицца Ассорти", price: 450, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { id: 9, cat: "national", kg: "Самсы Тандыр", ru: "Самсы Тандыр", price: 80, img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce99" },
    { id: 10, cat: "fastfood", kg: "Хот-Дог XXL", ru: "Хот-Дог XXL", price: 120, img: "https://images.unsplash.com/photo-1541234327333-5586632001fe" },
    { id: 11, cat: "drinks", kg: "Coca-Cola 1л", ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" },
    { id: 12, cat: "drinks", kg: "Чай Кара/Жашыл", ru: "Чай Черный/Зеленый", price: 30, img: "https://images.unsplash.com/photo-1544787210-2211d7c928c7" },
    { id: 13, cat: "drinks", kg: "Максым Шоро 0.5л", ru: "Максым Шоро 0.5л", price: 60, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd" }
];

let cart = [];
let lang = 'kg';

// 3. Менюну чыгаруу (Катасыз)
window.renderMenu = (items = foods) => {
    const grid = document.querySelector('.menu-grid') || document.getElementById('menuGrid');
    if (!grid) return;
    grid.innerHTML = items.map(f => `
        <div class="food-card" onclick="addToCart(${f.id})">
            <img src="${f.img}" alt="${f.kg}">
            <div class="food-info">
                <h3>${lang === 'kg' ? f.kg : f.ru}</h3>
                <div class="price">${f.price} сом</div>
            </div>
        </div>
    `).join('');
};

// 4. Себетке кошуу жана жаңылоо
window.addToCart = (id) => {
    const product = foods.find(x => x.id === id);
    if (product) {
        cart.push(product);
        updateCartBar();
    }
};

function updateCartBar() {
    const sum = cart.reduce((a, b) => a + b.price, 0);
    const bar = document.getElementById('cartBar');
    if (bar) {
        bar.style.display = cart.length > 0 ? 'flex' : 'none';
        document.getElementById('cartCount').innerText = cart.length;
        document.getElementById('cartSum').innerText = sum;
    }
}

// 5. Себетти ачуу жана башкаруу
window.openCart = () => {
    document.getElementById('cartModal').style.display = 'flex';
    const list = document.getElementById('cartItemsList');
    list.innerHTML = cart.map((f, i) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span style="font-size:14px;">${lang === 'kg' ? f.kg : f.ru}</span>
            <b>${f.price}с <i class="fas fa-trash" style="color:red; margin-left:10px;" onclick="removeFromCart(${i})"></i></b>
        </div>
    `).join('');
    calculateTotal();
};

window.removeFromCart = (i) => {
    cart.splice(i, 1);
    if (cart.length === 0) closeCart(); else openCart();
    updateCartBar();
};

window.calculateTotal = () => {
    const sub = cart.reduce((a, b) => a + b.price, 0);
    const del = parseInt(document.getElementById('delivType').value || 0);
    document.getElementById('finalPrice').innerText = sub + del;
};

// 6. ЗАКАЗ ЖӨНӨТҮҮ - WHATSAPP + FIREBASE (Телефон үчүн оптималдаштырылган)
window.sendOrder = async () => {
    const name = document.getElementById('userName').value.trim();
    const addr = document.getElementById('userAddress').value.trim();
    const pay = document.getElementById('payMethod').value;
    const final = document.getElementById('finalPrice').innerText;

    if (!name || !addr) return alert("Атыңызды жана дарегиңизди жазыңыз!");

    const itemsStr = cart.map(f => f.kg).join(", ");
    const msg = `🚀 *ЖАҢЫ ЗАКАЗ*\n👤 *Кардар:* ${name}\n📍 *Дарек:* ${addr}\n🍴 *Тамактар:* ${itemsStr}\n💳 *Төлөм:* ${pay}\n💰 *Сумма:* ${final} сом`;

    const waUrl = `https://api.whatsapp.com/send?phone=996556616174&text=${encodeURIComponent(msg)}`;

    // 1. Бөгөттөөсүз WhatsApp-ка өтүү
    window.location.href = waUrl;

    // 2. Фондо Firebase-ге жазуу
    try {
        const ordersRef = ref(db, 'orders');
        await set(push(ordersRef), {
            name, address: addr, items: itemsStr, total: final, payment: pay, 
            time: serverTimestamp()
        });
    } catch (e) { console.log("Database write skipped"); }

    // Себетти тазалоо
    cart = []; updateCartBar(); closeCart();
};

// 7. Издөө жана Фильтр
window.searchFood = () => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    renderMenu(foods.filter(f => f.kg.toLowerCase().includes(q) || f.ru.toLowerCase().includes(q)));
};

window.filterMenu = (c, e) => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderMenu(c === 'all' ? foods : foods.filter(f => f.cat === c));
};

// Кошумча функциялар
window.toggleMbank = (v) => document.getElementById('mbank-info').style.display = v === 'MBANK' ? 'block' : 'none';
window.closeCart = () => document.getElementById('cartModal').style.display = 'none';
window.copyPhone = () => { navigator.clipboard.writeText("556616174"); alert("Көчүрүлдү!"); };

// Ишти баштоо
renderMenu();

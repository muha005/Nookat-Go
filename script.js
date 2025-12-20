import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCjsFILpJUY9K1gyJx-f8-9BkFu7T3-g-A",
    authDomain: "nookat-go-6fcf5.firebaseapp.com",
    projectId: "nookat-go-6fcf5",
    databaseURL: "https://nookat-go-6fcf5-default-rtdb.firebaseio.com/",
    appId: "1:423808562168:web:7cabb4d7b6415d0fcd5c0d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Тез жүктөө үчүн сүрөттөрдүн өлчөмүн кичирейтип коштум (?w=400&q=80)
const foods = [
    { id: 1, cat: "national", kg: "Ош ашы (Плов)", ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
    { id: 2, cat: "national", kg: "Чоюлма Лагман", ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=400&q=80" },
    { id: 3, cat: "fastfood", kg: "Чизбургер XL", ru: "Чизбургер XL", price: 180, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { id: 4, cat: "fastfood", kg: "Тоок Шаурма", ru: "Куриная Шаурма", price: 160, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80" },
    { id: 5, cat: "national", kg: "Манты (5 шт)", ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?w=400&q=80" },
    { id: 6, cat: "fastfood", kg: "Картофель Фри", ru: "Картофель Фри", price: 100, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
    { id: 7, cat: "national", kg: "Казан Кебаб", ru: "Казан Кебаб", price: 350, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80" },
    { id: 8, cat: "fastfood", kg: "Пицца Ассорти", ru: "Пицца Ассорти", price: 450, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" },
    { id: 9, cat: "national", kg: "Самсы Тандыр", ru: "Самсы Тандыр", price: 80, img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce99?w=400&q=80" },
    { id: 10, cat: "fastfood", kg: "Хот-Дог XXL", ru: "Хот-Дог XXL", price: 120, img: "https://images.unsplash.com/photo-1541234327333-5586632001fe?w=400&q=80" },
    { id: 11, cat: "drinks", kg: "Coca-Cola 1л", ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
    { id: 12, cat: "drinks", kg: "Чай Кара/Жашыл", ru: "Чай Черный/Зеленый", price: 30, img: "https://images.unsplash.com/photo-1544787210-2211d7c928c7?w=400&q=80" },
    { id: 13, cat: "drinks", kg: "Максым Шоро 0.5л", ru: "Максым Шоро 0.5л", price: 60, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" }
];

let cart = [];
let lang = 'kg';
let selectedFood = null;

// Эгер сүрөт иштебей калса, бош калбаш үчүн запас сүрөт коюу функциясы
const noImg = "https://via.placeholder.com/400x300?text=Nookat+Go";

window.renderMenu = (items = foods) => {
    const grid = document.querySelector('.menu-grid') || document.getElementById('menu-grid');
    if (!grid) return;
    grid.innerHTML = items.map(f => `
        <div class="food-card" onclick="addToCart(${f.id})">
            <img src="${f.img}" onerror="this.src='${noImg}'" alt="${f.kg}">
            <div class="food-info">
                <h3>${lang === 'kg' ? f.kg : f.ru}</h3>
                <div class="food-price">${f.price} сом</div>
            </div>
        </div>
    `).join('');
};

window.addToCart = (id) => {
    selectedFood = foods.find(x => x.id === id);
    if (selectedFood) {
        document.getElementById('prevImg').src = selectedFood.img;
        document.getElementById('prevImg').onerror = function() { this.src = noImg; };
        document.getElementById('prevName').innerText = lang === 'kg' ? selectedFood.kg : selectedFood.ru;
        document.getElementById('prevPrice').innerText = selectedFood.price + " сом";
        
        const previewModal = document.getElementById('foodPreviewModal');
        if (previewModal) previewModal.style.display = 'flex';
    }
};

window.confirmAdd = () => {
    if (selectedFood) {
        cart.push({...selectedFood, cartId: Date.now()});
        updateCartBar();
        closePreview();
    }
};

window.closePreview = () => {
    const previewModal = document.getElementById('foodPreviewModal');
    if (previewModal) previewModal.style.display = 'none';
    selectedFood = null;
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

window.openCart = () => {
    document.getElementById('cartModal').style.display = 'flex';
    const list = document.getElementById('cartItemsList');
    list.innerHTML = cart.map((f, i) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span style="font-size:14px;">${lang === 'kg' ? f.kg : f.ru}</span>
            <b>${f.price}с <i class="fas fa-trash" style="color:red; margin-left:10px; cursor:pointer;" onclick="removeFromCart(${i})"></i></b>
        </div>
    `).join('');
    window.calculateTotal();
};

window.removeFromCart = (i) => {
    cart.splice(i, 1);
    if (cart.length === 0) closeCart(); else openCart();
    updateCartBar();
};

window.calculateTotal = () => {
    const sub = cart.reduce((a, b) => a + b.price, 0);
    const delInput = document.getElementById('delivery'); // HTML-де 'delivery' деп турат
    const del = delInput ? parseInt(delInput.value || 0) : 0;
    const finalSumElement = document.getElementById('finalSum'); // Сиздин HTML-де 'finalSum'
    if (finalSumElement) finalSumElement.innerText = sub + del;
};

window.sendOrder = async () => {
    const n = document.getElementById('uName').value.trim();
    const a = document.getElementById('uAddr').value.trim();
    const p = document.getElementById('payment').value;
    const s = document.getElementById('finalSum').innerText;

    if (!n || !a) return alert("Атыңызды жана дарегиңизди жазыңыз!");

    const itemsText = cart.map(f => f.kg).join(", ");
    const msg = `🚀 *ЖАҢЫ ЗАКАЗ*\n👤 *Аты:* ${n}\n📍 *Дарек:* ${a}\n🍴 *Тамактар:* ${itemsText}\n💳 *Төлөм:* ${p}\n💰 *Сумма:* ${s} сом`;

    const waUrl = `https://api.whatsapp.com/send?phone=996556616174&text=${encodeURIComponent(msg)}`;
    window.location.assign(waUrl);

    try {
        await set(push(ref(db, 'orders')), {
            name: n, addr: a, items: itemsText, sum: s, pay: p,
            timestamp: serverTimestamp()
        });
    } catch (e) { console.log("Firebase error ignored"); }

    cart = []; updateCartBar(); closeCart();
};

window.searchFood = () => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    renderMenu(foods.filter(f => f.kg.toLowerCase().includes(q) || f.ru.toLowerCase().includes(q)));
};

window.filterMenu = (c, e) => {
    document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderMenu(c === 'all' ? foods : foods.filter(f => f.cat === c));
};

window.toggleMbank = (v) => {
    const mbInfo = document.getElementById('mbankBox'); // Сиздин HTML-де 'mbankBox'
    if(mbInfo) mbInfo.style.display = v === 'MBANK' ? 'block' : 'none';
};

window.closeCart = () => document.getElementById('cartModal').style.display = 'none';
window.copyMB = () => { 
    navigator.clipboard.writeText("0556616174"); 
    alert("Номер көчүрүлдү!"); 
};

// Тилди алмаштыруу
window.setLang = (l) => {
    lang = l;
    document.getElementById('l-kg').className = l === 'kg' ? 'active' : '';
    document.getElementById('l-ru').className = l === 'ru' ? 'active' : '';
    document.getElementById('h-title').innerText = l === 'kg' ? "Ноокаттагы эң мыкты даамдар" : "Лучшая еда в Ноокате";
    renderMenu();
};

// Ишти баштоо
renderMenu();

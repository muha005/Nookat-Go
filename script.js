import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// 1. Firebase Конфигурациясы
const firebaseConfig = {
    apiKey: "AIzaSyCjsFILpJUY9K1gyJx-f8-9BkFu7T3-g-A",
    authDomain: "nookat-go-6fcf5.firebaseapp.com",
    projectId: "nookat-go-6fcf5",
    databaseURL: "https://nookat-go-6fcf5-default-rtdb.firebaseio.com/",
    appId: "1:423808562168:web:7cabb4d7b6415d0fcd5c0d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. Тамактар базасы (8 даам)
const foods = [
    { id: 1, cat: "national", kg: "Ош ашы (Плов)", ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
    { id: 2, cat: "national", kg: "Чоюлма Лагман", ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
    { id: 3, cat: "fastfood", kg: "Чизбургер XL", ru: "Чизбургер XL", price: 180, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 4, cat: "fastfood", kg: "Тоок Шаурма", ru: "Куриная Шаурма", price: 160, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
    { id: 5, cat: "national", kg: "Манты (5 шт)", ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a" },
    { id: 6, cat: "fastfood", kg: "Картофель Фри", ru: "Картофель Фри", price: 100, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
    { id: 7, cat: "drinks", kg: "Coca-Cola 1л", ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" },
    { id: 8, cat: "drinks", kg: "Чай (Кара/Жашыл)", ru: "Чай (Черный/Зеленый)", price: 30, img: "https://images.unsplash.com/photo-1544787210-2211d7c928c7" }
];

let cart = [];
let lang = 'kg';

// 3. Менюну чыгаруу функциясы
window.render = (items = foods) => {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    grid.innerHTML = items.map(f => `
        <div class="food-card" onclick="add(${f.id})">
            <img src="${f.img}" alt="${f.kg}">
            <div class="food-info">
                <h3>${lang === 'kg' ? f.kg : f.ru}</h3>
                <div class="food-price">${f.price} сом</div>
            </div>
        </div>
    `).join('');
};

// 4. Себетке кошуу
window.add = (id) => {
    const f = foods.find(x => x.id === id);
    if (f) {
        cart.push({...f, cartId: Date.now()});
        updateBar();
    }
};

// 5. Себеттин баскычын жаңылоо
function updateBar() {
    const sum = cart.reduce((a, b) => a + b.price, 0);
    const bar = document.getElementById('cartBar');
    if (bar) {
        bar.style.display = cart.length > 0 ? 'flex' : 'none';
        document.getElementById('cartCount').innerText = cart.length;
        document.getElementById('cartSum').innerText = sum;
    }
}

// 6. Себетти ачуу (Модал)
window.showCart = () => {
    document.getElementById('cartModal').style.display = 'flex';
    const list = document.getElementById('cartItemsList');
    list.innerHTML = cart.map((f, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span style="font-size:14px;">${lang === 'kg' ? f.kg : f.ru}</span>
            <b>${f.price}с <i class="fas fa-trash" style="color:#e74c3c; margin-left:10px; cursor:pointer;" onclick="remove(${i})"></i></b>
        </div>
    `).join('');
    window.calcTotal();
};

window.remove = (i) => {
    cart.splice(i, 1);
    if (cart.length === 0) {
        window.closeCart();
    } else {
        window.showCart();
    }
    updateBar();
};

// 7. Жалпы сумманы эсептөө
window.calcTotal = () => {
    const sub = cart.reduce((a, b) => a + b.price, 0);
    const del = parseInt(document.getElementById('delivery').value) || 0;
    document.getElementById('finalSum').innerText = sub + del;
};

// 8. ЗАКАЗДЫ ЖӨНӨТҮҮ (Базага жазуу + WhatsApp)
window.sendOrder = async () => {
    const n = document.getElementById('uName').value.trim();
    const a = document.getElementById('uAddr').value.trim();
    const p = document.getElementById('payment').value;
    const s = document.getElementById('finalSum').innerText;

    if (!n || !a) {
        alert(lang === 'kg' ? "Сураныч, атыңызды жана дарегиңизди жазыңыз!" : "Пожалуйста, введите имя и адрес!");
        return;
    }

    const itemsText = cart.map(f => `${lang === 'kg' ? f.kg : f.ru}`).join(", ");
    
    // WhatsApp тексти
    const msg = `🚀 *ЖАҢЫ ЗАКАЗ (Nookat Go)*\n\n` +
                `👤 *Кардар:* ${n}\n` +
                `📍 *Дарек:* ${a}\n` +
                `🍴 *Тамактар:* ${itemsText}\n` +
                `💳 *Төлөм:* ${p}\n` +
                `💰 *Жалпы:* ${s} сом`;

    try {
        // 1. Firebase'ге жөнөтүү
        const ordersRef = ref(db, 'orders');
        await set(push(ordersRef), {
            customerName: n,
            address: a,
            items: itemsText,
            totalPrice: s,
            paymentMethod: p,
            timestamp: serverTimestamp()
        });

        // 2. Ийгиликтүү болсо, WhatsApp'ты ачуу
        const waUrl = `https://wa.me/996556616174?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');

        // 3. Себетти тазалоо
        cart = [];
        updateBar();
        window.closeCart();
        alert(lang === 'kg' ? "Заказыңыз кабыл алынды!" : "Ваш заказ принят!");

    } catch (error) {
        console.error("Ката кетти:", error);
        alert("Ката: " + error.message);
    }
};

// Жардамчы функциялар
window.setLang = (l) => {
    lang = l;
    document.getElementById('l-kg').className = l === 'kg' ? 'active' : '';
    document.getElementById('l-ru').className = l === 'ru' ? 'active' : '';
    window.render();
};

window.toggleMbank = (v) => {
    document.getElementById('mbankBox').style.display = v === 'MBANK' ? 'block' : 'none';
};

window.closeCart = () => {
    document.getElementById('cartModal').style.display = 'none';
};

window.copyMB = () => {
    navigator.clipboard.writeText("0556616174");
    alert("0556616174 көчүрүлдү!");
};

window.searchFood = () => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const filtered = foods.filter(f => f.kg.toLowerCase().includes(q) || f.ru.toLowerCase().includes(q));
    window.render(filtered);
};

window.filterMenu = (c, e) => {
    document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    window.render(c === 'all' ? foods : foods.filter(f => f.cat === c));
};

// Сайт ачылганда иштетүү
window.render();


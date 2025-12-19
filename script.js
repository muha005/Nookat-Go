import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

const translations = {
    kg: {
        hero: "Ноокаттагы эң мыкты даамдар", search: "Тамак издөө...", 
        add: "Себетке кошуу", alertInfo: "⚠️ Атыңызды жана дарегиңизди жазыңыз!",
        copied: "Номер көчүрүлдү!"
    },
    ru: {
        hero: "Лучшая еда в Ноокате", search: "Поиск еды...", 
        add: "В корзину", alertInfo: "⚠️ Введите имя и адрес!",
        copied: "Номер скопирован!"
    }
};

const products = [
    { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
    { id: 41, cat: "drinks", cafe: "Маркет", name_kg: "Coca-Cola 1л", name_ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" }
];

let cart = [];
let currentLang = 'kg';

window.changeLang = (lang) => {
    currentLang = lang;
    renderMenu();
};

window.renderMenu = (data = products) => {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="food-card" onclick="openProduct(${p.id})">
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
    addBtn.onclick = () => { cart.push(p); updateCartUI(); closeProduct(); };
    document.getElementById('productModal').style.display = 'flex';
};

function updateCartUI() {
    const bar = document.getElementById('cartBar');
    if (cart.length > 0) {
        bar.style.display = 'flex';
        document.getElementById('cartCount').innerText = cart.length;
        document.getElementById('cartSum').innerText = cart.reduce((a, b) => a + b.price, 0);
    } else { bar.style.display = 'none'; }
}

window.checkout = async () => {
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;

    if (!name || !address) {
        alert(translations[currentLang].alertInfo);
        return;
    }

    const total = document.getElementById('finalSum').innerText;
    const itemsText = cart.map(i => `${i.name_kg}`).join(", ");

    // FIREBASE'ГЕ ЖАЗУУ
    try {
        const ordersRef = ref(database, 'orders');
        const newOrderRef = push(ordersRef);
        await set(newOrderRef, {
            customerName: name,
            address: address,
            items: itemsText,
            totalPrice: total,
            paymentMethod: payment,
            status: "pending",
            time: new Date().toLocaleString()
        });
        
        // WHATSAPP АЧУУ
        let phone = "996556616174"; 
        let message = `🚀 ЗАКАЗ: ${name}\n📍 ДАРЕК: ${address}\n🍴 ТАМАКТАР: ${itemsText}\n💰 СУММА: ${total} сом`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
        
        cart = []; // Себетти тазалоо
        updateCartUI();
        closeCart();
    } catch (e) { alert("Ката кетти: " + e.message); }
};

window.closeProduct = () => { document.getElementById('productModal').style.display = 'none'; };
window.closeCart = () => { document.getElementById('cartModal').style.display = 'none'; };
window.showCart = () => { document.getElementById('cartModal').style.display = 'flex'; };

renderMenu();

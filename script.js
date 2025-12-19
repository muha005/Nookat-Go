// 0. FIREBASE ТУТАШТЫРУУ
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

// 1. ТИЛДЕР ЖАНА КАТЕГОРИЯЛАР
const translations = {
    kg: {
        hero: "Ноокаттагы эң мыкты даамдар", search: "Тамак же кафе издөө...", 
        all: "Баары", national: "Улуттук", turkish: "Түрк", pizza: "Пицца", fastfood: "Фастфуд", grill: "Шашлык", drinks: "Суулар",
        add: "Себетке кошуу", total: "Жалпы:", view: "СЕБЕТ", empty: "Себетиңиз бош",
        alertInfo: "⚠️ Сураныч, атыңызды жана дарегиңизди жазыңыз!",
        copied: "Номер көчүрүлдү! Эми Мбанкка кирип чаптаңыз."
    },
    ru: {
        hero: "Лучшая еда в Ноокате", search: "Поиск еды или кафе...", 
        all: "Все", national: "Нац. кухня", turkish: "Турецкая", pizza: "Пицца", fastfood: "Фастфуд", grill: "Шашлык", drinks: "Напитки",
        add: "В корзину", total: "Итого:", view: "КОРЗИНА", empty: "Корзина пуста",
        alertInfo: "⚠️ Пожалуйста, введите имя и адрес!",
        copied: "Номер скопирован! Теперь вставьте его в Мбанк."
    }
};

// 2. ТАМАКТАРДЫН БАЗАСЫ
const products = [
    { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
    { id: 3, cat: "national", cafe: "Ордо", name_kg: "Манты (5 даана)", name_ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76" },
    { id: 4, cat: "national", cafe: "Ак-Тилек", name_kg: "Куурдак", name_ru: "Куурдак", price: 350, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143" },
    { id: 5, cat: "national", cafe: "Ордо", name_kg: "Босо Лагман", name_ru: "Босо Лагман", price: 230, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
    { id: 6, cat: "national", cafe: "Алай", name_kg: "Гүльчетай", name_ru: "Гульчетай", price: 210, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641" },
    { id: 7, cat: "national", cafe: "Ордо", name_kg: "Шорпо", name_ru: "Шорпо", price: 190, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
    { id: 8, cat: "national", cafe: "Ак-Тилек", name_kg: "Самсы (Тандыр)", name_ru: "Самсы (Тандыр)", price: 80, img: "https://images.unsplash.com/photo-1601050690597-df056fb36792" },
    { id: 9, cat: "turkish", cafe: "Istanbul", name_kg: "Адана Кебаб", name_ru: "Адана Кебаб", price: 380, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
    { id: 10, cat: "turkish", cafe: "Ankara", name_kg: "Пиде менен эт", name_ru: "Пиде с мясом", price: 280, img: "https://images.unsplash.com/photo-1564936281441-118835849887" },
    { id: 11, cat: "turkish", cafe: "Istanbul", name_kg: "Искандер Кебаб", name_ru: "Искандер Кебаб", price: 420, img: "https://images.unsplash.com/photo-1626074353765-517a681e40be" },
    { id: 12, cat: "turkish", cafe: "Ankara", name_kg: "Түрк чорбасы", name_ru: "Турецкий суп", price: 150, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
    { id: 17, cat: "pizza", cafe: "Pizza Bell", name_kg: "Маргарита", name_ru: "Маргарита", price: 450, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38" },
    { id: 18, cat: "pizza", cafe: "Pizza Bell", name_kg: "Пепперони", name_ru: "Пепперони", price: 550, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e" },
    { id: 25, cat: "fastfood", cafe: "Burger House", name_kg: "Чикен Бургер", name_ru: "Чикен Бургер", price: 160, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 33, cat: "grill", cafe: "Шашлык Сити", name_kg: "Кой эти шашлык", name_ru: "Баранина шашлык", price: 180, img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
    { id: 41, cat: "drinks", cafe: "Маркет", name_kg: "Coca-Cola 1л", name_ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" }
    // ... башка тамактарды мурунку тизмеден ушул жерге кошсоңуз болот
];

let cart = [];
let currentLang = 'kg';

// 3. ФУНКЦИЯЛАР (Глобалдык кылуу үчүн window-го байлайбыз)
window.changeLang = (lang) => {
    currentLang = lang;
    document.querySelectorAll('.lang-selector span').forEach(s => s.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    document.getElementById('hero-title').innerText = translations[lang].hero;
    document.getElementById('searchInput').placeholder = translations[lang].search;
    renderMenu();
    updateCartUI();
};

function renderMenu(data = products) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="food-card" onclick="openProduct(${p.id})">
            <img src="${p.img}" loading="lazy">
            <div class="card-info">
                <small class="cafe-tag">${p.cafe}</small>
                <h3>${currentLang === 'kg' ? p.name_kg : p.name_ru}</h3>
                <span class="card-price">${p.price} сом</span>
            </div>
        </div>
    `).join('');
}

window.openProduct = (id) => {
    const p = products.find(x => x.id === id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalName').innerText = currentLang === 'kg' ? p.name_kg : p.name_ru;
    document.getElementById('modalDesc').innerText = "Ноокаттын эң даамдуу тамактарынан. Сапаттуу жана тез жеткирүү.";
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
    } else {
        bar.style.display = 'none';
    }
}

window.showCart = () => {
    document.getElementById('cartModal').style.display = 'flex';
    const list = document.getElementById('cartList');
    list.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
            <div><strong>${currentLang === 'kg' ? item.name_kg : item.name_ru}</strong><br><small>${item.price} с</small></div>
            <span onclick="removeFromCart(${index})" style="color:red; font-weight:bold; cursor:pointer; padding: 5px 10px;">✕</span>
        </div>
    `).join('');
    calculateTotal();
};

window.calculateTotal = () => {
    let subtotal = cart.reduce((a, b) => a + b.price, 0);
    let delivery = parseInt(document.getElementById('deliveryType').value) || 0;
    document.getElementById('finalSum').innerText = (subtotal + delivery);
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
    showCart();
    if(cart.length === 0) closeCart();
};

window.filterMenu = (cat, event) => {
    document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('active'));
    if(event) event.target.classList.add('active');
    renderMenu(cat === 'all' ? products : products.filter(p => p.cat === cat));
};

window.searchFood = () => {
    let val = document.getElementById('searchInput').value.toLowerCase();
    renderMenu(products.filter(p => 
        p.name_kg.toLowerCase().includes(val) || 
        p.name_ru.toLowerCase().includes(val) || 
        p.cafe.toLowerCase().includes(val)
    ));
};

window.copyNumber = () => {
    const number = "0556616174";
    navigator.clipboard.writeText(number).then(() => {
        alert(translations[currentLang].copied);
    });
};

window.checkout = async () => {
    if(cart.length === 0) return;
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    const deliveryValue = document.getElementById('deliveryType').value;

    if (!name || !address) {
        alert(translations[currentLang].alertInfo);
        return;
    }

    const total = document.getElementById('finalSum').innerText;
    const itemsText = cart.map(i => `${currentLang === 'kg' ? i.name_kg : i.name_ru}`).join(", ");

    // --- FIREBASE'ГЕ ЖАЗУУ ---
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
    } catch (e) {
        console.error("Firebase error:", e);
    }

    // --- WHATSAPP ---
    let phone = "996556616174"; 
    let deliveryZone = deliveryValue == "0" ? "Ноокат ичи (0с)" : "Шаар сырты (150с)";
    let mbankNote = payment === "MBANK" ? `\n⚠️ *ЭСКЕРТҮҮ:* Мбанктан төлөп бүткөн соң, чекти жибериңиз!\n` : "";

    let message = `🚀 *ЖАҢЫ ЗАКАЗ: NOOKAT GO*\n👤 КАРДАР: ${name.toUpperCase()}\n📍 ДАРЕК: ${address}\n🚚 ЗОНА: ${deliveryZone}\n💳 ТӨЛӨМ: ${payment}\n🍴 ТАМАКТАР: ${itemsText}\n💰 ЖАЛПЫ: ${total} сом${mbankNote}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
};

window.closeProduct = () => { document.getElementById('productModal').style.display = 'none'; };
window.closeCart = () => { document.getElementById('cartModal').style.display = 'none'; };

// Ишке киргизүү
renderMenu();




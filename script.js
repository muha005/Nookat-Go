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
    { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=500" },
    { id: 3, cat: "national", cafe: "Ордо", name_kg: "Манты (5 даана)", name_ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?w=500" },
    { id: 4, cat: "national", cafe: "Ак-Тилек", name_kg: "Куурдак", name_ru: "Куурдак", price: 350, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500" },
    { id: 11, cat: "turkish", cafe: "Ankara", name_kg: "Донер (Лаваш)", name_ru: "Донер (Лаваш)", price: 180, img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500" },
    { id: 18, cat: "pizza", cafe: "Pizza Bell", name_kg: "Пепперони", name_ru: "Пепперони", price: 550, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 25, cat: "fastfood", cafe: "Burger House", name_kg: "Классикалык Бургер", name_ru: "Классический Бургер", price: 150, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 41, cat: "drinks", cafe: "Маркет", name_kg: "Кола 1л", name_ru: "Кола 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" }
];

let cart = [];
let currentLang = 'kg';

// 3. ФУНКЦИЯЛАР
function changeLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-selector span').forEach(s => s.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    document.getElementById('hero-title').innerText = translations[lang].hero;
    document.getElementById('searchInput').placeholder = translations[lang].search;
    renderMenu();
    updateCartUI();
}

function renderMenu(data = products) {
    const grid = document.getElementById('menu-grid');
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

function openProduct(id) {
    const p = products.find(x => x.id === id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalName').innerText = currentLang === 'kg' ? p.name_kg : p.name_ru;
    document.getElementById('modalDesc').innerText = "Ноокаттын эң даамдуу тамактарынан. Сапаттуу жана тез жеткирүү.";
    const addBtn = document.getElementById('addBtnAction');
    addBtn.innerText = `${translations[currentLang].add} - ${p.price} сом`;
    addBtn.onclick = () => { cart.push(p); updateCartUI(); closeProduct(); };
    document.getElementById('productModal').style.display = 'flex';
}

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

function showCart() {
    document.getElementById('cartModal').style.display = 'flex';
    const list = document.getElementById('cartList');
    list.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
            <div><strong>${currentLang === 'kg' ? item.name_kg : item.name_ru}</strong><br><small>${item.price} с</small></div>
            <span onclick="removeFromCart(${index})" style="color:red; font-weight:bold; cursor:pointer; padding: 5px 10px;">✕</span>
        </div>
    `).join('');
    calculateTotal();
}

function calculateTotal() {
    let subtotal = cart.reduce((a, b) => a + b.price, 0);
    let delivery = parseInt(document.getElementById('deliveryType').value) || 0;
    document.getElementById('finalSum').innerText = (subtotal + delivery);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showCart();
    if(cart.length === 0) closeCart();
}

function filterMenu(cat, event) {
    document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu(cat === 'all' ? products : products.filter(p => p.cat === cat));
}

function searchFood() {
    let val = document.getElementById('searchInput').value.toLowerCase();
    renderMenu(products.filter(p => 
        p.name_kg.toLowerCase().includes(val) || 
        p.name_ru.toLowerCase().includes(val) || 
        p.cafe.toLowerCase().includes(val)
    ));
}

// НОМЕРДИ КӨЧҮРҮҮ ФУНКЦИЯСЫ
function copyNumber() {
    const number = "0556616174";
    navigator.clipboard.writeText(number).then(() => {
        alert(translations[currentLang].copied);
    }).catch(err => {
        const el = document.createElement('textarea');
        el.value = number;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert(translations[currentLang].copied);
    });
}

// ЗАКАЗ БЕРҮҮ ФУНКЦИЯСЫ (ЖАҢЫЛАНГАН)
function checkout() {
    if(cart.length === 0) return;

    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    const deliveryValue = document.getElementById('deliveryType').value;

    if (!name || !address) {
        alert(translations[currentLang].alertInfo);
        return;
    }

    let phone = "996556616174"; 
    let itemsText = cart.map(i => `✅ ${currentLang === 'kg' ? i.name_kg : i.name_ru} (${i.price}с)`).join("\n");
    let total = document.getElementById('finalSum').innerText;
    let deliveryZone = deliveryValue == "0" ? "Ноокат ичи (0с)" : "Шаар сырты (150с)";

    // Мбанк үчүн кошумча эскертүү текстти
    let mbankNote = "";
    if (payment === "MBANK") {
        mbankNote = `\n⚠️ *ЭСКЕРТҮҮ:* Мбанктан төлөп бүткөн соң, ушул жерге *ЧЕКТИ* сүрөт катары жиберип коюңуз! 🙏\n`;
    }

    let message = `🚀 *ЖАҢЫ ЗАКАЗ: NOOKAT GO*\n` +
                  `━━━━━━━━━━━━━━━━\n` +
                  `👤 *КАРДАР:* ${name.toUpperCase()}\n` +
                  `📍 *ДАРЕК:* ${address}\n` +
                  `🚚 *ЗОНА:* ${deliveryZone}\n` +
                  `💳 *ТӨЛӨМ:* ${payment}\n` +
                  `━━━━━━━━━━━━━━━━\n` +
                  `🍴 *ТАМАКТАР:*\n${itemsText}\n\n` +
                  `💰 *ЖАЛПЫ СУММА:* ${total} сом\n` +
                  mbankNote + // Эскертүү ушул жерге кошулат
                  `━━━━━━━━━━━━━━━━\n` +
                  `_Заказ сайт аркылуу жөнөтүлдү_`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
}
function closeProduct() { document.getElementById('productModal').style.display = 'none'; }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

// Баштапкы ишке киргизүү
renderMenu();


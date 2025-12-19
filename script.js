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

// 2. ТАМАКТАРДЫН БАЗАСЫ (Ар бир категорияда минимум 8 продукт)
const products = [
    // УЛУТТУК ТАМАКТАР
    { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
    { id: 3, cat: "national", cafe: "Ордо", name_kg: "Манты (5 даана)", name_ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76" },
    { id: 4, cat: "national", cafe: "Ак-Тилек", name_kg: "Куурдак", name_ru: "Куурдак", price: 350, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143" },
    { id: 5, cat: "national", cafe: "Ордо", name_kg: "Босо Лагман", name_ru: "Босо Лагман", price: 230, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
    { id: 6, cat: "national", cafe: "Алай", name_kg: "Гүльчетай", name_ru: "Гульчетай", price: 210, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641" },
    { id: 7, cat: "national", cafe: "Ордо", name_kg: "Шорпо", name_ru: "Шорпо", price: 190, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
    { id: 8, cat: "national", cafe: "Ак-Тилек", name_kg: "Самсы (Тандыр)", name_ru: "Самсы (Тандыр)", price: 80, img: "https://images.unsplash.com/photo-1601050690597-df056fb36792" },

    // ТҮРК ТАМАКТАРЫ
    { id: 9, cat: "turkish", cafe: "Istanbul", name_kg: "Адана Кебаб", name_ru: "Адана Кебаб", price: 380, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
    { id: 10, cat: "turkish", cafe: "Ankara", name_kg: "Пиде менен эт", name_ru: "Пиде с мясом", price: 280, img: "https://images.unsplash.com/photo-1564936281441-118835849887" },
    { id: 11, cat: "turkish", cafe: "Istanbul", name_kg: "Искандер Кебаб", name_ru: "Искандер Кебаб", price: 420, img: "https://images.unsplash.com/photo-1626074353765-517a681e40be" },
    { id: 12, cat: "turkish", cafe: "Ankara", name_kg: "Түрк чорбасы", name_ru: "Турецкий суп", price: 150, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
    { id: 13, cat: "turkish", cafe: "Istanbul", name_kg: "Лахмажун", name_ru: "Лахмаджун", price: 180, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { id: 14, cat: "turkish", cafe: "Ankara", name_kg: "Тавук Пирзола", name_ru: "Тавук Пирзола", price: 320, img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b" },
    { id: 15, cat: "turkish", cafe: "Istanbul", name_kg: "Көфте", name_ru: "Кюфте", price: 300, img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9583b5" },
    { id: 16, cat: "turkish", cafe: "Ankara", name_kg: "Бейти Кебаб", name_ru: "Бейти Кебаб", price: 450, img: "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5" },

    // ПИЦЦА
    { id: 17, cat: "pizza", cafe: "Pizza Bell", name_kg: "Маргарита", name_ru: "Маргарита", price: 450, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38" },
    { id: 18, cat: "pizza", cafe: "Pizza Bell", name_kg: "Пепперони", name_ru: "Пепперони", price: 550, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e" },
    { id: 19, cat: "pizza", cafe: "Pizza Bell", name_kg: "Төрт сыр", name_ru: "Четыре сыра", price: 600, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { id: 20, cat: "pizza", cafe: "Pizza Bell", name_kg: "Тоок эти менен", name_ru: "С курицей", price: 480, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
    { id: 21, cat: "pizza", cafe: "Pizza Bell", name_kg: "Мексиканча", name_ru: "Мексиканская", price: 570, img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212" },
    { id: 22, cat: "pizza", cafe: "Pizza Bell", name_kg: "Грибная", name_ru: "Грибная", price: 490, img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47" },
    { id: 23, cat: "pizza", cafe: "Pizza Bell", name_kg: "Гавайская", name_ru: "Гавайская", price: 520, img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828" },
    { id: 24, cat: "pizza", cafe: "Pizza Bell", name_kg: "Ассорти", name_ru: "Ассорти", price: 650, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee" },

    // ФАСТФУД
    { id: 25, cat: "fastfood", cafe: "Burger House", name_kg: "Чикен Бургер", name_ru: "Чикен Бургер", price: 160, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 26, cat: "fastfood", cafe: "Burger House", name_kg: "Чизбургер", name_ru: "Чизбургер", price: 180, img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9" },
    { id: 27, cat: "fastfood", cafe: "Ankara", name_kg: "Донер (Лаваш)", name_ru: "Донер (Лаваш)", price: 180, img: "https://images.unsplash.com/photo-1561651823-34feb02250e4" },
    { id: 28, cat: "fastfood", cafe: "Burger House", name_kg: "Картошка Фри", name_ru: "Картофель Фри", price: 100, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
    { id: 29, cat: "fastfood", cafe: "Burger House", name_kg: "Наггетсы (8шт)", name_ru: "Наггетсы (8шт)", price: 150, img: "https://images.unsplash.com/photo-1562967914-608f82629710" },
    { id: 30, cat: "fastfood", cafe: "Ankara", name_kg: "Хот-Дог", name_ru: "Хот-Дог", price: 120, img: "https://images.unsplash.com/photo-1541232399669-e34f54e405b8" },
    { id: 31, cat: "fastfood", cafe: "Burger House", name_kg: "Дабл Бургер", name_ru: "Дабл Бургер", price: 250, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 32, cat: "fastfood", cafe: "Ankara", name_kg: "Шаурма чоң", name_ru: "Шаурма большая", price: 200, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },

    // ШАШЛЫК
    { id: 33, cat: "grill", cafe: "Шашлык Сити", name_kg: "Кой эти (Кесек)", name_ru: "Баранина (Кусковой)", price: 180, img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
    { id: 34, cat: "grill", cafe: "Шашлык Сити", name_kg: "Люля Кебаб", name_ru: "Люля Кебаб", price: 170, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35" },
    { id: 35, cat: "grill", cafe: "Шашлык Сити", name_kg: "Тоок эти шашлыгы", name_ru: "Куриный шашлык", price: 150, img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435" },
    { id: 36, cat: "grill", cafe: "Шашлык Сити", name_kg: "Кабырга", name_ru: "Ребрышки", price: 220, img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
    { id: 37, cat: "grill", cafe: "Шашлык Сити", name_kg: "Уй эти шашлыгы", name_ru: "Говяжий шашлык", price: 200, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
    { id: 38, cat: "grill", cafe: "Шашлык Сити", name_kg: "Жигар (Печень)", name_ru: "Печень", price: 140, img: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a" },
    { id: 39, cat: "grill", cafe: "Шашлык Сити", name_kg: "Фарш шашлык", name_ru: "Фарш шашлык", price: 160, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
    { id: 40, cat: "grill", cafe: "Шашлык Сити", name_kg: "Ассорти 1кг", name_ru: "Ассорти 1кг", price: 1200, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },

    // СУУЛАР
    { id: 41, cat: "drinks", cafe: "Маркет", name_kg: "Coca-Cola 1л", name_ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" },
    { id: 42, cat: "drinks", cafe: "Маркет", name_kg: "Fanta 1л", name_ru: "Fanta 1л", price: 85, img: "https://images.unsplash.com/photo-1624517452488-04869289c4ca" },
    { id: 43, cat: "drinks", cafe: "Маркет", name_kg: "Sprite 1л", name_ru: "Sprite 1л", price: 85, img: "https://images.unsplash.com/photo-1625772290748-39126cdd9f56" },
    { id: 44, cat: "drinks", cafe: "Маркет", name_kg: "Легенда суусу 0.5л", name_ru: "Вода Легенда 0.5л", price: 30, img: "https://images.unsplash.com/photo-1560023907-5f339617ea30" },
    { id: 45, cat: "drinks", cafe: "Маркет", name_kg: "Чай (кара/жашыл)", name_ru: "Чай (черный/зеленый)", price: 40, img: "https://images.unsplash.com/photo-1544787210-282aa305608b" },
    { id: 46, cat: "drinks", cafe: "Маркет", name_kg: "Кофе 3в1", name_ru: "Кофе 3в1", price: 30, img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f" },
    { id: 47, cat: "drinks", cafe: "Маркет", name_kg: "Компот 1л", name_ru: "Компот 1л", price: 100, img: "https://images.unsplash.com/photo-1621263764257-234b6e511394" },
    { id: 48, cat: "drinks", cafe: "Маркет", name_kg: "Шоро (Максым) 1л", name_ru: "Максым Шоро 1л", price: 95, img: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38" }
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
    if(event) event.target.classList.add('active');
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

function copyNumber() {
    const number = "0556616174";
    navigator.clipboard.writeText(number).then(() => {
        alert(translations[currentLang].copied);
    });
}

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

    let mbankNote = payment === "MBANK" ? `\n⚠️ *ЭСКЕРТҮҮ:* Мбанктан төлөп бүткөн соң, ушул жерге *ЧЕКТИ* сүрөт катары жиберип коюңуз! 🙏\n` : "";

    let message = `🚀 *ЖАҢЫ ЗАКАЗ: NOOKAT GO*\n` +
                  `━━━━━━━━━━━━━━━━\n` +
                  `👤 *КАРДАР:* ${name.toUpperCase()}\n` +
                  `📍 *ДАРЕК:* ${address}\n` +
                  `🚚 *ЗОНА:* ${deliveryZone}\n` +
                  `💳 *ТӨЛӨМ:* ${payment}\n` +
                  `━━━━━━━━━━━━━━━━\n` +
                  `🍴 *ТАМАКТАР:*\n${itemsText}\n\n` +
                  `💰 *ЖАЛПЫ СУММА:* ${total} сом\n` +
                   mbankNote + 
                  `━━━━━━━━━━━━━━━━\n` +
                  `_Заказ сайт аркылуу жөнөтүлдү_`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
}

function closeProduct() { document.getElementById('productModal').style.display = 'none'; }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

// Баштапкы ишке киргизүү
renderMenu();



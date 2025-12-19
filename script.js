// 1. ТИЛДЕР ЖАНА КАТЕГОРИЯЛАР
const translations = {
    kg: {
        hero: "Ноокаттагы эң мыкты даамдар", search: "Тамак же кафе издөө...", 
        all: "Баары", national: "Улуттук", turkish: "Түрк", pizza: "Пицца", fastfood: "Фастфуд", grill: "Шашлык", drinks: "Суулар",
        add: "Себетке кошуу", total: "Жалпы:", view: "СЕБЕТ", empty: "Себетиңиз бош"
    },
    ru: {
        hero: "Лучшая еда в Ноокате", search: "Поиск еды или кафе...", 
        all: "Все", national: "Нац. кухня", turkish: "Турецкая", pizza: "Пицца", fastfood: "Фастфуд", grill: "Шашлык", drinks: "Напитки",
        add: "В корзину", total: "Итого:", view: "КОРЗИНА", empty: "Корзина пуста"
    }
};

// 2. ТАМАКТАРДЫН БАЗАСЫ (Жалпы 50 тамак)
const products = [
    // УЛУТТУК ТАМАКТАР (National)
    { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=500" },
    { id: 3, cat: "national", cafe: "Ордо", name_kg: "Манты (5 даана)", name_ru: "Манты (5 шт)", price: 200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?w=500" },
    { id: 4, cat: "national", cafe: "Ак-Тилек", name_kg: "Куурдак", name_ru: "Куурдак", price: 350, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500" },
    { id: 5, cat: "national", cafe: "Ордо", name_kg: "Босо Лагман", name_ru: "Босо Лагман", price: 230, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" },
    { id: 6, cat: "national", cafe: "Алай", name_kg: "Шорпо", name_ru: "Шурпа", price: 180, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500" },
    { id: 7, cat: "national", cafe: "Ордо", name_kg: "Ганфан", name_ru: "Ганфан", price: 200, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=500" },
    { id: 8, cat: "national", cafe: "Ак-Тилек", name_kg: "Дымдама", name_ru: "Дымдама", price: 220, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500" },

    // ТҮРК АШКАНАСЫ (Turkish)
    { id: 9, cat: "turkish", cafe: "Istanbul", name_kg: "Адана Кебаб", name_ru: "Адана Кебаб", price: 380, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" },
    { id: 10, cat: "turkish", cafe: "Istanbul", name_kg: "Искендер Кебаб", name_ru: "Искендер Кебаб", price: 420, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500" },
    { id: 11, cat: "turkish", cafe: "Ankara", name_kg: "Донер (Лаваш)", name_ru: "Донер (Лаваш)", price: 180, img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500" },
    { id: 12, cat: "turkish", cafe: "Istanbul", name_kg: "Мержимек шорпо", name_ru: "Суп Мерджимек", price: 150, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500" },
    { id: 13, cat: "turkish", cafe: "Ankara", name_kg: "Пиде (Сыр менен)", name_ru: "Пиде (с сыром)", price: 250, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 14, cat: "turkish", cafe: "Istanbul", name_kg: "Лахмажун", name_ru: "Лахмаджун", price: 120, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500" },
    { id: 15, cat: "turkish", cafe: "Ankara", name_kg: "Бейти Кебаб", name_ru: "Бейти Кебаб", price: 400, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500" },
    { id: 16, cat: "turkish", cafe: "Istanbul", name_kg: "Түрк чайы", name_ru: "Турецкий чай", price: 50, img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500" },

    // ПИЦЦА (Pizza)
    { id: 17, cat: "pizza", cafe: "Pizza Bell", name_kg: "Маргарита", name_ru: "Маргарита", price: 450, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" },
    { id: 18, cat: "pizza", cafe: "Pizza Bell", name_kg: "Пепперони", name_ru: "Пепперони", price: 550, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 19, cat: "pizza", cafe: "Додо", name_kg: "Төрт сыр", name_ru: "Четыре сыра", price: 600, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 20, cat: "pizza", cafe: "Pizza Bell", name_kg: "Мексиканча", name_ru: "Мексиканская", price: 580, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500" },
    { id: 21, cat: "pizza", cafe: "Додо", name_kg: "Гавайская", name_ru: "Гавайская", price: 550, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500" },
    { id: 22, cat: "pizza", cafe: "Pizza Bell", name_kg: "Козу карындуу", name_ru: "Грибная", price: 520, img: "https://images.unsplash.com/photo-1571066811444-13c5c5163975?w=500" },
    { id: 23, cat: "pizza", cafe: "Додо", name_kg: "Ассорти", name_ru: "Ассорти", price: 650, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 24, cat: "pizza", cafe: "Pizza Bell", name_kg: "Чоң Пицца (Family)", name_ru: "Семейная Пицца", price: 850, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },

    // ФАСТФУД (Fastfood)
    { id: 25, cat: "fastfood", cafe: "Burger House", name_kg: "Классикалык Бургер", name_ru: "Классический Бургер", price: 150, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 26, cat: "fastfood", cafe: "Burger House", name_kg: "Чизбургер", name_ru: "Чизбургер", price: 180, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500" },
    { id: 27, cat: "fastfood", cafe: "Fresh Fast", name_kg: "Шаурма (Тоок)", name_ru: "Шаурма (Куриная)", price: 140, img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500" },
    { id: 28, cat: "fastfood", cafe: "Fresh Fast", name_kg: "Хот-дог", name_ru: "Хот-дог", price: 90, img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500" },
    { id: 29, cat: "fastfood", cafe: "Burger House", name_kg: "Дабл Чизбургер", name_ru: "Дабл Чизбургер", price: 250, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 30, cat: "fastfood", cafe: "Fresh Fast", name_kg: "Фри (Картошка)", name_ru: "Картофель Фри", price: 80, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { id: 31, cat: "fastfood", cafe: "Fresh Fast", name_kg: "Наггетсы (10шт)", name_ru: "Наггетсы (10шт)", price: 160, img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { id: 32, cat: "fastfood", cafe: "Burger House", name_kg: "Тоок Бургер", name_ru: "Чикен Бургер", price: 160, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },

    // ШАШЛЫК (Grill)
    { id: 33, cat: "grill", cafe: "Шашлык Сити", name_kg: "Кой эти шашлыгы", name_ru: "Баранина шашлык", price: 180, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
    { id: 34, cat: "grill", cafe: "Шашлык Сити", name_kg: "Уй эти шашлыгы", name_ru: "Говядина шашлык", price: 160, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500" },
    { id: 35, cat: "grill", cafe: "Кавказ", name_kg: "Тоок шашлыгы", name_ru: "Куриный шашлык", price: 140, img: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500" },
    { id: 36, cat: "grill", cafe: "Кавказ", name_kg: "Люля кебаб", name_ru: "Люля кебаб", price: 150, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" },
    { id: 37, cat: "grill", cafe: "Шашлык Сити", name_kg: "Жигер (Печень)", name_ru: "Шашлык из печени", price: 120, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
    { id: 38, cat: "grill", cafe: "Кавказ", name_kg: "Канаты (Крылышки)", name_ru: "Крылышки на гриле", price: 150, img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },

    // СУУЛАР (Drinks)
    { id: 41, cat: "drinks", cafe: "Маркет", name_kg: "Кола 1л", name_ru: "Кола 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
    { id: 42, cat: "drinks", cafe: "Маркет", name_kg: "Фанта 1л", name_ru: "Фанта 1л", price: 85, img: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500" },
    { id: 43, cat: "drinks", cafe: "Маркет", name_kg: "Минералдык суу", name_ru: "Мин. вода", price: 40, img: "https://images.unsplash.com/photo-1523362628242-f713a0aca522?w=500" },
    { id: 44, cat: "drinks", cafe: "Маркет", name_kg: "Максым Шоро 1л", name_ru: "Максым Шоро 1л", price: 70, img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500" },
    { id: 45, cat: "drinks", cafe: "Маркет", name_kg: "Натуралдык шире (Сок)", name_ru: "Сок Натуральный", price: 120, img: "https://images.unsplash.com/photo-1622597467822-5bb44e62703a?w=500" }
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
            <img src="${p.img}">
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
    document.getElementById('modalDesc').innerText = "Ноокаттын эң даамдуу тамактарынан.";
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
        <div class="cart-item-row">
            <div><strong>${currentLang === 'kg' ? item.name_kg : item.name_ru}</strong><br><small>${item.price} с</small></div>
            <span onclick="removeFromCart(${index})" style="color:red; font-weight:bold; cursor:pointer;">X</span>
        </div>
    `).join('');
    document.getElementById('finalSum').innerText = cart.reduce((a, b) => a + b.price, 0) + " сом";
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

function checkout() {
    let phone = "996700123456"; // БУЛ ЖЕРГЕ ӨЗ НОМЕРИҢИЗДИ ЖАЗЫҢЫЗ
    let itemsText = cart.map(i => `- ${currentLang === 'kg' ? i.name_kg : i.name_ru} (${i.price}с)`).join("\n");
    let total = document.getElementById('finalSum').innerText;
    
    let text = `*ЖАҢЫ ЗАКАЗ (NOOKAT GO)*\n` +
               `--------------------------\n` +
               `*ТАМАКТАР:*\n${itemsText}\n\n` +
               `*ЖАЛПЫ:* ${total}\n` +
               `--------------------------\n` +
               `*КАРДАР МААЛЫМАТЫ:*\n` +
               `Аты-жөнүңүз: \n` +
               `Дарегиңиз: \n` +
               `Телефонуңуз: \n` +
               `--------------------------\n` +
               `_Сураныч, жогорудагы бош жерлерди толтуруп жөнөтүңүз._`;

    window.open(`https://wa.me/${556616174}?text=${encodeURIComponent(text)}`);
}

function closeProduct() { document.getElementById('productModal').style.display = 'none'; }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

changeLang('kg');

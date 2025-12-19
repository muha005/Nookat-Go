// 1. ТИЛДЕРДИН КОТОРМОСУ
const translations = {
    kg: {
        hero: "Ноокаттагы эң мыкты даамдар",
        search: "Тамак же кафе издөө...",
        all: "Баары",
        national: "Улуттук",
        turkish: "Түрк",
        pizza: "Пицца",
        fastfood: "Фастфуд",
        grill: "Шашлык",
        drinks: "Суулар",
        add: "Себетке кошуу",
        total: "Жалпы:",
        view: "СЕБЕТ",
        empty: "Себетиңиз бош"
    },
    ru: {
        hero: "Лучшая еда в Ноокате",
        search: "Поиск еды или кафе...",
        all: "Все",
        national: "Нац. кухня",
        turkish: "Турецкая",
        pizza: "Пицца",
        fastfood: "Фастфуд",
        grill: "Шашлык",
        drinks: "Напитки",
        add: "В корзину",
        total: "Итого:",
        view: "КОРЗИНА",
        empty: "Корзина пуста"
    }
};

// 2. ТАМАКТАРДЫН БАЗАСЫ (Ушул жерден тамактарды кошосуз же өчүрөсүз)
const products = [
    { id: 1, cat: "national", cafe: "Ноокат Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=500" },
    { id: 3, cat: "pizza", cafe: "Pizza Bell", name_kg: "Маргарита", name_ru: "Маргарита", price: 450, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" },
    { id: 4, cat: "fastfood", cafe: "Osh Burger", name_kg: "Чизбургер", name_ru: "Чизбургер", price: 180, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 5, cat: "turkish", cafe: "Istanbul", name_kg: "Донер Кебаб", name_ru: "Донер Кебаб", price: 200, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" }
];
{ 
  id: 6, 
  cat: "national", 
  cafe: "Ордо", 
  name_kg: "Манты (5 даана)", 
  name_ru: "Манты (5 шт)", 
  price: 200, 
  img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?w=500" 
},
{ 
  id: 7, 
  cat: "pizza", 
  cafe: "Pizza Bell", 
  name_kg: "Төрт сыр", 
  name_ru: "Четыре сыра", 
  price: 600, 
  img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" 
},
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
    document.getElementById('modalDesc').innerText = "Даамдуу жана жаңы тамак."; // Базага кошумча текст кошсоңуз болот
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
    let phone = "996700123456"; // БУЛ ЖЕРГЕ ӨЗ НОМЕРИҢИЗДИ ЖАЗЫҢЫЗ!
    let items = cart.map(i => `- ${currentLang === 'kg' ? i.name_kg : i.name_ru} (${i.price}с)`).join("\n");
    let total = document.getElementById('finalSum').innerText;
    let text = `*ЖАҢЫ ЗАКАЗ (Nookat Go)*\n\n${items}\n\n*Жалпы:* ${total}\n\nДарегим: `;
    window.open(`https://wa.me/${556616174}?text=${encodeURIComponent(text)}`);
}

function closeProduct() { document.getElementById('productModal').style.display = 'none'; }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

// Баштапкы ишке киргизүү
changeLang('kg');



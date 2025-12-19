// 1. ТИЛДЕРДИН КОТОРМОСУ
const translations = {
    kg: {
        hero: "Ноокаттагы эң мыкты даамдар", search: "Тамак же кафе издөө...", 
        all: "Баары", national: "Улуттук", turkish: "Түрк", pizza: "Пицца", fastfood: "Фастфуд", grill: "Шашлык", korean: "Корей", cakes: "Таттуулар", drinks: "Суулар",
        add: "Себетке кошуу", cart: "Сиздин себетиңиз", total: "Жалпы:", ingred: "Курамы:", view: "СЕБЕТ", empty: "Себетиңиз бош"
    },
    ru: {
        hero: "Лучшая еда в Ноокате", search: "Поиск еды или кафе...", 
        all: "Все", national: "Нац. кухня", turkish: "Турецкая", pizza: "Пицца", fastfood: "Фастфуд", grill: "Шашлык", korean: "Корейская", cakes: "Выпечка", drinks: "Напитки",
        add: "В корзину", cart: "Ваша корзина", total: "Итого:", ingred: "Состав:", view: "КОРЗИНА", empty: "Корзина пуста"
    }
};

// 2. ТАМАКТАРДЫН БАЗАСЫ (80+ ТАМАК ҮЧҮН СТРУКТУРА)
const products = [
    // УЛУТТУК (1-10)
    { id: 1, cat: "national", cafe: "Ноокат Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, ingred_kg: "Күрүч, Эт, Сары сабиз", ingred_ru: "Рис, Мясо, Морковь", desc_kg: "Чыныгы Ош плову.", desc_ru: "Настоящий плов.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
    { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, ingred_kg: "Кол камыр, Эт, Жашылча", ingred_ru: "Тесто, Мясо, Овощи", desc_kg: "Созулган ичке камыр.", desc_ru: "Тянутое тесто.", img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=500" },
    { id: 3, cat: "national", cafe: "Береке", name_kg: "Манты (Эт менен)", name_ru: "Манты (Мясные)", price: 200, ingred_kg: "Эт, Пияз, Камыр", ingred_ru: "Мясо, Лук, Тесто", desc_kg: "Ширелүү 5 даана.", desc_ru: "Сочные 5 штук.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500" },
    { id: 4, cat: "national", cafe: "Ордо", name_kg: "Шорпо (Кой эти)", name_ru: "Шорпо (Баранина)", price: 240, ingred_kg: "Жилик эт, Картошка", ingred_ru: "Мясо на кости, Картофель", desc_kg: "Күчтүү сорпо.", desc_ru: "Наваристый суп.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500" },
    
    // ТҮРК (11-20)
    { id: 11, cat: "turkish", cafe: "Istanbul", name_kg: "Адана Кебаб", name_ru: "Адана Кебаб", price: 380, ingred_kg: "Фарш, Калемпир, Гарнир", ingred_ru: "Фарш, Перец, Гарнир", desc_kg: "Түрк ашканасынын падышасы.", desc_ru: "Король турецкой кухни.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" },
    { id: 12, cat: "turkish", cafe: "Istanbul", name_kg: "Түрк Пидеси", name_ru: "Турецкое Пиде", price: 280, ingred_kg: "Сыр, Фарш, Камыр", ingred_ru: "Сыр, Фарш, Тесто", desc_kg: "Кайык формасында.", desc_ru: "В форме лодочки.", img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500" },

    // ПИЦЦА (21-30)
    { id: 21, cat: "pizza", cafe: "Pizza Bell", name_kg: "Пепперони", name_ru: "Пепперони", price: 550, ingred_kg: "Колбаса, Сыр, Томат", ingred_ru: "Колбаса, Сыр, Томат", desc_kg: "Кытырак жана ачуу.", desc_ru: "Хрустящая и острая.", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 22, cat: "pizza", cafe: "Pizza Bell", name_kg: "Маргарита", name_ru: "Маргарита", price: 450, ingred_kg: "Моцарелла, Базилик", ingred_ru: "Моцарелла, Базилик", desc_kg: "Классикалык пицца.", desc_ru: "Классическая пицца.", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=500" },

    // ФАСТФУД (31-40)
    { id: 31, cat: "fastfood", cafe: "Osh Burger", name_kg: "Чизбургер", name_ru: "Чизбургер", price: 180, ingred_kg: "Уй эти, Сыр, Салат", ingred_ru: "Говядина, Сыр, Салат", desc_kg: "Ширелүү котлета.", desc_ru: "Сочная котлета.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 32, cat: "fastfood", cafe: "Nookat Food", name_kg: "Шаурма (Чоң)", name_ru: "Шаурма (Бол.)", price: 190, ingred_kg: "Тоок эти, Фри, Соус", ingred_ru: "Курица, Фри, Соус", desc_kg: "Тоюмдуу тамак.", desc_ru: "Сытное блюдо.", img: "https://images.unsplash.com/photo-1561651823-34fed022530b?w=500" },

    // ШАШЛЫК (41-50)
    { id: 41, cat: "grill", cafe: "Кавказ", name_kg: "Кой шашлык", name_ru: "Шашлык баранина", price: 180, ingred_kg: "Кой эти, Пияз", ingred_ru: "Баранина, Лук", desc_kg: "Бир таякча.", desc_ru: "Одна палочка.", img: "https://images.unsplash.com/photo-1529692236671-f1f6e946a8b8?w=500" },

    // КОРЕЙ (51-60)
    { id: 51, cat: "korean", cafe: "An-Nyong", name_kg: "Рамен", name_ru: "Рамён", price: 320, ingred_kg: "Кесме, Жумуртка, Ачуу соус", ingred_ru: "Лапша, Яйцо, Острый соус", desc_kg: "Корей кесмеси.", desc_ru: "Корейская лапша.", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500" },

    // ТАТТУУЛАР (61-70)
    { id: 61, cat: "cakes", cafe: "Sweet", name_kg: "Вупи Пай", name_ru: "Вупи Пай", price: 160, ingred_kg: "Шоколад, Крем", ingred_ru: "Шоколад, Крем", desc_kg: "Назик торт.", desc_ru: "Нежный торт.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500" },

    // СУУЛАР (71-80)
    { id: 71, cat: "drinks", cafe: "Market", name_kg: "Cola 1.5L", name_ru: "Cola 1.5L", price: 95, ingred_kg: "Суусундук", ingred_ru: "Напиток", desc_kg: "Муздак.", desc_ru: "Холодная.", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" }
];

let cart = [];
let currentLang = 'kg';

// 3. ТИЛДИ АЛМАШТЫРУУ
function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Активдүү тилди белгилөө
    document.querySelectorAll('.lang-selector span').forEach(s => s.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');

    // Тексттерди которуу
    document.getElementById('hero-title').innerText = t.hero;
    document.getElementById('searchInput').placeholder = t.search;
    document.getElementById('cart-t-text').innerText = t.cart;
    document.getElementById('t-text').innerText = t.total;

    // Категорияларды которуу
    const btns = document.querySelectorAll('.cat-item');
    btns[0].innerText = t.all; btns[1].innerText = t.national; btns[2].innerText = t.turkish;
    btns[3].innerText = t.pizza; btns[4].innerText = t.fastfood; btns[5].innerText = t.grill;
    btns[6].innerText = t.korean; btns[7].innerText = t.cakes; btns[8].innerText = t.drinks;

    renderMenu();
    updateCartUI();
}

// 4. МЕНЮНУ ЧЫГАРУУ
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

// 5. ТАМАКТЫН ИЧИН АЧУУ (MODAL)
function openProduct(id) {
    const p = products.find(x => x.id === id);
    const t = translations[currentLang];
    
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalName').innerText = currentLang === 'kg' ? p.name_kg : p.name_ru;
    document.getElementById('modalDesc').innerText = currentLang === 'kg' ? p.desc_kg : p.desc_ru;
    document.getElementById('modalIngred').innerText = currentLang === 'kg' ? p.ingred_kg : p.ingred_ru;
    document.getElementById('ing-title').innerText = t.ingred;
    
    const addBtn = document.getElementById('addBtnAction');
    addBtn.innerText = `${t.add} - ${p.price} сом`;
    
    // Себетке кошуу
    addBtn.onclick = () => {
        cart.push(p);
        updateCartUI();
        addBtn.style.background = "#2ecc71";
        addBtn.innerText = "✓ Кошулду";
        setTimeout(() => {
            addBtn.style.background = "";
            closeProduct();
        }, 500);
    };

    document.getElementById('productModal').style.display = 'flex';
}

// 6. СЕБЕТТИ ЖАҢЫЛОО
function updateCartUI() {
    const bar = document.getElementById('cartBar');
    if (cart.length > 0) {
        bar.style.display = 'flex';
        document.getElementById('cartCount').innerText = cart.length;
        document.getElementById('cartSum').innerText = cart.reduce((a, b) => a + b.price, 0);
        document.getElementById('view-cart-btn-text').innerHTML = `${translations[currentLang].view} <i class="fas fa-shopping-basket"></i>`;
    } else {
        bar.style.display = 'none';
    }
}

// 7. СЕБЕТТИН ИЧИН КӨРСӨТҮҮ
function showCart() {
    document.getElementById('cartModal').style.display = 'flex';
    const list = document.getElementById('cartList');
    
    if(cart.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding:30px; color:#999;">${translations[currentLang].empty}</p>`;
    } else {
        list.innerHTML = cart.map((item, index) => `
            <div class="cart-item-row">
                <div>
                    <strong>${currentLang === 'kg' ? item.name_kg : item.name_ru}</strong><br>
                    <small>${item.price} сом</small>
                </div>
                <i class="fas fa-times-circle remove-item" onclick="removeFromCart(${index})"></i>
            </div>
        `).join('');
    }
    
    calculateTotal();
}

function calculateTotal() {
    let subtotal = cart.reduce((a, b) => a + b.price, 0);
    let delivery = parseInt(document.getElementById('deliveryType').value);
    document.getElementById('finalSum').innerText = (subtotal + delivery) + " сом";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showCart();
    if(cart.length === 0) setTimeout(() => closeCart(), 300);
}

// 8. ЖАБУУ ФУНКЦИЯЛАРЫ
function closeProduct() { document.getElementById('productModal').style.display = 'none'; }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }
function closeProductOutside(e) { if(e.target.id === 'productModal') closeProduct(); }
function closeCartOutside(e) { if(e.target.id === 'cartModal') closeCart(); }

// 9. ИЗДӨӨ ЖАНА ФИЛЬТР
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

// 10. WHATSAPP ЗАКАЗ
function checkout() {
    if(cart.length === 0) return;
    
    // БУЛ ЖЕРГЕ ӨЗ НОМЕРИҢИЗДИ ЖАЗЫҢЫЗ (996 дан баштап, плюс койбоңуз)
    let phone = "996700123456"; 
    
    let d = window.currentOrderDetails;
    let items = cart.map(i => `- ${i.name_kg} (${i.price}с)`).join("\n");
    let text = `*ЖАҢЫ ЗАКАЗ (NOOKAT GO)*\n` +
               `--------------------------\n` +
               `*ТАМАКТАР:*\n${items}\n\n` +
               `*ТӨЛӨМ:*\n` +
               `Тамактар: ${d.subtotal} сом\n` +
               `Жеткирүү: ${d.delivery} сом\n` +
               `*ЖАЛПЫ: ${d.total} сом*\n` +
               `--------------------------\n` +
               `*КАРДАРДЫН МААЛЫМАТЫ:*\n` +
               `Атыңыз: \n` +
               `Дарегиңиз: \n` +
               `Телефон: \n` +
               `--------------------------\n` +
               `_(Сураныч, жогорудагы бош жерлерди толтуруп жөнөтүңүз)_`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
}

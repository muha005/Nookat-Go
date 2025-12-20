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

// Кеңейтилген тамактар тизмеси (40ка жакын тамак)
const foods = [
    // --- УЛУТТУК ТАМАКТАР (15 тамак) ---
    { id: 1, cat: "national", kg: "Ош ашы (Плов)", ru: "Ошский Плов", price: 250, desc: "Девзира күрүч, кой эти жана сары сабиз менен даярдалган чыныгы Ош ашы.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { id: 2, cat: "national", kg: "Чоюлма Лагман", ru: "Тянутый Лагман", price: 220, desc: "Колдо чоюлган камыр, жаңы жашылчалар жана жумшак уй эти.", img: "https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4df?w=400" },
    { id: 5, cat: "national", kg: "Манты (5 шт)", ru: "Манты (5 шт)", price: 200, desc: "Жука камыр, тууралган кой эти жана пияз. Сары май менен.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?w=400" },
    { id: 7, cat: "national", kg: "Казан Кебаб", ru: "Казан Кебаб", price: 350, desc: "Казанда куурулган эт жана кызарган картошка. Чөптөр менен берилет.", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400" },
    { id: 9, cat: "national", kg: "Самсы Тандыр", ru: "Самсы Тандыр", price: 80, desc: "Тандырга бышкан кытырак самсы, ичинде ширелүү эт жана пияз.", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce99?w=400" },
    { id: 14, cat: "national", kg: "Беш Бармак", ru: "Беш Бармак", price: 400, desc: "Кыргыздын эң сыйлуу тамагы: жылкы эти, кесме жана чык.", img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=400" },
    { id: 15, cat: "national", kg: "Шорпо", ru: "Шорпо", price: 180, desc: "Койдун этинен кайнатылган тунук жана витаминдүү шорпо.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },
    { id: 16, cat: "national", kg: "Дымдама", ru: "Дымдама", price: 210, desc: "Өз ширесинде бышкан жашылчалар жана жумшак эт.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
    { id: 17, cat: "national", kg: "Куурдак", ru: "Куурдак", price: 300, desc: "Пиязга куурулган эт жана картошка. Эң сонун закуска.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { id: 18, cat: "national", kg: "Ганфан", ru: "Ганфан", price: 200, desc: "Ак күрүч жана үстүнө лагмандын соусу (важу) менен.", img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=400" },
    { id: 19, cat: "national", kg: "Босо Лагман", ru: "Босо Лагман", price: 230, desc: "Куурулган лагман. Камыры кытырак жана даамдуу.", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { id: 20, cat: "national", kg: "Чүчвара", ru: "Чучвара", price: 170, desc: "Майда түйүлгөн пельмендер шорпосу менен.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?w=400" },
    { id: 21, cat: "national", kg: "Оромо", ru: "Оромо", price: 150, desc: "Бууга бышкан камыр, ичинде картошка, эт жана жашылчалар.", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce99?w=400" },
    { id: 22, cat: "national", kg: "Нарын", ru: "Нарын", price: 350, desc: "Майда тууралган эт жана кесмеден турган салттуу тамак.", img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c?w=400" },
    { id: 23, cat: "national", kg: "Мастава", ru: "Мастава", price: 160, desc: "Күрүч жана майда эт кошулган тойлумдуу шорпо.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },

    // --- ФАСТФУД (15 тамак) ---
    { id: 3, cat: "fastfood", kg: "Чизбургер XL", ru: "Чизбургер XL", price: 180, desc: "Чоң котлета, кош сыр, жаңы салат жана атайын соус.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { id: 4, cat: "fastfood", kg: "Тоок Шаурма", ru: "Куриная Шаурма", price: 160, desc: "Грильде бышкан тоок эти, фри жана жашылчалар лавашта.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400" },
    { id: 6, cat: "fastfood", kg: "Картофель Фри", ru: "Картофель Фри", price: 100, desc: "Кытырак алтын түстөгү картошка таякчалары. Кетчуп менен.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: 8, cat: "fastfood", kg: "Пицца Ассорти", ru: "Пицца Ассорти", price: 450, desc: "Колбаса, гриб, сыр, помидор кошулган 30см пицца.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
    { id: 10, cat: "fastfood", kg: "Хот-Дог XXL", ru: "Хот-Дог XXL", price: 120, desc: "Чоң сосиска, жумшак нан жана көп соус.", img: "https://images.unsplash.com/photo-1541234327333-5586632001fe?w=400" },
    { id: 24, cat: "fastfood", kg: "Наггетсы (10 шт)", ru: "Наггетсы (10 шт)", price: 140, desc: "Тоок этинен жасалган кытырак наггетстер.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" },
    { id: 25, cat: "fastfood", kg: "Гамбургер Классик", ru: "Гамбургер Классик", price: 150, desc: "Ширелүү котлета, пияз жана маринаддалган бадыраң.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { id: 26, cat: "fastfood", kg: "Пицца Пепперони", ru: "Пицца Пепперони", price: 420, desc: "Ачуу колбаса жана көп Моцарелла сыры менен.", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" },
    { id: 27, cat: "fastfood", kg: "Сэндвич Клаб", ru: "Клаб Сэндвич", price: 190, desc: "Тоок эти, ветчина жана жумуртка кошулган үч кабаттуу нан.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400" },
    { id: 28, cat: "fastfood", kg: "Крылышки BBQ", ru: "Крылышки BBQ", price: 260, desc: "Атайын соуста куурулган тоок канаттары (8 даана).", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400" },
    { id: 29, cat: "fastfood", kg: "Пицца Маргарита", ru: "Пицца Маргарита", price: 380, desc: "Классикалык пицца: томат соусу жана сыр.", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=400" },
    { id: 30, cat: "fastfood", kg: "Донар Кебаб", ru: "Донер Кебаб", price: 170, desc: "Түрк стилиндеги эт жана жашылчалар нандын ичинде.", img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400" },
    { id: 31, cat: "fastfood", kg: "Картофель по-деревенски", ru: "Картофель по-деревенски", price: 120, desc: "Чоң кесилген, татымалдар менен бышкан картошка.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: 32, cat: "fastfood", kg: "Твистер", ru: "Твистер", price: 145, desc: "Кытырак тоок эти лавашка оролгон.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400" },
    { id: 33, cat: "fastfood", kg: "Сырные палочки", ru: "Сырные палочки", price: 160, desc: "Эриген сыр жана кытырак кабык.", img: "https://images.unsplash.com/photo-1531496681078-2742ed47fba8?w=400" },

    // --- СУУСУНДУКТАР (10 тамак) ---
    { id: 11, cat: "drinks", kg: "Coca-Cola 1л", ru: "Coca-Cola 1л", price: 85, desc: "Муздак классикалык суусундук.", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" },
    { id: 12, cat: "drinks", kg: "Чай Кара/Жашыл", ru: "Чай Черный/Зеленый", price: 30, desc: "Ысык демделген чай. Лимон жана кант менен.", img: "https://images.unsplash.com/photo-1544787210-2211d7c928c7?w=400" },
    { id: 13, cat: "drinks", kg: "Максым Шоро 0.5л", ru: "Максым Шоро 0.5л", price: 60, desc: "Кыргыздын улуттук ачытылган пайдалуу суусундугу.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400" },
    { id: 34, cat: "drinks", kg: "Fanta 1л", ru: "Fanta 1л", price: 85, desc: "Апельсин даамындагы газдуу суусундук.", img: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400" },
    { id: 35, cat: "drinks", kg: "Sprite 1л", ru: "Sprite 1л", price: 85, desc: "Лимон жана лайм даамындагы сергитүүчү суусундук.", img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400" },
    { id: 36, cat: "drinks", kg: "Суу (Газсыз) 0.5л", ru: "Вода без газа 0.5л", price: 30, desc: "Таза булак суусу.", img: "https://images.unsplash.com/photo-1548919973-5dea585f3951?w=400" },
    { id: 37, cat: "drinks", kg: "Кофе Американо", ru: "Кофе Американо", price: 90, desc: "Жаңы тартылган кофе дандарынан.", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },
    { id: 38, cat: "drinks", kg: "Кофе Капучино", ru: "Кофе Капучино", price: 120, desc: "Жумшак сүт көбүгү менен кофе.", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400" },
    { id: 39, cat: "drinks", kg: "Компот 1л", ru: "Компот 1л", price: 100, desc: "Үй шартында кургатылган жемиштерден жасалган.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400" },
    { id: 40, cat: "drinks", kg: "Айран 0.5л", ru: "Кефир 0.5л", price: 50, desc: "Муздак жана табигый айран.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400" }
];

let cart = [];
let lang = 'kg';
let selectedFood = null;

const noImg = "https://via.placeholder.com/400x300?text=Nookat+Go";

// Менюну чыгаруу
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

// Тандалган тамакты көрсөтүү (Модалдык терезе)
window.addToCart = (id) => {
    selectedFood = foods.find(x => x.id === id);
    if (selectedFood) {
        document.getElementById('prevImg').src = selectedFood.img;
        document.getElementById('prevImg').onerror = function() { this.src = noImg; };
        document.getElementById('prevName').innerText = lang === 'kg' ? selectedFood.kg : selectedFood.ru;
        
        // Сүрөттөмөнү кошуу (Эгер HTMLде <p id="prevDesc"></p> болсо)
        const descEl = document.getElementById('prevDesc');
        if (descEl) descEl.innerText = selectedFood.desc;

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
    const delInput = document.getElementById('delivery');
    const del = delInput ? parseInt(delInput.value || 0) : 0;
    const finalSumElement = document.getElementById('finalSum');
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
    if(e) e.target.classList.add('active');
    renderMenu(c === 'all' ? foods : foods.filter(f => f.cat === c));
};

window.toggleMbank = (v) => {
    const mbInfo = document.getElementById('mbankBox');
    if(mbInfo) mbInfo.style.display = v === 'MBANK' ? 'block' : 'none';
};

window.closeCart = () => document.getElementById('cartModal').style.display = 'none';
window.copyMB = () => { 
    navigator.clipboard.writeText("0556616174"); 
    alert("Номер көчүрүлдү!"); 
};

window.setLang = (l) => {
    lang = l;
    document.getElementById('l-kg').className = l === 'kg' ? 'active' : '';
    document.getElementById('l-ru').className = l === 'ru' ? 'active' : '';
    document.getElementById('h-title').innerText = l === 'kg' ? "Ноокаттагы эң мыкты даамдар" : "Лучшая еда в Ноокате";
    renderMenu();
};

// Ишти баштоо
renderMenu();

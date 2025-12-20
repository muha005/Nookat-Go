<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

    // 1. Firebase конфигурациясы
    const firebaseConfig = {
        apiKey: "AIzaSyCjsFILpJUY9K1gyJx-f8-9BkFu7T3-g-A",
        authDomain: "nookat-go-6fcf5.firebaseapp.com",
        projectId: "nookat-go-6fcf5",
        databaseURL: "https://nookat-go-6fcf5-default-rtdb.firebaseio.com/",
        appId: "1:423808562168:web:7cabb4d7b6415d0fcd5c0d"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // 2. Маалыматтар базасы (Меню)
    const products = [
        { id: 1, cat: "national", cafe: "Ордо", name_kg: "Ош ашы (Плов)", name_ru: "Ошский Плов", price: 250, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
        { id: 2, cat: "national", cafe: "Алай", name_kg: "Чоюлма Лагман", name_ru: "Тянутый Лагман", price: 220, img: "https://images.unsplash.com/photo-1512058560366-cd2427ff542c" },
        { id: 3, cat: "fastfood", cafe: "Burger House", name_kg: "Чизбургер", name_ru: "Чизбургер", price: 180, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
        { id: 4, cat: "fastfood", cafe: "Burger House", name_kg: "Шаурма (Тоок)", name_ru: "Шаурма (Куриная)", price: 160, img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
        { id: 5, cat: "pizza", cafe: "Dodo", name_kg: "Пицца Маргарита", name_ru: "Пицца Маргарита", price: 450, img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50" },
        { id: 6, cat: "pizza", cafe: "Dodo", name_kg: "Пицца Ассорти", name_ru: "Пицца Ассорти", price: 550, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
        { id: 7, cat: "drinks", cafe: "Маркет", name_kg: "Coca-Cola 1л", name_ru: "Coca-Cola 1л", price: 85, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97" },
        { id: 8, cat: "drinks", cafe: "Маркет", name_kg: "Чай", name_ru: "Чай", price: 30, img: "https://images.unsplash.com/photo-1544787210-2211d7c928c7" }
    ];

    let cart = [];
    let currentLang = 'kg';

    // 3. Тил которуу функциясы
    window.changeLang = (l) => {
        currentLang = l;
        document.getElementById('lang-kg').classList.toggle('active', l === 'kg');
        document.getElementById('lang-ru').classList.toggle('active', l === 'ru');
        document.getElementById('hero-title').innerText = l === 'kg' ? "Ноокаттагы эң мыкты даамдар" : "Лучшая еда в Ноокате";
        document.getElementById('cartText').innerText = l === 'kg' ? "СЕБЕТ" : "КОРЗИНА";
        window.renderMenu();
    };

    // 4. Менюну экранга чыгаруу
    window.renderMenu = (data = products) => {
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = data.map(p => `
            <div class="food-card" onclick="window.openProduct(${p.id})">
                <img src="${p.img}">
                <div class="card-info">
                    <h3>${currentLang === 'kg' ? p.name_kg : p.name_ru}</h3>
                    <p style="font-size: 12px; color: #777;">${p.cafe}</p>
                    <span class="card-price">${p.price} сом</span>
                </div>
            </div>
        `).join('');
    };

    // 5. Продуктту ачуу (Модал)
    window.openProduct = (id) => {
        const p = products.find(x => x.id === id);
        document.getElementById('modalImg').src = p.img;
        document.getElementById('modalName').innerText = currentLang === 'kg' ? p.name_kg : p.name_ru;
        const btn = document.getElementById('addBtnAction');
        btn.innerText = currentLang === 'kg' ? `Кошуу - ${p.price}с` : `Добавить - ${p.price}с`;
        btn.onclick = () => {
            cart.push(p);
            window.updateCartUI();
            window.closeProduct();
        };
        document.getElementById('productModal').style.display = 'flex';
    };

    // 6. Себеттин UI жаңылоо
    window.updateCartUI = () => {
        const subtotal = cart.reduce((a, b) => a + b.price, 0);
        document.getElementById('cartCount').innerText = cart.length;
        document.getElementById('cartSum').innerText = subtotal;
        document.getElementById('cartBar').style.display = cart.length > 0 ? 'flex' : 'none';
    };

    // 7. Себетти ачуу
    window.showCart = () => {
        document.getElementById('cartModal').style.display = 'flex';
        const list = document.getElementById('cartList');
        list.innerHTML = cart.map((item, i) => `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid #eee;">
                <span style="font-size:14px;">${currentLang === 'kg' ? item.name_kg : item.name_ru}</span>
                <b>${item.price}с <button onclick="window.removeItem(${i})" style="color:red; border:none; background:none; font-size:18px; margin-left:10px; cursor:pointer;">✕</button></b>
            </div>
        `).join('');
        window.calculateTotal();
    };

    window.removeItem = (i) => {
        cart.splice(i, 1);
        window.updateCartUI();
        window.showCart();
        if(cart.length === 0) window.closeCart();
    };

    window.calculateTotal = () => {
        const sub = cart.reduce((a, b) => a + b.price, 0);
        const del = parseInt(document.getElementById('deliveryType').value);
        document.getElementById('finalSum').innerText = sub + del;
    };

    window.toggleMbank = (v) => {
        document.getElementById('mbankDetails').style.display = v === 'MBANK' ? 'block' : 'none';
    };

    // 8. ЗАКАЗДЫ ЖӨНӨТҮҮ (Firebase + WhatsApp)
    window.checkout = async () => {
        const name = document.getElementById('userName').value.trim();
        const addr = document.getElementById('userAddress').value.trim();
        const pay = document.getElementById('paymentMethod').value;
        const final = document.getElementById('finalSum').innerText;

        if(!name || !addr) {
            alert(currentLang === 'kg' ? "Сураныч, атыңызды жана дарегиңизди жазыңыз!" : "Пожалуйста, введите имя и адрес!");
            return;
        }

        const itemsText = cart.map(i => `${currentLang === 'kg' ? i.name_kg : i.name_ru} (${i.cafe})`).join(", ");

        try {
            // Адегенде Firebase'ге жазабыз
            const ordersRef = ref(database, 'orders');
            const newOrderRef = push(ordersRef);
            
            await set(newOrderRef, {
                customerName: name,
                address: addr,
                items: itemsText,
                totalPrice: final,
                paymentMethod: pay,
                status: "new",
                timestamp: serverTimestamp()
            });

            // Базага жазылгандан кийин WhatsApp билдирүү түзөбүз
            const phone = "996556616174";
            const whatsappMsg = `🚀 *ЖАҢЫ ЗАКАЗ: NOOKAT GO*\n\n` +
                                `👤 *Кардар:* ${name}\n` +
                                `📍 *Дарек:* ${addr}\n` +
                                `🍴 *Тамактар:* ${itemsText}\n` +
                                `💳 *Төлөм:* ${pay}\n` +
                                `💰 *Жалпы сумма:* ${final} сом`;

            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

            // Тазалоо
            cart = [];
            window.updateCartUI();
            window.closeCart();
            alert(currentLang === 'kg' ? "Заказыңыз кабыл алынды!" : "Ваш заказ принят!");

        } catch (e) {
            console.error("Firebase Error:", e);
            alert("Ката кетти: " + e.message);
        }
    };

    // Жардамчы функциялар
    window.closeProduct = () => document.getElementById('productModal').style.display = 'none';
    window.closeCart = () => document.getElementById('cartModal').style.display = 'none';
    window.copyNumber = () => { 
        navigator.clipboard.writeText("0556616174"); 
        alert(currentLang === 'kg' ? "Номер көчүрүлдү!" : "Номер скопирован!"); 
    };
    
    window.searchFood = () => {
        const val = document.getElementById('searchInput').value.toLowerCase();
        const filtered = products.filter(p => 
            p.name_kg.toLowerCase().includes(val) || 
            p.name_ru.toLowerCase().includes(val) || 
            p.cafe.toLowerCase().includes(val)
        );
        window.renderMenu(filtered);
    };

    window.filterMenu = (c, e) => {
        document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        window.renderMenu(c === 'all' ? products : products.filter(p => p.cat === c));
    };

    // Сайт ачылганда менюну иштетүү
    window.renderMenu();
</script>


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
        // 1. Firebase'ге жазуу (күтөбүз)
        const ordersRef = ref(db, 'orders');
        await set(push(ordersRef), {
            customerName: n,
            address: a,
            items: itemsText,
            totalPrice: s,
            paymentMethod: p,
            timestamp: serverTimestamp()
        });

        // 2. Телефондор үчүн ЭҢ ИШЕНИМДҮҮ WhatsApp шилтемеси
        const waUrl = `https://api.whatsapp.com/send?phone=996556616174&text=${encodeURIComponent(msg)}`;
        
        // Себетти тазалоо
        cart = [];
        updateBar();
        window.closeCart();

        // 3. Түз багыттоо (Телефондо 100% иштейт)
        window.location.assign(waUrl);

    } catch (error) {
        console.error("Ката кетти:", error);
        // Эгер база иштебей калса да, WhatsApp ачыла бериши үчүн:
        const waUrlFallback = `https://api.whatsapp.com/send?phone=996556616174&text=${encodeURIComponent(msg)}`;
        window.location.assign(waUrlFallback);
    }
};

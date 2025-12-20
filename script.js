window.sendOrder = async () => {
    const n = document.getElementById('uName').value.trim();
    const a = document.getElementById('uAddr').value.trim();
    const p = document.getElementById('payment').value;
    const s = document.getElementById('finalSum').innerText;

    if (!n || !a) {
        alert(lang === 'kg' ? "Атыңызды жана дарегиңизди жазыңыз!" : "Введите имя и адрес!");
        return;
    }

    const itemsText = cart.map(f => `${lang === 'kg' ? f.kg : f.ru}`).join(", ");
    
    // WhatsApp билдирүүсүнүн тексти
    const msg = `🚀 *ЖАҢЫ ЗАКАЗ: NOOKAT GO*\n\n` +
                `👤 *Кардар:* ${n}\n` +
                `📍 *Дарек:* ${a}\n` +
                `🍴 *Тамактар:* ${itemsText}\n` +
                `💳 *Төлөм:* ${p}\n` +
                `💰 *Жалпы:* ${s} сом`;

    const waUrl = `https://api.whatsapp.com/send?phone=996556616174&text=${encodeURIComponent(msg)}`;

    // 1. Адегенде WhatsApp'ты ачуу (Телефондо бул эң маанилүү)
    window.location.assign(waUrl);

    // 2. Андан кийин базага жазуу (фондо иштей берет)
    try {
        const ordersRef = ref(db, 'orders');
        push(ordersRef, {
            customerName: n,
            address: a,
            items: itemsText,
            totalPrice: s,
            paymentMethod: p,
            timestamp: serverTimestamp()
        });
        
        // Себетти тазалоо
        cart = [];
        updateBar();
        window.closeCart();
    } catch (error) {
        console.log("Firebase жазууда ката чыкты, бирок заказ кетти.");
    }
};


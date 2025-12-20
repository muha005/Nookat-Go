window.sendOrder = async () => {
    const name = document.getElementById('uName').value.trim();
    const address = document.getElementById('uAddr').value.trim();
    const payment = document.getElementById('payment').value;
    const total = document.getElementById('finalSum').innerText;

    if (!name || !address) {
        alert(lang === 'kg'
            ? "Сураныч, атыңызды жана дарегиңизди жазыңыз!"
            : "Пожалуйста, введите имя и адрес!");
        return;
    }

    if (cart.length === 0) {
        alert(lang === 'kg'
            ? "Себет бош!"
            : "Корзина пуста!");
        return;
    }

    const itemsText = cart
        .map((f, i) => ${i + 1}. ${lang === 'kg' ? f.kg : f.ru} – ${f.price} сом)
        .join('\n');

    // 📩 WhatsApp хабарламаси
    const message =
`🚀 ЖАҢЫ ЗАКАЗ (Nookat Go)

👤 Кардар: ${name}
📍 Дарек: ${address}

🍴 Тамактар:
${itemsText}

💳 Төлөм: ${payment}
💰 Жалпы сумма: ${total} сом`;

    // ✅ 1. iOS учун аввал WhatsApp очамиз
    const phone = "996556616174";
    const waUrl = https://wa.me/${phone}?text=${encodeURIComponent(message)};
    window.open(waUrl, "_blank");

    // ✅ 2. Кейин Firebase’га ёзамиз
    try {
        const ordersRef = ref(db, 'orders');
        await set(push(ordersRef), {
            customerName: name,
            address: address,
            items: cart.map(f => ({
                name_kg: f.kg,
                name_ru: f.ru,
                price: f.price
            })),
            totalPrice: total,
            paymentMethod: payment,
            createdAt: serverTimestamp()
        });

        // 🧹 Себетни тозалаш
        cart = [];
        updateBar();
        window.closeCart();

        alert(lang === 'kg'
            ? "Заказыңыз кабыл алынды! WhatsApp'ка жиберилди ✅"
            : "Заказ принят! Отправлено в WhatsApp ✅");

    } catch (error) {
        console.error("Firebase ката:", error);
        alert("Ката кетти. Кайра аракет кылыңыз.");
    }
};

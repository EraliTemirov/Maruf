module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const name = data.name || "Noma'lum";
    const phone = data.phone || "Ko'rsatilmagan";
    const product = data.product || "Ko'rsatilmagan";
    const quantity = data.quantity || "Ko'rsatilmagan";
    const message = data.message || "Izoh yo'q";
    const timeStr = data.submittedAt || new Date().toISOString();

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const tgLink = cleanPhone ? `https://t.me/+${cleanPhone}` : 'https://t.me';
    const text = `🔔 <b>YANGI BUYURTMA SO'ROVI</b>\n👤 <b>Mijoz:</b> ${name}\n📞 <b>Telefon:</b> ${phone}\n👕 <b>Mahsulot:</b> ${product}\n📦 <b>Miqdori:</b> ${quantity} dona\n💬 <b>Xabar:</b> ${message}`;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram is not configured' });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const tgData = await tgRes.json();
    return res.status(200).json({ status: 'success', message: 'Inquiry received', telegram: tgData.ok });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

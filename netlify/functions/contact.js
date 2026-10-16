exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const name = data.name || "Noma'lum";
    const phone = data.phone || "Ko'rsatilmagan";
    const product = data.product || "Ko'rsatilmagan";
    const quantity = data.quantity || "Ko'rsatilmagan";
    const message = data.message || "Izoh yo'q";
    const timeStr = data.submittedAt || new Date().toISOString();

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const tgLink = cleanPhone ? `https://t.me/+${cleanPhone}` : 'https://t.me';
    const text = `🔔 <b>YANGI BUYURTMA SO'ROVI (JAMO TEXTILE)</b>\n━━━━━━━━━━━━━━━━━━━━━\n👤 <b>Mijoz:</b> ${name}\n📞 <b>Telefon:</b> <code>${phone}</code>\n👕 <b>Mahsulot:</b> ${product}\n📦 <b>Miqdori:</b> ${quantity} dona\n💬 <b>Xabar/Talab:</b> ${message}\n⏰ <b>Vaqt:</b> ${timeStr}\n━━━━━━━━━━━━━━━━━━━━━\n👉 <a href="${tgLink}">Mijozga Telegram orqali yozish</a>`;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Telegram is not configured' }) };
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ status: 'success', message: 'Inquiry received' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

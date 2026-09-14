export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  try {
    const update = req.body;

    if (!update || !update.message) {
      return res.status(200).json({ ok: true });
    }

    const message = update.message;
    const chatId = message.chat.id;
    const text = message.text || "";

    if (text === "/app" || text.startsWith("/app@")) {
      const response = await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: "🚀 Veda Service\n\nОткройте приложение, чтобы продолжить 👇",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚀 Открыть Veda Service",
                    url: "https://t.me/VedaService_Support_bot/directlink"
                  }
                ]
              ]
            }
          })
        }
      );

      const result = await response.json();

      return res.status(200).json(result);
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}

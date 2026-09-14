export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(200).send("VedaService bot is running");
    }

    try {
        const update = req.body;

        const message = update?.message;

        if (!message) {
            return res.status(200).json({ ok: true });
        }

        const chatId = message.chat.id;
        const text = message.text || "";

        // Реагируем на команду /app
        if (text === "/app" || text.startsWith("/app@")) {

            const telegramUrl =
                `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

            const response = await fetch(telegramUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text:
                        "🚀 Veda Service\n\n" +
                        "Откройте приложение, чтобы продолжить 👇",
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
            });

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

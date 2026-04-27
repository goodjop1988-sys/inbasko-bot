const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 БЕРЕМ ИЗ ENV
const BOTS = {
  bonus: {
    token: process.env.BOT_TOKEN_BONUS,
    chat: process.env.CHAT_ID_BONUS
  },
  service: {
    token: process.env.BOT_TOKEN_SERVICE,
    chat: process.env.CHAT_ID_SERVICE
  },
  training: {
    token: process.env.BOT_TOKEN_TRAINING,
    chat: process.env.CHAT_ID_TRAINING
  }
};

app.post("/send", async (req, res) => {
  try {
    const { name, phone, course, comment, source } = req.body;

    const bot = BOTS[source];

    // ❗ проверка source
    if (!bot) {
      return res.status(400).json({ error: "Неизвестный источник" });
    }

    // ❗ проверка ENV
    if (!bot.token || !bot.chat) {
      return res.status(500).json({ error: "Не настроен ENV" });
    }

    const text = `
🔥 INBASKO

Источник: ${source}
Имя: ${name}
Телефон: ${phone}
Курс: ${course || "не указан"}
Комментарий: ${comment || "нет"}
`;

    const response = await fetch(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: bot.chat,
        text: text
      })
    });

    const data = await response.text();
    console.log("TELEGRAM RESPONSE:", data);

    res.json({ status: "ok" });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ status: "error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Сервер запущен");
});
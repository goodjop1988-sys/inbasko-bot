const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 ВСТАВЬ СВОИ ДАННЫЕ (3 бота)
const BOTS = {
  bonus: {
    token: "TOKEN_1",
    chat: "CHAT_ID_1"
  },
  service: {
    token: "TOKEN_2",
    chat: "CHAT_ID_2"
  },
service: {
    token: "TOKEN_3",
    chat: "CHAT_ID_3"
  },

  training: {
    token: "TOKEN_4",
    chat: "CHAT_ID_4"
  }
};

app.post("/send", async (req, res) => {
  try {
    const { name, phone, course, comment, source } = req.body;

    const bot = BOTS[source];

    if (!bot) {
      return res.status(400).json({ error: "Неизвестный источник" });
    }

    const text = `
Новая заявка INBASKO:

Источник: ${source}
Имя: ${name}
Телефон: ${phone}
Курс: ${course || "не указан"}
Комментарий: ${comment || "нет"}
`;

    await fetch(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: bot.chat,
        text: text
      })
    });

    res.json({ status: "ok" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Сервер запущен: http://localhost:3000");
});
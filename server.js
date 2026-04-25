const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = "953144037";
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

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: text
  })
});

    res.json({ status: "ok" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});

// ❗ ВАЖНО ДЛЯ RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Сервер запущен");
});
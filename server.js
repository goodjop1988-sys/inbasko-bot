const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 ТВОИ ДАННЫЕ
const BOT_TOKEN = "8575979739:AAHD06E8SBmJB3D7URRJSSnhk_1yCs-yx14";
const CHAT_ID = "953144037";

app.post("/send", async (req, res) => {
  try {
    const { name, phone, course, comment } = req.body;

    const text = `
Новая заявка INBASKO:

Имя: ${name}
Телефон: ${phone}
Курс: ${course || "не указан"}
Комментарий: ${comment || "нет"}
`;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
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

// порт для Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Сервер запущен");
});
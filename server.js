// Steel Form — Telegram заявки
// Запуск:
// 1) установите Node.js 18+
// 2) npm install
// 3) создайте .env из .env.example и впишите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
// 4) npm start
//
// ВАЖНО: токен Telegram-бота хранится только на сервере и не попадает в HTML.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/api/lead", async (req, res) => {
  try {
    if (!TOKEN || !CHAT_ID) {
      return res.status(500).json({ok:false, error:"Telegram не настроен на сервере"});
    }

    const {name, phone, trainer, plan} = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ok:false, error:"Заполните имя и телефон"});
    }

    const text =
`🏋️ НОВАЯ ЗАЯВКА — STEEL FORM

👤 Имя: ${String(name).slice(0,100)}
📞 Телефон: ${String(phone).slice(0,50)}
👨‍🏫 Тренер: ${String(trainer || "Не выбран").slice(0,100)}
💳 Абонемент: ${String(plan || "Не указан").slice(0,150)}

Заявка пришла с сайта Steel Form.`;

    const tg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({chat_id: CHAT_ID, text})
    });

    const result = await tg.json();
    if (!result.ok) {
      console.error(result);
      return res.status(502).json({ok:false, error:"Telegram не принял сообщение"});
    }

    res.json({ok:true});
  } catch (e) {
    console.error(e);
    res.status(500).json({ok:false, error:"Ошибка сервера"});
  }
});

app.listen(PORT, () => console.log(`Steel Form: http://localhost:${PORT}`));

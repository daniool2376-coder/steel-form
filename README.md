# Steel Form + Telegram

## 1. Создать бота
В Telegram откройте @BotFather и создайте бота командой /newbot.
Полученный токен вставьте в `.env` как TELEGRAM_BOT_TOKEN.

## 2. Получить chat_id
Откройте созданного бота и отправьте ему `/start`.
Затем можно получить ID чата через:
https://api.telegram.org/botВАШ_ТОКЕН/getUpdates
В ответе найдите `message.chat.id` и вставьте его в `.env` как TELEGRAM_CHAT_ID.

## 3. Запуск
Требуется Node.js 18+.

```bash
npm install
npm start
```

Откройте http://localhost:3000

## 4. Важно
Не вставляйте TELEGRAM_BOT_TOKEN непосредственно в HTML/JavaScript сайта.
Токен должен оставаться на сервере.

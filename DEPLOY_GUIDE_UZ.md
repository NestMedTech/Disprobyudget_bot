# Telegram Bot Serverga Joylashtirish Qo'llanmasi (Deployment Guide)

Ushbu yo'riqnomada Python Telegram botni Linux (Ubuntu) serverida PM2 yordamida fonda (background) uzluksiz ishga tushirish qadamlari keltirilgan.

---

## 1-Bosqich: Serverni tayyorlash

Tizim paketlarini yangilang va kerakli dasturlar (Python, Node.js, PM2) ni o'rnating:

1. Tizimni yangilash:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. Python va virtual muhit yaratuvchisini o'rnatish:
   ```bash
   sudo apt install -y python3 python3-pip python3-venv git curl
   ```

3. Node.js va NPM (PM2 uchun kerak) o'rnatish:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

4. PM2 dasturini global o'rnatish:
   ```bash
   sudo npm install -g pm2
   ```

---

## 2-Bosqich: Loyihani serverga yuklash

1. Loyiha fayllarini serveringizning maxsus papkasiga yuklang (masalan, `~/pr/telegram_botlar/budgethisobchi`):
   ```bash
   mkdir -p ~/pr/telegram_botlar/budgethisobchi
   cd ~/pr/telegram_botlar/budgethisobchi
   # Fayllarni SFTP/SCP orqali shu yerga yuklang
   ```

2. `.env` faylini sozlash:
   `.env.example` faylidan nusxa oling yoki yangi `.env` yarating:
   ```bash
   cp .env.example .env
   nano .env
   ```

   Bot tokenini va boshlang'ich admin ma'lumotlarini kiriting:
   ```env
   TELEGRAM_BOT_TOKEN="Sizning_Telegram_Bot_Tokeningiz"
   ADMIN_TELEGRAM_ID="Sizning_Telegram_ID"
   ADMIN_USERNAME="admin_username"
   ```

---

## 3-Bosqich: Virtual muhit (venv) sozlash va Paketlarni o'rnatish

Python kutubxonalarini virtual muhitda izolyatsiya qilingan holda o'rnatamiz:

1. Virtual muhit yaratish:
   ```bash
   python3 -m venv venv
   ```

2. Virtual muhitni faollashtirib, requirements.txt dagi kutubxonalarni o'rnatish:
   ```bash
   source venv/bin/activate
   pip install -r requirements.txt
   deactivate
   ```

---

## 4-Bosqich: Botni PM2 orqali ishga tushirish

Loyihadagi `ecosystem.config.cjs` faylida python virtualenv yo'naltirilganligini tekshiramiz. Agar virtualenv ishlatilsa, PM2 virtualenv ichidagi python interpretatoridan foydalanishi kerak.

1. `ecosystem.config.cjs` faylida interpreter yo'li:
   ```javascript
   // ecosystem.config.cjs
   module.exports = {
     apps: [
       {
         name: "budget-telegram-bot",
         script: "bot_template.py",
         interpreter: "./venv/bin/python", // Virtual muhitdagi python
         autorestart: true,
         watch: false,
         max_memory_restart: "200M"
       }
     ]
   };
   ```

2. PM2 orqali botni ishga tushirish:
   ```bash
   pm2 start ecosystem.config.cjs
   ```

3. Server o'chib yonganda bot avtomatik qayta ishga tushishi (autostart) uchun sozlash:
   ```bash
   pm2 startup
   # Terminalda chiqqan sudo buyrug'ini nusxalab, ishga tushiring.
   pm2 save
   ```

---

## Foydali Komandalar

- **Bot holatini tekshirish**: `pm2 status`
- **Loglarni jonli ko'rish**: `pm2 logs budget-telegram-bot`
- **Botni qayta ishga tushirish**: `pm2 restart budget-telegram-bot`
- **Botni to'xtatish**: `pm2 stop budget-telegram-bot`

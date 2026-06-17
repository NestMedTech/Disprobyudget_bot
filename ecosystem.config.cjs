module.exports = {
  apps: [
    {
      name: "budget-telegram-bot",
      script: "bot_template.py",
      interpreter: "./venv/bin/python", // Linux serverda virtualenv python interpretatori
      autorestart: true,
      watch: false,
      max_memory_restart: "200M"
    }
  ]
};

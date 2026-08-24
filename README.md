# AI Insider — новий дизайн

Сайт AI Insider на Vite + React 19 із серверним endpoint для контактних
запитів.

## Локальний запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # збірка у dist/client
npm run test:sites
```

## Структура

| Шлях | Що це |
| --- | --- |
| `src/App.jsx` | вся сторінка: дані секцій і розмітка |
| `src/wow.jsx` | інтерактив: курсор, зерно, canvas-граф, термінал агента, пристрій із плеєром |
| `src/system.css` | дизайн-система і стилі всіх секцій |
| `public/assets/journey/` | відео героя (скрол-скраб) |
| `public/assets/studio/` | вертикальні ролики для секції AI-контенту |
| `api/contact.js` | Vercel endpoint, що передає заявки в Telegram |
| `worker/`, `scripts/`, `.openai/` | збірка під OpenAI Sites та endpoint форми |

## Герой

`hero.mp4` — один суцільний проїзд «хаос → система», 1920×1082, 48 fps,
764 кадри. Відео не грає саме: позиція прокрутки напряму задає
`currentTime`. Тому кодек із частими ключовими кадрами — інакше перемотка
смикається.

Заміна відео: покласти файл у `public/assets/journey/` і оновити `hero`
у `src/App.jsx`.

## Секція AI-контенту

Кожен напрям має свій ролик 9:16 у `public/assets/studio/`. Четвертий
напрям (`creative`) поки без відео — працює згенерований фолбек. Щоб
додати, впиши `video` і `poster` у масив `studio` в `src/App.jsx`.

## Деплой

Vercel, framework Vite, output directory `dist/client` — зафіксовано у
`vercel.json`.

## Контактна форма → Telegram

Додайте у Vercel Project Settings → Environment Variables:

| Змінна | Значення |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | токен бота від BotFather |
| `TELEGRAM_CHAT_ID` | ID приватного чату, групи або каналу |
| `TELEGRAM_THREAD_ID` | ID topic у forum-групі, необов’язково |

Після додавання змінних зробіть redeploy. Токен має залишатися лише на
сервері: не додавайте його у git і не використовуйте префікс `VITE_`.

Endpoint перевіряє поля, обмежує розмір запиту, екранує Telegram HTML,
фільтрує ботів через honeypot і має базовий rate limit. Інтерфейс показує
успіх лише після підтвердженої доставки повідомлення Telegram API.

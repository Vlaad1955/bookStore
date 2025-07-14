BookStore Frontend – README
Next 13/14 App Router – TypeScript – SCSS – Zustand – REST API

Швидкий старт

# 1. Встановити залежності

npm install # або yarn / pnpm

# 2. Запустити у dev-режимі

npm run dev

# 3. Продакшн-білд

npm run build # компілює у .next
npm run start # піднімає Node-сервер

Cкрипти
| Скрипт | Опис |
| ------- | ------------------------------------------------------- |
| dev | Локальний розвиток з Turbopack (гаряча перезбірка). |
| build | Продакшн-білд (static & server bundles). |
| start | Запуск зібраного Next-сервера. |
| lint | ESLint перевірка коду за конфігом eslint-config-next. |

Основні залежності
| Пакет | Навіщо потрібен |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| next | Фреймворк на базі React з SSR, App Router, Route Handlers та оптимізацією зображень. |
| react / react-dom | Бібліотека UI й рендер-двійка для браузера. |
| axios | HTTP-клієнт для запитів до бекенду; налаштовано перехоплювачі токенів. |
| zustand | Легковажний глобальний стейт-менеджер (кошик, auth, тощо). |
| react-hook-form | Керування формами без зайвих ререндерів. |
| @hookform/resolvers & joi | Валідація форм через Joi-схеми. |
| jwt-decode | Декодування JWT access-токенів на клієнті. |
| react-router-dom | Клієнтський роутинг всередині адмін-панелі (де не потрібен SSR). |
| react-toastify | Спливаючі повідомлення (toast’и) для успіху/помилок. |
| react-icons & @heroicons/react | SVG-ікони (Heroicons 2, FontAwesome, Lucide). |
| framer-motion | Анімації та motion-ефекти (карousal, модалки). |
| classnames | Умовні CSS-класи (cx). |
| sass / scss | Підтримка SCSS-модулів (styles.module.scss). |

Dev-залежності
| Пакет | Навіщо потрібен |
| ------------------------------- | ------------------------------------------------- |
| typescript | Статична типізація коду. |
| eslint & eslint-config-next | Лінтинг з правилами Next.js / React / TypeScript. |
| **@types/\*** | TypeScript тайпінги для Node, React, React-DOM. |

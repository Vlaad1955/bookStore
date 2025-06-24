# 📚 Онлайн-книгарня — API на NestJS

Це бекенд для онлайн-книгарні, створений за допомогою [NestJS](https://nestjs.com/).

# 🚀 Запуск проєкту

## Встановлення залежностей
npm install

## Запуск сервера у режимі розробки
npm run start:dev

## 📦 Основні залежності

@nestjs/common, @nestjs/core, @nestjs/swagger

typeorm — для роботи з БД

bcrypt — для хешування паролів

passport, jwt — для аутентифікації

supabase — для зберігання зображень

redis — для керування сесіями токенів

Swagger - API-документація

# 🔐Auth

Реалізовано повний цикл аутентифікації користувача, включаючи завантаження аватарів, реєстрацію, логін, оновлення токенів, вихід із системи.

Авторизація
Для захищених маршрутів використовується @UseGuards(AuthGuard()) із JWT.

>mail-нотифікації
Після реєстрації користувачу відправляється вітальний email за допомогою EmailService.

### Аутентифікація
Реєстрація
POST /auth/registration

multipart/form-data

Тіло: email, password, firstName, lastName, age, phone, image (файл) (опціонально)

📥 Завантажене зображення зберігається у Supabase. Якщо не передано — використовується аватар за замовчуванням.


### Логін
POST /auth/login

Тіло: email, password

📤 Відповідь:

json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}

### Вихід
POST /auth/logout
🔐 Requires Bearer Token

### Оновлення токенів
POST /auth/refresh

📤 Відповідь:
json
{
  "refreshToken": "..."
}

# 🛒 Basket

Функціонал дозволяє авторизованим користувачам додавати книги до кошика, видаляти окремі книги, очищати весь кошик і переглядати вміст.

> Усі маршрути вимагають авторизації (JWT Bearer Token).

### Отримати поточний кошик

ET /basket/find

Headers:
Authorization: Bearer <accessToken>

📤 Відповідь: Об'єкт кошика користувача:

json
{
"id": "basket-id",
"user": { ... },
"items": [
{
"id": "item-id",
"book": {
"id": "book-id",
"title": "Назва книги",
...
},
"quantity": 2
},
...
]
}

### Додати книгу до кошика

POST /basket/add

Headers:
Authorization: Bearer <accessToken>

Тіло:
json
  {
    "bookId": "string",
    "quantity": 2 // опціонально, за замовчуванням 1
  }
📤 Відповідь: Оновлений об'єкт кошика

### Видалити одну книгу з кошика

DELETE /basket/remove/:id

:id — bookId

Headers:
Authorization: Bearer <accessToken>

📤 Відповідь: Оновлений об'єкт кошика

### Очистити весь кошик

DELETE /basket/clear

Headers:
Authorization: Bearer <accessToken>

📤 Відповідь: Оновлений (порожній) об'єкт кошика

### 📘 Примітки

>Якщо книга вже є в кошику — її кількість збільшується.

>Якщо передати від'ємну кількість, вона буде приведена до 0.

>Якщо кошика в користувача ще немає — він створюється автоматично.

# 📚 Books

Модуль для керування книгами: створення, оновлення, публікація, отримання, фільтрація та видалення.

### Створення книги

POST /books/create-book

Headers:
Authorization: Bearer <accessToken>

Поле зображення: image

Тіло:
title: string;
price: number;
description?: string;
author?: string;
gift: boolean;
cover: 'soft' | 'firm';
categories: string[];

### Оновлення книги

PATCH /books/update/:id

Headers:
Authorization: Bearer <accessToken>

Тіло: (всі поля опціональні) title?: string;
price?: number;
description?: string;
author?: string;
image?: string;
gift?: boolean;
cover?: 'soft' | 'firm';
categories?: string[];

### Зміна статусу публікації

PUT /books/published/:id

Headers:
Authorization: Bearer <accessToken>

### Отримання списку книг

GET /books/list

### Отримання однієї книги

GET /books/find/:id

### Видалення книги

DELETE /books/delete/:id

Headers:
Authorization: Bearer <accessToken>

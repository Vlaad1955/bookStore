npm i - інсталювати модулі
npm run build - збілдити проект
npm install react@18.3.1 react-dom@18.3.1 next@15.2.2
npm run lint - перевірити на помилки код
npm run start/ npm start - запуск проекта
npm run dev - для роботи з кодом та його оновлення у реальному часі

............
✅ Кроки:

1. Переконайся, що ти на своїй гілці auth
   bash
   Copy
   Edit
   git checkout auth
2. Завантаж останні зміни з віддаленого репозиторію
   bash
   Copy
   Edit
   git fetch
3. Додай зміни з віддаленої гілки Backend/2 у свою
   bash
   Copy
   Edit
   git merge origin/Backend/2
   ⚠️ Тут origin/Backend/2 — це посилання на віддалену гілку, яку ти витягнув через git fetch
   ............

............
Добре, давай розберемося, як найкраще реалізувати фільтрацію та сортування книг за категоріями, щоб це працювало швидко, масштабувалося і не ламалося в майбутньому.

🔍 Мета
Коли користувач вибирає категорію, мають відображатися тільки книги цієї категорії, з можливістю сортування (наприклад, за ціною, назвою, автором).

🔧 Варіанти реалізації
✅ 1. На бекенді (рекомендовано)
Найефективніше реалізувати фільтрацію та сортування на бекенді, бо:

Даних може бути багато;

Не треба тягнути всі книги в клієнт;

Швидше завантаження сторінки;

Можна легко додати пагінацію.

Що для цього потрібно:

Додати до /books/list підтримку параметрів:

categoryId

sort (наприклад: price_asc, title_desc, тощо)

limit / offset або page / pageSize

Приклад запиту:

http
Копировать
Редактировать
GET /books/list?categoryId=123&sort=price_asc&page=1&pageSize=12
❗ Якщо бекенд не підтримує — тоді:
✅ 2. На фронтенді (тимчасово або як fallback)
Фільтрація:
Отримуєш всі книги (можна з обмеженням: наприклад, перші 1000);

Фільтруєш на клієнті ті, що мають потрібну категорію.

Сортування:
Так само — після фільтрації, сортуєш масив у JS за полем (наприклад, ціною або назвою).

🧩 Як реалізувати UI фільтрацію та сортування
📁 Структура:
category/[id]/page.tsx — сторінка категорії

components/BooksFilter.tsx — компонент сортування

components/BooksGrid.tsx — компонент для відображення книг

📦 Приклад сортування у React/Next:
tsx
Копировать
Редактировать
// BooksFilter.tsx
'use client';
import { useState } from "react";

export default function BooksFilter({ onSortChange }: { onSortChange: (sortBy: string) => void }) {
return (
<select
className="border p-2 rounded"
onChange={(e) => onSortChange(e.target.value)} >

<option value="default">Сортувати</option>
<option value="price_asc">Ціна ↑</option>
<option value="price_desc">Ціна ↓</option>
<option value="title_asc">Назва A-Z</option>
<option value="title_desc">Назва Z-A</option>
</select>
);
}
tsx
Копировать
Редактировать
// CategoryPage (частина компонента)
'use client';
import { useState, useEffect } from "react";
import BooksFilter from "@/components/BooksFilter";
import BooksGrid from "@/components/BooksGrid";

export default function CategoryPage({ categoryId, allBooks }) {
const [sortBy, setSortBy] = useState("default");

const filteredBooks = allBooks.filter((book: any) =>
book.categories?.some((cat: any) => cat.id === categoryId)
);

const sortedBooks = [...filteredBooks].sort((a, b) => {
if (sortBy === "price_asc") return a.price - b.price;
if (sortBy === "price_desc") return b.price - a.price;
if (sortBy === "title_asc") return a.title.localeCompare(b.title);
if (sortBy === "title_desc") return b.title.localeCompare(a.title);
return 0;
});

return (

<div>
<BooksFilter onSortChange={setSortBy} />
<BooksGrid books={sortedBooks} />
</div>
);
}
✅ Висновок

Підхід Коли обирати Плюси Мінуси
На бекенді Найкращий, довготривалий Швидко, гнучко, масштабовано Потрібна зміна API
На фронтенді Якщо API не дозволяє Просто реалізувати Повільно, не масштабовано

....................

SSSRRRR

Дуже важливе уточнення — ти використовуєш Next.js App Router (директорія /app/), а getServerSideProps працює тільки з Pages Router (директорія /pages/).

❌ Проблема
getServerSideProps не можна використовувати в App Router, тобто у файлах типу:

swift
Copy
Edit
src/app/my-account/news/page.tsx
Тому помилка:

latex
Copy
Edit
Ecmascript file had an error
export const getServerSideProps ...
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
✅ Рішення: Як робити SSR у App Router
У App Router SSR виконується автоматично — треба лише зробити компонент асинхронним і зробити fetch або запит в API у самому компоненті.

🔧 Як переписати page.tsx для SSR у App Router
tsx
Copy
Edit
// src/app/my-account/news/page.tsx

import { newsApi } from "@/shared/api/news/news-api";
import React from "react";
import { notFound } from "next/navigation";

type NewsItem = {
id: string;
title: string;
content: string;
category: "general" | "promotion" | "event";
image?: string;
};

type NewsData = {
page: number;
pages: number;
countItems: number;
entities: NewsItem[];
};

export default async function NewsPage({ searchParams }: {
searchParams: {
title?: string;
category?: "general" | "promotion" | "event";
sort?: string;
order?: "ASC" | "DESC";
page?: string;
limit?: string;
};
}) {
try {
const res = await newsApi.getNewsList({
title: searchParams.title,
category: searchParams.category,
sort: searchParams.sort,
order: searchParams.order,
page: Number(searchParams.page) || 1,
limit: Number(searchParams.limit) || 10,
});

    const newsData: NewsData = res.data;

    return (
      <div>
        <h1>Список новин</h1>
        {newsData.entities.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <p>Категорія: {item.category}</p>
          </div>
        ))}
      </div>
    );

} catch (error) {
console.error("❌ Failed to fetch news:", error);
return notFound();
}
}
✅ І ще:
У App Router SSR працює автоматично, якщо компонент page.tsx є async і не використовує use client.

Не використовуй use client на початку файлу!

Дані будуть завантажені на сервері перед рендером — тобто це і є SSR в App Router.

🧩 Твій файл news.ts лишається таким же:
ts
Copy
Edit
// shared/api/news/news.ts

import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

export const newsApi = {
getNewsList: (params: {
title?: string;
category?: "general" | "promotion" | "event";
sort?: string;
order?: "ASC" | "DESC";
page?: number;
limit?: number;
}) => axiosInstance.get("/news/list", { params }),
};
🔄 Хочеш — можу допомогти додати фільтри, пагінацію або зберігати стейт у Zustand після SSR.
W

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useBookStore } from "@/shared/store/UseBookStore";
// import { getBooksInOneCategory } from "@/shared/api/books/books-api";
// import { cleanParams } from "@/shared/utils/cleanParams";
// import { Book } from "@/shared/types/bookTypes/bookTypes";
// import BookList from "@/components/books/BookList";

// const BookPage: React.FC = () => {
//   const { selectedCategories } = useBookStore();

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 20,
//     title: "",
//     author: "",
//     price: "",
//     gift: "",
//     cover: "",
//     sort: "title",
//     order: "ASC",
//     categories: "",
//   });

//   useEffect(() => {
//     const categories = searchParams.get("categories");

//     const fetchBooks = async () => {
//       try {
//         const rawParams = {
//           ...filters,
//           categories: categories || "",
//         };

//         const data = await getBooksInOneCategory(cleanParams(rawParams));
//         setBooks(data.entities);
//       } catch (error) {
//         console.error("Помилка завантаження книг", error);
//       }
//     };

//     fetchBooks();
//   }, [filters, searchParams]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   function handleClick(id: string) {
//     router.push(`/dashboard/books/${id}`);
//   }

//   return (
//     <div>
//       <h1>Список книг</h1>
//       <h2>{selectedCategories.join(", ")}</h2>

//       {/* Фільтри */}
//       <input
//         name="title"
//         placeholder="Назва книги"
//         onChange={handleInputChange}
//       />
//       <input name="author" placeholder="Автор" onChange={handleInputChange} />
//       <select name="cover" onChange={handleInputChange}>
//         <option value="soft">М’яка</option>
//         <option value="firm">Тверда</option>
//       </select>

//       {/* Книги */}
//       <ul>
//         {books.map((book) => (
//           <BookList key={book.id} book={book} onClick={handleClick} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookPage;

import { getBooksInOneCategory } from "@/shared/api/books/books-api";
import { cleanParams } from "@/shared/utils/cleanParams";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import BookList from "@/components/books/BookList";

// interface Props {
//   searchParams: {
//     page?: string | string[];
//     limit?: string | string[];
//     title?: string | string[];
//     author?: string | string[];
//     price?: string | string[];
//     gift?: string | string[];
//     cover?: string | string[];
//     sort?: string | string[];
//     order?: string | string[];
//     categories?: string | string[];
//   };
// }

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

function getParam(value: string | string[] | undefined, defaultValue = "") {
  if (Array.isArray(value)) return value.join(",");
  return value ?? defaultValue;
}

export default async function BookPage({ searchParams }: Props) {
  const filters = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 20,
    title: getParam(searchParams.title),
    author: getParam(searchParams.author),
    price: getParam(searchParams.price),
    gift: getParam(searchParams.gift),
    cover: getParam(searchParams.cover),
    sort: getParam(searchParams.sort, "title"),
    order: getParam(searchParams.order, "ASC"),
    categories: getParam(searchParams.categories),
  };

  let books: Book[] = [];
  try {
    const data = await getBooksInOneCategory(cleanParams(filters));
    books = data.entities;
  } catch (error) {
    console.error("Помилка завантаження книг:", error);
  }

  return (
    <div>
      <h1>Список книг</h1>

      {/* Фільтри — використовують GET method для SSR фільтрації */}
      <form method="GET">
        <input
          name="title"
          placeholder="Назва книги"
          defaultValue={filters.title}
        />
        <input
          name="author"
          placeholder="Автор"
          defaultValue={filters.author}
        />
        <select name="cover" defaultValue={filters.cover}>
          <option value="">Обкладинка</option>
          <option value="soft">М’яка</option>
          <option value="firm">Тверда</option>
        </select>
        <button type="submit">Фільтрувати</button>
      </form>

      {/* Книги */}
      <ul>
        {books.map((book) => (
          <BookList key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}

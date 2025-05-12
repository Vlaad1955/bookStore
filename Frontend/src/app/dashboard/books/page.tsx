"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookStore } from "@/shared/store/UseBookStore";
import { getBooksInOneCategory } from "@/shared/api/books/books-api";
import { cleanParams } from "@/shared/utils/cleanParams";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import BookItem from "@/components/books/BookItem";

const BookList: React.FC = () => {
  const { selectedCategories } = useBookStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    title: "",
    author: "",
    price: "",
    gift: "",
    cover: "",
    sort: "title",
    order: "ASC",
    categories: "",
  });

  useEffect(() => {
    const categories = searchParams.get("categories");

    const fetchBooks = async () => {
      try {
        const rawParams = {
          ...filters,
          categories: categories || "",
        };

        const data = await getBooksInOneCategory(cleanParams(rawParams));
        setBooks(data.entities);
      } catch (error) {
        console.error("Помилка завантаження книг", error);
      }
    };

    fetchBooks();
  }, [filters, searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  function handleClick(id: string) {
    router.push(`/dashboard/books/${id}`);
  }

  return (
    <div>
      <h1>Список книг</h1>
      <h2>{selectedCategories.join(", ")}</h2>

      {/* Фільтри */}
      <input
        name="title"
        placeholder="Назва книги"
        onChange={handleInputChange}
      />
      <input name="author" placeholder="Автор" onChange={handleInputChange} />
      <select name="cover" onChange={handleInputChange}>
        <option value="soft">М’яка</option>
        <option value="firm">Тверда</option>
      </select>

      {/* Книги */}
      <ul>
        {books.map((book) => (
          <BookItem key={book.id} book={book} onClick={handleClick} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;

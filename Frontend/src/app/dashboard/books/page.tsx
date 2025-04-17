"use client";

import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
}

const BookList: React.FC = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    title: "",
    author: "",
    price: "",
    gift: "",
    cover: "",
    sort: "title",
    order: "ASC",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const cleanParams = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        );

        const { data } = await axiosInstance.get("/books/list", {
          params: cleanParams,
        });

        setBooks(data.entities);
      } catch (error) {
        console.error("Помилка завантаження книг", error);
      }
    };

    fetchBooks();
  }, [filters]);

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
          <li key={book.id}>
            <Image src={book.image} alt={book.title} width={50} height={50} />
            <strong>{book.title}</strong> — {book.author} — {book.price} грн
            <Button onClick={() => handleClick(book.id.toString())}>
              Go to Book
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

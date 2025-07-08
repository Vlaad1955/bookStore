"use client";

import React, { useEffect, useState } from "react";
import { Book } from "@/features/books/types/book";
import { cleanParams } from "@/shared/hooks/clean-params/cleanParams.hook";
import { objectToCleanURLSearchParams } from "@/features/books/hooks/objectToCleanURLSearchParams.hook";
import FavoriteWrapper from "./FavoriteWrapper";
import { getLikedBooks } from "../api/favorite";

type SearchParams = {
  page?: string;
  limit?: string;
  title?: string;
  author?: string;
  price?: string;
  gift?: string;
  cover?: string;
  sort?: string;
  order?: string;
};

export default function LikesClient({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  const filters = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 18,
    title: searchParams.title ?? "",
    author: searchParams.author ?? "",
    price: searchParams.price ?? "",
    gift: searchParams.gift ?? "",
    cover: searchParams.cover ?? "",
    sort: searchParams.sort ?? "title",
    order: searchParams.order ?? "ASC",
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getLikedBooks(cleanParams(filters));
        console.log(data);
        const all = await getLikedBooks(
          cleanParams({
            ...filters,
            author: undefined,
            gift: undefined,
            cover: undefined,
            title: undefined,
            page: undefined,
            limit: 10000,
          })
        );

        setBooks(data);
        setAllBooks(all);
      } catch (e) {
        console.error("Помилка при завантаженні", e);
      } finally {
      }
    };

    loadBooks();
  }, [searchParams]);

  console.log(books);

  const initialAuthors = Array.from(
    new Set(allBooks.map((book) => book.author))
  ).sort((a, b) => a.localeCompare(b));

  const urlParams = objectToCleanURLSearchParams(filters);

  return (
    <FavoriteWrapper
      initialAuthor={initialAuthors}
      books={books}
      currentPage={filters.page}
      totalPages={Math.ceil(allBooks.length / filters.limit)}
      params={urlParams}
    />
  );
}

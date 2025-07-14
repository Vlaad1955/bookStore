"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FavoriteWrapper from "./FavoriteWrapper";
import { objectToCleanURLSearchParams } from "@/features/books/hooks/objectToCleanURLSearchParams.hook";
import { useFavoriteBooksStore } from "../store/favorite";

export default function FavoriteLikesItems() {
  const { favorites, fetchFavorites } = useFavoriteBooksStore();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const get = (key: string) => searchParams.get(key) || "";

    return {
      page: Number(get("page")) || 1,
      limit: Number(get("limit")) || 18,
      title: get("title"),
      author: get("author"),
      price: get("price"),
      gift: get("gift"),
      cover: get("cover"),
      sort: get("sort") || "title",
      order: get("order") || "ASC",
    };
  }, [searchParams]);

  const [filteredBooks, setFilteredBooks] = useState(favorites);

  useEffect(() => {
    if (favorites.length === 0) {
      fetchFavorites();
    }
  }, [favorites.length, fetchFavorites]);

  useEffect(() => {
    const filtered = favorites.filter((book) => {
      const matchesTitle = filters.title
        ? book.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchesAuthor = filters.author
        ? book.author.toLowerCase().includes(filters.author.toLowerCase())
        : true;
      return matchesTitle && matchesAuthor;
    });

    setFilteredBooks(filtered);
  }, [favorites, filters]);

  const initialAuthors = Array.from(
    new Set(favorites.map((book) => book.author))
  ).sort((a, b) => a.localeCompare(b));

  const urlParams = objectToCleanURLSearchParams(filters);

  return (
    <FavoriteWrapper
      initialAuthor={initialAuthors}
      books={filteredBooks}
      currentPage={filters.page}
      totalPages={Math.ceil(filteredBooks.length / filters.limit)}
      params={urlParams}
    />
  );
}

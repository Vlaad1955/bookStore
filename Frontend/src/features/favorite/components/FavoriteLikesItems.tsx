"use client";

import { useEffect, useMemo } from "react";
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
      limit: Number(get("limit")) || 12,
      title: get("title"),
      authors: searchParams.getAll("author"),
      price: get("price"),
      gift: get("gift"),
      cover: get("cover"),
      sort: get("sort") || "title",
      order: get("order") || "ASC",
    };
  }, [searchParams]);

  const maxPrice = useMemo(() => {
    return favorites.length > 0
      ? Math.max(...favorites.map((book) => book.price))
      : 1000;
  }, [favorites]);

  useEffect(() => {
    if (favorites.length === 0) {
      fetchFavorites();
    }
  }, [favorites.length, fetchFavorites]);

  const filteredAllBooks = useMemo(() => {
    return favorites.filter((book) => {
      const matchesTitle = filters.title
        ? book.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;

      const matchesAuthors =
        filters.authors.length > 0
          ? filters.authors.includes(book.author)
          : true;

      const matchesCover = filters.cover
        ? book.cover?.toLowerCase() === filters.cover.toLowerCase()
        : true;

      const matchesGift = filters.gift
        ? String(book.gift).toLowerCase() === filters.gift.toLowerCase()
        : true;

      const matchesPrice = (() => {
        if (!filters.price.includes("-")) return true;
        const [minStr, maxStr] = filters.price.split("-");
        const min = Number(minStr);
        const max = Number(maxStr);
        if (isNaN(min) || isNaN(max)) return true;
        return book.price >= min && book.price <= max;
      })();

      return (
        matchesTitle &&
        matchesAuthors &&
        matchesCover &&
        matchesGift &&
        matchesPrice
      );
    });
  }, [favorites, filters]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (filters.page - 1) * filters.limit;
    return filteredAllBooks.slice(startIndex, startIndex + filters.limit);
  }, [filteredAllBooks, filters.page, filters.limit]);

  const initialAuthors = useMemo(
    () =>
      Array.from(new Set(favorites.map((book) => book.author))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [favorites]
  );

  const urlParams = objectToCleanURLSearchParams(filters);

  return (
    <FavoriteWrapper
      initialAuthor={initialAuthors}
      books={paginatedBooks}
      currentPage={filters.page}
      totalPages={Math.ceil(filteredAllBooks.length / filters.limit)}
      params={urlParams}
      maxPrice={maxPrice}
      totalFilteredBooks={filteredAllBooks.length}
    />
  );
}

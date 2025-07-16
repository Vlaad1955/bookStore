"use client";

import { useEffect, useState } from "react";
import { useFavoriteBooksStore } from "../store/favorite";

export const FavoriteLikesCounter = ({ bookId }: { bookId: string }) => {
  const fetchLikesCount = useFavoriteBooksStore(
    (state) => state.fetchLikesCount
  );
  const likesCount = useFavoriteBooksStore((state) => state.likesCount);
  const [mounted, setMounted] = useState(false);
  const count = likesCount[bookId];

  useEffect(() => {
    setMounted(true);
    fetchLikesCount(bookId);
  }, [bookId, fetchLikesCount]);

  if (!mounted) return null;

  if (!count || count === 0) return null;

  return <span>{count} ❤️</span>;
};

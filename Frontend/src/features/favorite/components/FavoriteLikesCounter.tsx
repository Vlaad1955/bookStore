import { useEffect } from "react";
import { useFavoriteBooksStore } from "../store/favorite";

export const LikesCounter = ({ bookId }: { bookId: string }) => {
  const fetchLikesCount = useFavoriteBooksStore(
    (state) => state.fetchLikesCount
  );
  const likesCount = useFavoriteBooksStore((state) => state.likesCount);
  const count = likesCount[bookId];

  useEffect(() => {
    fetchLikesCount(bookId);
  }, [bookId, fetchLikesCount]);

  if (!count || count === 0) return null;

  return <span>{count} ❤️</span>;
};

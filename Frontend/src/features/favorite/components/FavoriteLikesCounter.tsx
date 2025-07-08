import { useEffect } from "react";
import { useFavoriteBooksStore } from "../store/favorite";

export const LikesCounter = ({ bookId }: { bookId: string }) => {
  const fetchLikesCount = useFavoriteBooksStore(
    (state) => state.fetchLikesCount
  );
  const likesCount = useFavoriteBooksStore((state) => state.likesCount);

  useEffect(() => {
    fetchLikesCount(bookId);
  }, [bookId, fetchLikesCount]);

  return <span>{likesCount[bookId] ?? 0} в улюблених</span>;
};

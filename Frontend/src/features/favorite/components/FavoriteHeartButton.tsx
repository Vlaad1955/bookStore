import HeartIcon from "@/assets/icons/heartIcon";
import styles from "./styles.module.scss";
import { useFavoriteBooksStore } from "../store/favorite";
import { Book } from "@/features/books/types/book";

interface HeartButtonProps {
  book: Book;
  isAuthenticated?: boolean;
  onUnauthenticatedClick?: () => void;
}

export const FavoriteHeartButton = ({
  book,
  isAuthenticated,
  onUnauthenticatedClick,
}: HeartButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavoriteBooksStore();

  const handleClick = () => {
    if (!isAuthenticated) {
      onUnauthenticatedClick?.();
      return;
    }
    toggleFavorite(book.id.toString());
  };

  const active = isFavorite(book.id.toString());

  return (
    <HeartIcon
      onClick={handleClick}
      className={`${styles.favorite_heart} ${active ? styles.active : ""}`}
    />
  );
};

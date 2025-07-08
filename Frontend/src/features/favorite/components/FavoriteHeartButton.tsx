import HeartIcon from "@/assets/icons/heartIcon";
import styles from "./styles.module.scss";
import { useFavoriteBooksStore } from "../store/favorite";

interface HeartButtonProps {
  bookId: string;
  isAuthenticated: boolean;
  onUnauthenticatedClick?: () => void;
}

export const HeartButton = ({
  bookId,
  isAuthenticated,
  onUnauthenticatedClick,
}: HeartButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavoriteBooksStore();

  const handleClick = () => {
    if (!isAuthenticated) {
      onUnauthenticatedClick?.();
      return;
    }
    toggleFavorite(bookId);
  };

  const active = isFavorite(bookId);

  return (
    <HeartIcon
      onClick={handleClick}
      className={`${styles.favorite_heart} ${active ? styles.active : ""}`}
    />
  );
};

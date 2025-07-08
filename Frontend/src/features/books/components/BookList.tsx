"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ModalBasket from "../../../components/ui/modal/modal-basket/ModalBasket";
import { Button } from "../../../components/ui/button/Button";
import { useUserStore } from "@/features/user/store/UseUserStore";
import { useBasketStore } from "@/features/basket/store/basket";
import { Book } from "@/features/books/types/book";
import styles from "./styles.module.scss";
import { HeartButton } from "@/features/favorite/components/FavoriteHeartButton";
import { LikesCounter } from "@/features/favorite/components/FavoriteLikesCounter";

type BookListProps = {
  book: Book;
};

const BookList = ({ book }: BookListProps) => {
  const { addToBasket } = useBasketStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      addToBasket(book.id.toString(), 1);
    }
  };

  const isAuthenticated = Boolean(user);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
  };

  return (
    <article className={styles.book_item}>
      <div className={styles.book_card}>
        <div className={styles.book_card_item}>
          <HeartButton
            bookId={book.id.toString()}
            isAuthenticated={isAuthenticated}
            onUnauthenticatedClick={handleFavoriteClick}
          />

          <Link href={`/dashboard/books/${book.id}`}>
            <figure>
              <Image
                src={book.image}
                alt={book.title}
                width={500}
                height={500}
                className={styles.imggg}
              />
            </figure>
          </Link>
        </div>
      </div>

      <div className={styles.book_content}>
        <Link
          className={styles.book_card_name}
          href={`/dashboard/books/${book.id}`}
        >
          <span>{book.title}</span>
        </Link>

        <div className={styles.book_author}>
          <span>{book.author}</span>
        </div>
        <div className={styles.book_price}>
          <span>Ціна: {book.price} грн.</span>
          <LikesCounter bookId={book.id.toString()} />
        </div>
      </div>
      {book.published && (
        <span className={styles.book_published}>В наявності</span>
      )}
      <Button className={styles.book_basket} onClick={handleBuyClick}>
        Купити
      </Button>

      <ModalBasket
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => router.push("/auth/sign-in")}
      />
    </article>
  );
};

export default BookList;

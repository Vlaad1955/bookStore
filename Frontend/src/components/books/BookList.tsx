"use client";

import { Button } from "../ui/button/Button";
import Image from "next/image";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import { useBasketStore } from "@/shared/api/basket/basket-store";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalBasket from "../modal/ModalBasket";

type BookItemProps = {
  book: Book;
};

const BookList = ({ book }: BookItemProps) => {
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

  return (
    <div className={styles.book_item}>
      {/* Link to book details page */}
      <div className={styles.book_card}>
        <Link
          className={styles.book_card_item}
          href={`/dashboard/books/${book.id}`}
        >
          <div>
            <Image
              src={book.image}
              alt={book.title}
              width={100}
              height={100}
              className={styles.imggg}
            />
          </div>
        </Link>
      </div>

      {/* Book details */}
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
    </div>
  );
};

export default BookList;

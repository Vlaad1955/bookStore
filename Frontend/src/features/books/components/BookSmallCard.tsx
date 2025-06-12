"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { Book } from "@/features/books/types/book";
import styles from "@/features/books/components/styles.module.scss";

const bookSmallCard = ({ book }: { book: Book }) => {
  return (
    <Link
      href={`/dashboard/books/${book.id}`}
      className={styles.book_item_wrapper}
    >
      <div>
        <Image
          className={styles.book_item_image}
          src={book.image}
          alt={book.title}
          width={500}
          height={500}
        />
      </div>

      <div>
        <div className={styles.book_item_title}>{book.title}</div>
        <div className={styles.book_item_author}>{book.author}</div>

        <div className={styles.book_item_description_title}>
          Короткий опис книги
        </div>
        <div className={styles.book_item_description_body}>
          {book.description}
        </div>
      </div>

      <div className={styles.book_item_isbn}></div>
    </Link>
  );
};

export default bookSmallCard;

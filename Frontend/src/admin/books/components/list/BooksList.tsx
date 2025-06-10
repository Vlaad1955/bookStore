import React from "react";
import styles from "@/admin/books/components/list/styles.module.scss";
import { Book } from "@/features/books/types/book";
import BookCard from "@/admin/books/components/card/BookCard";

const BooksList = ({ books }: { books: Book[] }) => {
  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        {books.map((book) => (
          <li key={book.id} className={styles.listItem}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;

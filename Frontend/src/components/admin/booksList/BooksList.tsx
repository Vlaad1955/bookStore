import React from "react";
import styles from "@/components/admin/booksList/BooksList.module.css";
import { Book } from "@/features/books/types/book";
import BookCard from "@/components/admin/booksCard/BookCard";

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

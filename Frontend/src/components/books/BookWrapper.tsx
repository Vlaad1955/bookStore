import React from "react";
import CategoryProps from "../categories/CategoryProps";
import BookFilters from "./BookFilters";
import BookList from "./BookList";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import styles from "./styles.module.scss";

interface BookWrapperProps {
  initialAuthor: string[];
  books: Book[];
}

const BookWrapper: React.FC<BookWrapperProps> = ({ initialAuthor, books }) => {
  return (
    <div>
      {/* Категорії */}
      <CategoryProps basePath="books" />

      <div className={styles.wrapper}>
        {/* Фільтри */}
        <BookFilters authors={initialAuthor} />

        {/* Книги */}
        <div className={styles.books}>
          <ul className={styles.book_list}>
            {books.map((book) => (
              <BookList key={book.id} book={book} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookWrapper;

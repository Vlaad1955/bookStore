import React from "react";

import Pagination from "@/admin/other/components/pagination/Pagination";
import { Book } from "@/features/books/types/book";
import styles from "./styles.module.scss";
import BookFilters from "@/features/books/components/BookFilters";
import BookList from "@/features/books/components/BookList";

type FavoriteWrapperProps = {
  initialAuthor: string[];
  books: Book[];
  currentPage: number;
  totalPages: number;
  params?: URLSearchParams;
};

const FavoriteWrapper = ({
  initialAuthor,
  books,
  currentPage,
  totalPages,
  params,
}: FavoriteWrapperProps) => {
  return (
    <main>
      <h1>Ваші вподобання</h1>

      <div className={styles.wrapper}>
        <aside className={styles.filters}>
          <BookFilters authors={initialAuthor} />
        </aside>

        <section className={styles.books_container_right_site}>
          {books.length > 0 ? (
            <div className={styles.books}>
              <div className={styles.book_list}>
                {books.map((book) => (
                  <BookList key={book.id} book={book} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                params={params}
              />
            </div>
          ) : (
            <div className={styles.books_absent}>
              Книжки за даним запитом відсутні
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default FavoriteWrapper;

import React from "react";

import BookList from "./BookList";
import Pagination from "@/admin/other/components/pagination/Pagination";
import BookFilters from "./BookFilters";
import NewsSpecail from "../../news/components/NewsSpecail";
import CategoryProps from "../../categories/components/CategoryProps";
import SpecialProducts from "../../../components/special-products/SpecialProducts";
import { Book } from "@/features/books/types/book";
import styles from "./styles.module.scss";

type BookWrapperProps = {
  initialAuthor: string[];
  books: Book[];
  currentPage: number;
  totalPages: number;
  params?: URLSearchParams;
};

const BookWrapper = ({
  initialAuthor,
  books,
  currentPage,
  totalPages,
  params,
}: BookWrapperProps) => {
  return (
    <main>
      <CategoryProps basePath="books" />

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

          <NewsSpecail />
          <SpecialProducts categoryName="Дитяча література" />
          <SpecialProducts categoryName="Книги-іграшки" />
        </section>
      </div>
    </main>
  );
};

export default BookWrapper;

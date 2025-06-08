import React from "react";
import CategoryProps from "../categories/CategoryProps";
import BookFilters from "./BookFilters";
import BookList from "./BookList";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import styles from "./styles.module.scss";
import SpecialProducts from "../specialProducts/SpecialProducts";
import NewsSpecail from "../news/NewsSpecail";
import Pagination from "@/components/admin/pagination/Pagination";

interface BookWrapperProps {
  initialAuthor: string[];
  books: Book[];
  currentPage: number;
  totalPages: number;
  params?: URLSearchParams;
}

const BookWrapper: React.FC<BookWrapperProps> = ({
  initialAuthor,
  books,
  currentPage,
  totalPages,
  params,
}) => {
  return (
    <div>
      {/* Категорії */}
      <CategoryProps basePath="books" />

      <div className={styles.wrapper}>
        {/* Фільтри */}
        <div className={styles.filters}>
          <BookFilters authors={initialAuthor} />
        </div>

        {/* Книги */}
        <div className={styles.books_container_right_site}>
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

          {/* Спеціальні продукти */}
          <NewsSpecail />
          <SpecialProducts categoryName="Дитяча література" />
          <SpecialProducts categoryName="Книги-іграшки" />
        </div>
      </div>
    </div>
  );
};

export default BookWrapper;

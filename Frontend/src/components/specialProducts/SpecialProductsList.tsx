"use client";
import React, { useRef } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import BookList from "../books/BookList";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import { useBookStore } from "@/shared/store/UseBookStore";
import { Button } from "../ui/button/Button";

interface BookWrapperProps {
  books: Book[];
  categoryName: string;
  categoryId: string; // Назва категорії, яку передаємо ззовні
}

const SpecialProductsList: React.FC<BookWrapperProps> = ({
  books,
  categoryName,
  categoryId,
}) => {
  const { setSelectedCategories } = useBookStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleClick = (categoryName: string) => {
    setSelectedCategories([categoryName]);
  };

  return (
    <div className={styles.specialproducts_container}>
      <div className={styles.specialproducts_title}>
        <Link
          onClick={() => handleClick(categoryName)}
          href={`/dashboard/books?categories=${categoryId}`}
        >
          {categoryName}
        </Link>
      </div>
      <div className={styles.specialproducts_list}>
        <Button
          unstyled
          onClick={handleScrollLeft}
          className={styles.scrollButton}
        >
          ←
        </Button>
        <div ref={scrollRef} className={styles.specialproducts_book_list}>
          {books.map((book) => (
            <BookList key={book.id} book={book} />
          ))}
        </div>
        <Button
          unstyled
          onClick={handleScrollRight}
          className={styles.scrollButton}
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default SpecialProductsList;

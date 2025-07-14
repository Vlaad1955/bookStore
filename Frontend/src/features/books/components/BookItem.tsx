"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import CategoryProps from "../../categories/components/CategoryProps";
import ModalBasket from "../../../components/ui/modal/modal-basket/ModalBasket";
import { Button } from "../../../components/ui/button/Button";
import { useUserStore } from "@/features/user/store/UseUserStore";
import { useBookStore } from "@/features/books/store/book";
import { useBasketStore } from "@/features/basket/store/basket";
import { Book } from "@/features/books/types/book";
import DeleteBasket from "@/assets/icons/deleteBasket";
import styles from "./styles.module.scss";
import { FavoriteHeartButton } from "@/features/favorite/components/FavoriteHeartButton";
import { BooksModal } from "../enum/books-modal.enum";
import { FavoriteLikesCounter } from "@/features/favorite/components/FavoriteLikesCounter";

type BooksItemProps = {
  book: Book;
};

const BookItem = ({ book }: BooksItemProps) => {
  const { basket, addToBasket, removeFromBasket } = useBasketStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const setSelectedCategories = useBookStore(
    (state) => state.setSelectedCategories
  );
  const isAuthenticated = Boolean(user);

  const basketItem = basket?.items.find((item) => item.book.id === book.id);

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      setModalMessage(BooksModal.BUY);
      setIsModalOpen(true);
    } else {
      addToBasket(book.id.toString(), 1);
    }
  };

  const handleClick = (name: string, id: string) => {
    setSelectedCategories([name, id]);
    router.push(`/dashboard/books?categories=${id}`);
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setModalMessage(BooksModal.FAVORITE);
      setIsModalOpen(true);
    }
  };

  const bookCover = book.cover === "firm" ? "Тверда" : "Мяка";

  return (
    <article>
      <CategoryProps basePath="/dashboard/books" />

      <div className={styles.book_item_wrapper}>
        <div className={styles.book_item_image_wrapper}>
          <FavoriteHeartButton
            book={book}
            isAuthenticated={isAuthenticated}
            onUnauthenticatedClick={handleFavoriteClick}
          />
          <figure>
            <Image
              className={styles.book_item_image}
              src={book.image}
              alt={book.title}
              width={500}
              height={500}
            />
          </figure>
        </div>

        <section>
          <div className={styles.book_item_title}>{book.title}</div>
          <div className={styles.book_item_author}>{book.author}</div>

          <section className={styles.book_item_price}>
            <span className={styles.book_item_price_format}>Формат</span>
            <div className={styles.book_item_price_details}>
              <div className={styles.book_item_price_details_cover}>
                {bookCover}
              </div>
              <div>{book.price} грн</div>
            </div>
          </section>

          {book.gift && (
            <div className={styles.book_item_gift}>Подарункове</div>
          )}

          {book.published && (
            <div className={styles.book_item_published}>В наявності</div>
          )}

          <section>
            <div className={styles.book_item_category}>Категорії</div>
            <div className={styles.book_item_category_list_wrapper}>
              <div className={styles.book_item_category_list}>
                {book.categories.map((category) => (
                  <Link
                    onClick={() => handleClick(category.name, category.id)}
                    href={`/dashboard/books?categories=${category.id}`}
                    key={category.id}
                    className={styles.book_item_category_list_item}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div>
                <FavoriteLikesCounter bookId={book.id.toString()} />
              </div>
            </div>
          </section>

          <section className={styles.book_item_description}>
            <div className={styles.book_item_description_title}>
              Короткий опис книги
            </div>
            <div className={styles.book_item_description_body}>
              {book.description}
            </div>
          </section>

          <section className={styles.book_item_isbn}>
            <Button
              className={styles.book_item_basket}
              onClick={handleBuyClick}
            >
              {basketItem ? (
                <>
                  <div className={styles.book_item_in_basket}>
                    {basketItem?.quantity}
                  </div>
                  Купити
                </>
              ) : (
                "Купити"
              )}
            </Button>

            {basketItem && (
              <Button
                className={styles.book_item_delete_basket}
                onClick={removeFromBasket.bind(null, book.id.toString())}
              >
                <DeleteBasket />
              </Button>
            )}
          </section>

          <ModalBasket
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => router.push("/auth/sign-in")}
            message={modalMessage}
          />
        </section>
      </div>
    </article>
  );
};

export default BookItem;

"use client";
import React, { useState } from "react";
// import { Button } from "../ui/button/Button";
import Image from "next/image";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import CategoryProps from "../categories/CategoryProps";
import styles from "./styles.module.scss";
import { Button } from "../ui/button/Button";
import { useBasketStore } from "@/shared/api/basket/basket-store";
import Link from "next/link";
import ModalBasket from "../modal/ModalBasket";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { useRouter } from "next/navigation";
import DeleteBasket from "@/shared/assets/icons/deleteBasket";

interface BooksItemProps {
  book: Book;
}

const BookItem: React.FC<BooksItemProps> = ({ book }) => {
  const { basket, addToBasket, removeFromBasket } = useBasketStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("basket", basket);

  const basketItem = basket?.items.find((item) => item.book.id === book.id);

  console.log("basketItem", basketItem);

  const handleBuyClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      addToBasket(book.id.toString(), 1);
    }
  };

  const bookCover = book.cover === "firm" ? "Тверда" : "Мяка";

  return (
    <div>
      <CategoryProps basePath="/dashboard/books" />

      <div className={styles.book_item_wrapper}>
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

          <div className={styles.book_item_price}>
            <span className={styles.book_item_price_format}>Формат</span>
            <div className={styles.book_item_price_details}>
              <div className={styles.book_item_price_details_cover}>
                {bookCover}
              </div>
              <div>{book.price} грн</div>
            </div>
          </div>

          {book.gift && (
            <div className={styles.book_item_gift}>Подарункове</div>
          )}

          {book.published && (
            <div className={styles.book_item_published}>В наявності</div>
          )}

          <div>
            <div className={styles.book_item_category}>Категорії</div>
            <div className={styles.book_item_category_list}>
              {book.categories.map((category) => (
                <Link
                  href={`/dashboard/books?categories=${category.id}`}
                  key={category.id}
                  className={styles.book_item_category_list_item}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.book_item_description}>
            <div className={styles.book_item_description_title}>
              Короткий опис книги
            </div>
            <div className={styles.book_item_description_body}>
              {book.description}
            </div>
          </div>

          <div className={styles.book_item_isbn}>
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
          </div>

          <ModalBasket
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => router.push("/auth/sign-in")}
          />
        </div>
      </div>
    </div>
  );
};

export default BookItem;

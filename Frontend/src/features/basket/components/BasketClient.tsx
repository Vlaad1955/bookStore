"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button/Button";
import { useCallback, useEffect, useState } from "react";

import { useUserStore } from "@/features/user/store/UseUserStore";
import { useBasketStore } from "../store/basket";
import { ButtonVariant } from "@/components/ui/button/button-type/button-variant.enum";
import styles from "./styles.module.scss";

const BasketClient = () => {
  const user = useUserStore((state) => state.user);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const { basket, fetchBasket, removeFromBasket, clearBasket, addToBasket } =
    useBasketStore();

  useEffect(() => {
    if (user && !basket) {
      fetchBasket().catch((error) => {
        toast.error("Не вдалося завантажити корзину");
        throw error;
      });
    }
  }, [user, basket, fetchBasket]);

  const handleRemove = useCallback(
    async (bookId: string) => {
      setActionLoadingId(bookId);
      try {
        await removeFromBasket(bookId);
        toast.success("Книга видалена з корзини");
      } catch {
        toast.error("Не вдалося видалити книгу");
      } finally {
        setActionLoadingId(null);
      }
    },
    [removeFromBasket]
  );

  const handleQuantityChange = useCallback(
    async (bookId: string, delta: number, currentQuantity: number) => {
      const newQuantity = currentQuantity + delta;

      if (newQuantity < 1) {
        await handleRemove(bookId);
        return;
      }

      try {
        await addToBasket(bookId, delta);
        toast.success("Кількість книги оновлена");
      } catch {
        toast.error("Не вдалося оновити кількість книги");
      } finally {
      }
    },
    [addToBasket, handleRemove]
  );

  const handleClear = useCallback(async () => {
    try {
      await clearBasket();
      toast.success("Корзина очищена");
    } catch {
      toast.error("Не вдалося очистити корзину");
    } finally {
    }
  }, [clearBasket]);

  const totalPrice =
    basket?.items?.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    ) || 0;

  return (
    <article>
      <section className={styles.basket_container}>
        <div className={styles.basket_title}>Кошик</div>
        <Button className={styles.basket_button_delete} onClick={handleClear}>
          Очистити корзину повністю
        </Button>
      </section>

      <section className={styles.basket_items}>
        {" "}
        {!basket?.items?.length && (
          <section className={styles.basket_items_empty_container}>
            <div className={styles.basket_items_empty}>Кошик порожній</div>
            <Link
              className={styles.basket_items_add_button}
              href="/dashboard/books"
            >
              <div className={styles.basket_items_add_button_text}>
                <div className={styles.basket_items_add_book}>Додати книгу</div>
                <div className={styles.basket_items_add_book_plus}>+</div>
              </div>
            </Link>
          </section>
        )}
        <section className={styles.basket_items_list}>
          {basket?.items?.map((item) => (
            <div key={item.id} className={styles.basket_item}>
              <section className={styles.basket_item_content}>
                <Image
                  className={styles.book_item_image}
                  src={item.book.image}
                  alt={item.book.title}
                  width={500}
                  height={500}
                />

                <div className={styles.book_item_details}>
                  <Link
                    href={`/dashboard/books/${item.book.id}`}
                    className={styles.basket_item_title}
                  >
                    {item.book.title}
                  </Link>

                  <div className={styles.basket_item_author}>
                    Автор: {item.book.author}
                  </div>

                  <div className={styles.basket_item_isbn}>
                    <div>Ціна: {item.book.price} грн</div>
                  </div>
                </div>
              </section>

              <section className={styles.basket_item_button_container}>
                <section className={styles.basket_item_quantity}>
                  <Button
                    className={styles.basket_item_quantity_button}
                    onClick={() =>
                      handleQuantityChange(
                        item.book.id.toString(),
                        -1,
                        item.quantity
                      )
                    }
                  >
                    -
                  </Button>
                  <div className={styles.basket_item_quantity_value}>
                    {item.quantity}
                  </div>
                  <Button
                    className={styles.basket_item_quantity_button}
                    onClick={() =>
                      handleQuantityChange(
                        item.book.id.toString(),
                        1,
                        item.quantity
                      )
                    }
                  >
                    +
                  </Button>
                </section>

                <Button
                  variant={ButtonVariant.DELETE}
                  className={styles.basket_item_remove}
                  onClick={() => handleRemove(item.book.id.toString())}
                  disabled={actionLoadingId === item.book.id.toString()}
                >
                  {actionLoadingId === item.book.id.toString()
                    ? "Видаляю..."
                    : "Видалити з кошика"}
                </Button>
              </section>
            </div>
          ))}
        </section>
      </section>
      {!!basket?.items && basket.items.length > 0 && (
        <section className={styles.basket_total_container}>
          <div className={styles.basket_total_label}>Загальна сума:</div>
          <div className={styles.basket_total_value}>{totalPrice} грн</div>
        </section>
      )}
    </article>
  );
};

export default BasketClient;

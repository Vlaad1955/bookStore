"use client";
import { Button } from "@/components/ui/button/Button";
import { useBasketStore } from "@/shared/api/basket/basket-store";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Image from "next/image";
import { ButtonVariant } from "@/shared/enums/button/button-variant.enum";
import Link from "next/link";

const BasketClient = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const { basket, fetchBasket, removeFromBasket, clearBasket, addToBasket } =
    useBasketStore();

  useEffect(() => {
    if (user && !basket) {
      setLoading(true);
      fetchBasket()
        .catch(() => toast.error("Не вдалося завантажити корзину"))
        .finally(() => setLoading(false));
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

      // setQuantityLoadingId(bookId);
      try {
        await addToBasket(bookId, delta);
        toast.success("Кількість книги оновлена");
      } catch {
        toast.error("Не вдалося оновити кількість книги");
      } finally {
        // setQuantityLoadingId(null);
      }
    },
    [addToBasket, handleRemove]
  );

  const handleClear = useCallback(async () => {
    setLoading(true);
    try {
      await clearBasket();
      toast.success("Корзина очищена");
    } catch {
      toast.error("Не вдалося очистити корзину");
    } finally {
      setLoading(false);
    }
  }, [clearBasket]);

  if (loading) {
    return <p>Завантаження корзини...</p>;
  }

  return (
    <>
      <div className={styles.basket_container}>
        <div className={styles.basket_title}>Кошик</div>
        <Button
          className={styles.basket_button_delete}
          onClick={handleClear}
          disabled={loading}
        >
          Очистити корзину повністю
        </Button>
      </div>

      <div className={styles.basket_items}>
        {" "}
        {!basket?.items?.length && (
          <div className={styles.basket_items_empty_container}>
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
          </div>
        )}
        <div className={styles.basket_items_list}>
          {basket?.items?.map((item) => (
            <div key={item.id} className={styles.basket_item}>
              <div className={styles.basket_item_content}>
                <Image
                  className={styles.book_item_image}
                  src={item.book.image}
                  alt={item.book.title}
                  width={500}
                  height={500}
                />

                <div className={styles.book_item_details}>
                  <div className={styles.basket_item_title}>
                    {item.book.title}
                  </div>

                  <div className={styles.basket_item_author}>
                    Автор: {item.book.author}
                  </div>

                  <div className={styles.basket_item_isbn}>
                    <div>Ціна: {item.book.price} грн</div>
                  </div>
                </div>
              </div>

              <div className={styles.basket_item_button_container}>
                <div className={styles.basket_item_quantity}>
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
                  <div className={styles.basket_item_quantity_value}>
                    {item.quantity}
                  </div>
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
                </div>

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BasketClient;

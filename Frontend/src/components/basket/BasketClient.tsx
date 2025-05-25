"use client";
import { Button } from "@/components/ui/button/Button";
import { useBasketStore } from "@/shared/api/basket/basket-store";
import ProtectedRoute from "@/shared/protected-route/protected-route";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BasketClient = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const { basket, fetchBasket, removeFromBasket, clearBasket } =
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
      <ProtectedRoute>
        <br />

        <h1>hi {user?.firstName}</h1>
        <br />

        <Button onClick={handleClear} disabled={loading}>
          Очистити корзину повністю
        </Button>
        <div>
          {" "}
          <h2 className="text-xl font-bold mb-4">Ваша корзина</h2>
          {!basket?.items?.length && <p>Корзина порожня</p>}
          <ul className="space-y-4">
            {basket?.items?.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{item.book.title}</p>
                  <p>Автор: {item.book.author}</p>
                  <p>Кількість: {item.quantity}</p>
                  <p>Ціна: {item.book.price} грн</p>
                  <Button
                    onClick={() => handleRemove(item.book.id.toString())}
                    disabled={actionLoadingId === item.book.id.toString()}
                  >
                    {actionLoadingId === item.book.id.toString()
                      ? "Видаляю..."
                      : "Видалити книгу з корзини"}
                  </Button>
                </div>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default BasketClient;

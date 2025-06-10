"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchCategories } from "@/features/categories/hooks/axios-categories";
import { useCategoryListStore } from "@/features/categories/store/category";
import { useBookStore } from "@/features/books/store/book";
import { buildCategoryTree } from "@/features/categories/hooks/useCategoryTree";
import { Category } from "@/features/categories/types/category";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import CloseIcon from "@/assets/icons/closeIcon";

import styles from "./styles.module.scss";
import Link from "next/link";

export default function CategoryList() {
  const { isOpen, toggleList, closeList } = useCategoryListStore();
  const { setSelectedCategories } = useBookStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchCategories({ page: 1, limit: 100 })
      .then((data) => setCategories(data.entities))
      .catch((err) => {
        setError(err.message);
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (
    name: string,
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCategories([name, id]);
    router.push(`/dashboard/books?categories=${id}`);
    closeList();
  };

  const tree = buildCategoryTree(categories, handleClick, styles);

  if (loading) return <></>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <>
      {isOpen && (
        <div className={styles.book_menu_wrapper}>
          <div className={styles.book_menu_hat}>
            <div className={styles.book_menu_top}>
              <div className={styles.book_menu_title}>
                <div>Категорії книг</div>
                <Link
                  href={"/dashboard/books"}
                  className={styles.book_menu_all_books}
                >
                  Всі книги
                </Link>
              </div>

              <button
                type={ButtonType.BUTTON}
                className={styles.ui_btn_close}
                onClick={toggleList}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <ul className={styles.book_main_menu}>{tree(null)}</ul>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchCategories } from "@/shared/lib/axios-categories";
import { useCategoryListStore } from "@/shared/store/UseCategoryStore";
import { useBookStore } from "@/shared/store/UseBookStore";
import { buildCategoryTree } from "@/shared/hooks/use-category-tree/useCategoryTree";
import { Category } from "@/shared/types/categoryTypes/category";
import { ButtonType } from "@/shared/enums/button/button-type.enum";
import CloseIcon from "@/shared/assets/icons/closeIcon";

import styles from "./styles.module.scss";

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
      .catch((err) => setError(err.message))
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

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <>
      {isOpen && (
        <div className={styles["book-menu_wrapper"]}>
          <div className={styles["book-menu_hat"]}>
            <div className={styles["book-menu_top"]}>
              <div className={styles["book-menu_title"]}>Категорії книг</div>
              <button
                type={ButtonType.BUTTON}
                className={styles["ui-btn-close"]}
                onClick={toggleList}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <ul className={styles["book-main_menu"]}>{tree(null)}</ul>
        </div>
      )}
    </>
  );
}

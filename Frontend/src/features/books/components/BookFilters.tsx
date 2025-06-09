"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.scss";
import { Button } from "../../../components/ui/button/Button";

type FiltersProps = {
  authors: string[];
};

const BookFilters = ({ authors }: FiltersProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getUpdatedSearch = (
    key: string,
    value: string,
    multi: boolean = false
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (multi) {
      const all = params.getAll(key);
      if (all.includes(value)) {
        // remove value
        const filtered = all.filter((v) => v !== value);
        params.delete(key);
        filtered.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    // Always keep current category
    const category = searchParams.get("categories");
    if (category) params.set("categories", category);

    return `${pathname}?${params.toString()}`;
  };

  const isChecked = (key: string, value: string): boolean => {
    const values = searchParams.getAll(key);
    return values.includes(value);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    const category = searchParams.get("categories");
    if (category) params.set("categories", category);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    // <div className={styles.filters}>
    <div>
      <div className={styles.filter_container}>
        <h3 className={styles.filter_books}>Фільтри</h3>
        {/* В наявності */}
        <Link href={getUpdatedSearch("published", "true")}>
          <label className={styles.filter_checkbox}>
            <input
              className={styles.filter_checkbox_input}
              type="checkbox"
              readOnly
              checked={isChecked("published", "true")}
            />
            <span className={styles.filter_item}>В наявності</span>
          </label>
        </Link>
        {/* Подарункові */}
        <Link href={getUpdatedSearch("gift", "true")}>
          <label className={styles.filter_checkbox}>
            <input
              type="checkbox"
              readOnly
              checked={isChecked("gift", "true")}
            />
            <span className={styles.filter_item}>Подарункові</span>
          </label>
        </Link>
      </div>

      {/* Обкладинка */}
      <div className={styles.filter_container}>
        <h3 className={styles.filter_books}>Обкладинка</h3>
        <Link href={getUpdatedSearch("cover", "soft")}>
          <label className={styles.filter_checkbox}>
            <input
              type="checkbox"
              readOnly
              checked={isChecked("cover", "soft")}
            />
            <span className={styles.filter_item}>М’яка</span>
          </label>
        </Link>
        <Link href={getUpdatedSearch("cover", "firm")}>
          <label className={styles.filter_checkbox}>
            <input
              type="checkbox"
              readOnly
              checked={isChecked("cover", "firm")}
            />
            <span className={styles.filter_item}>Тверда</span>
          </label>
        </Link>
      </div>

      {/* Автори */}
      {authors.length > 0 && (
        <>
          <div className={styles.filter_container}>
            <h3 className={styles.filter_books}>Автори</h3>
            {authors.map((author) => (
              <Link
                href={getUpdatedSearch("author", author, true)}
                key={author}
              >
                <label className={styles.filter_checkbox}>
                  <input
                    type="checkbox"
                    readOnly
                    checked={isChecked("author", author)}
                  />
                  <span className={styles.filter_item}>{author}</span>
                </label>
              </Link>
            ))}
          </div>
          <Button onClick={resetFilters} className={styles.filter_reset_button}>
            Скинути фільтри
          </Button>
        </>
      )}
    </div>
  );
};

export default BookFilters;

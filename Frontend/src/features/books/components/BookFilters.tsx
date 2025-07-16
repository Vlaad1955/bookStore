"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button/Button";
import styles from "./styles.module.scss";

type BookFiltersProps = {
  authors: string[];
  maxPrice: number;
};

const BookFilters = ({ authors, maxPrice }: BookFiltersProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [minPrice, setMinPrice] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  useEffect(() => {
    const price = searchParams.get("price");
    if (price && price.includes("-")) {
      const [min, max] = price.split("-");
      setMinPrice(min);
      setMaxPriceInput(max);
    }
  }, [searchParams]);

  const getUpdatedSearch = (
    key: string,
    value: string,
    multi: boolean = false
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (multi) {
      const all = params.getAll(key);
      if (all.includes(value)) {
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

  const handleApplyPrice = () => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPriceInput) || maxPrice;

    if (min > max) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("price", `${min}-${max}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <section className={styles.filter_container}>
        <h3 className={styles.filter_books}>Ціна</h3>

        <div className={styles.price_range}>
          <div className={styles.price_group_inline}>
            <div className={styles.price_field}>
              <span className={styles.price_text}>Від</span>
              <input
                type="number"
                min={0}
                max={maxPrice}
                value={minPrice}
                placeholder="0"
                onChange={(e) => setMinPrice(e.target.value)}
                className={styles.price_input}
              />
            </div>

            <div className={styles.price_field}>
              <span className={styles.price_text}>До</span>
              <input
                type="number"
                min={0}
                max={maxPrice}
                value={maxPriceInput}
                placeholder={String(maxPrice)}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className={styles.price_input}
              />
            </div>
          </div>

          <Button onClick={handleApplyPrice} className={styles.filter_button}>
            Застосувати
          </Button>
        </div>
      </section>

      <section className={styles.filter_container}>
        <h3 className={styles.filter_books}>Фільтри</h3>
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
      </section>

      <section className={styles.filter_container}>
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
      </section>

      {authors.length > 0 && (
        <>
          <section className={styles.filter_container}>
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
          </section>
          <Button onClick={resetFilters} className={styles.filter_reset_button}>
            Скинути фільтри
          </Button>
        </>
      )}
    </div>
  );
};

export default BookFilters;

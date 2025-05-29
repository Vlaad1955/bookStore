"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button/Button";
import styles from "@/components/admin/booksHeader/BooksHeader.module.css";

export default function BooksHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("title") || "");
  const [published, setPublished] = useState(searchParams.get("published") || "all");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) params.set("title", search.trim());
    if (published !== "all") params.set("published", published);

    router.push(`/admin/books/1?${params.toString()}`);
  };

  const handleCreate = () => {
    router.push("/admin/books/create");
  };

  return (
      <div className={styles.header}>
        <Button onClick={handleCreate} className={styles.createButton}>
          Створити книгу
        </Button>

        <div className={styles.controls}>
          <input
              type="text"
              placeholder="Пошук за назвою..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
          />

          <select
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              className={styles.select}
          >
            <option value="all">Усі</option>
            <option value="true">Опубліковані</option>
            <option value="false">Неопубліковані</option>
          </select>

          <Button onClick={handleSearch} className={styles.applyButton}>
            Застосувати
          </Button>
        </div>
      </div>
  );
}
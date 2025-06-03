"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button/Button";
import styles from "@/components/admin/BooksHeader/BooksHeader.module.css";

export default function NewsHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("title") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) params.set("title", search.trim());
    if (category !== "all") params.set("category", category);

    router.push(`/admin/news/1?${params.toString()}`);
  };

  const handleCreate = () => {
    router.push("/admin/news/create");
  };

  return (
    <div className={styles.header}>
      <Button onClick={handleCreate} className={styles.applyButton}>Створити новину</Button>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Пошук за заголовком..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="all">Всі категорії</option>
            <option value="general">General</option>
            <option value="event">Event</option>
            <option value="promotion">Promotion</option>
          </select>
          <Button onClick={handleSearch} className={styles.applyButton}>Застосувати</Button>
        </div>
      </div>
    </div>
  );
}

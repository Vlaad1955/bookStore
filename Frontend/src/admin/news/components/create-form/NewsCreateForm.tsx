"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createNews } from "@/admin/news/api/news";
import styles from "@/admin/news/components/edit-form/styles.module.scss";

export default function CreateNewsForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Зображення обов'язкове");
      return;
    }

    try {
      const newsData = { title, content, category };
      await createNews(newsData, image);

      router.push("/admin/news/1");
    } catch (err: any) {
      setError(err.response?.data?.message || "Помилка при створенні новини");
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Створити новину</h2>
      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="🖉 Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
      />

      <textarea
        placeholder="🖉 Контент"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className={styles.textarea}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className={styles.input}
      >
        <option value="general">Загальна</option>
        <option value="promotion">Акція</option>
        <option value="event">Подія</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        required
        className={styles.file}
      />

      {imagePreview && (
        <div className={styles.previewContainer}>
          <p className={styles.previewLabel}>Прев’ю зображення:</p>
          <img
            src={imagePreview}
            alt="Прев’ю"
            className={styles.previewImage}
          />
        </div>
      )}

      <button type="submit" className={styles.submitButton}></button>
    </form>
  );
}
